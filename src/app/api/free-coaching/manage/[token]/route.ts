// app/api/coaching/manage/[token]/route.ts
import { query } from "@/utils/neon";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, context: { params: { token: string } }) {
	try {
		const { token } = await context.params;

		// 1️⃣ Validate token format
		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

		if (!uuidRegex.test(token)) {
			return new Response(JSON.stringify({ error: "Invalid token format" }), {
				status: 400,
			});
		}

		// 2️⃣ Fetch booking by cancellation token
		const baseResult = await query(
			`SELECT
				id,
				first_name,
				last_name,
				email,
				phone_number,
				message,
				event_date,
				status,
				google_calendar_event_id,
				zoom_meeting_id,
				zoom_join_url,
				created_at,
				rescheduled_at,
				cancelled_at,
				original_booking_id
			FROM jbs.bookings
			WHERE cancellation_token = $1
			LIMIT 1`,
			[token],
		);

		if (baseResult.rowCount === 0) {
			return new Response(JSON.stringify({ error: "Booking not found" }), {
				status: 404,
			});
		}

		let booking = baseResult.rows[0];
		let isRedirectedFromOldBooking = false;

		// 3️⃣ If this booking has been rescheduled, fetch the latest child booking
		const latestResult = await query(
			`SELECT
				id,
				first_name,
				last_name,
				email,
				phone_number,
				message,
				event_date,
				status,
				google_calendar_event_id,
				zoom_meeting_id,
				zoom_join_url,
				created_at,
				rescheduled_at,
				cancelled_at,
				original_booking_id
			FROM jbs.bookings
			WHERE original_booking_id = $1
			ORDER BY created_at DESC
			LIMIT 1`,
			[booking.id],
		);

		if (latestResult.rows.length > 0) {
			booking = latestResult.rows[0];
			isRedirectedFromOldBooking = true;
		}

		// 4️⃣ Time logic
		const eventDate = new Date(booking.event_date);
		const now = new Date();

		const isPast = eventDate < now;
		const hoursUntilEvent = (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60);

		const withinTimeLimit = hoursUntilEvent > 24 && !isPast;

		// 5️⃣ Reschedule / cancel rules
		const isRescheduledBooking = booking.original_booking_id !== null;

		const canReschedule = withinTimeLimit && booking.status === "confirmed" && !isRescheduledBooking;

		const canCancel = withinTimeLimit && booking.status === "confirmed";

		// 6️⃣ Response
		return new Response(
			JSON.stringify({
				booking: {
					id: booking.id,
					firstName: booking.first_name,
					lastName: booking.last_name,
					email: booking.email,
					phoneNumber: booking.phone_number,
					message: booking.message,
					eventDate: booking.event_date,
					status: booking.status,
					zoomJoinUrl: booking.zoom_join_url,
					createdAt: booking.created_at,
					rescheduledAt: booking.rescheduled_at,
					cancelledAt: booking.cancelled_at,
					isRescheduledBooking,
				},
				canReschedule,
				canCancel,
				hoursUntilEvent: Math.round(hoursUntilEvent * 10) / 10,
				isRedirectedFromOldBooking,
			}),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("[GET Booking Error]", error);
		return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
	}
}
