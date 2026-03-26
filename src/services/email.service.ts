import { Resend } from "resend";
import { EmailData, generateCancelHTMLEmail, generateContactNotificationHTML, generateHTMLEmail, generateLecturerCancelNotificationHTML, generateLecturerNotificationHTML, generateLecturerRescheduleNotificationHTML, generatePlainTextEmail, generateRescheduleHTMLEmail, generateWorkshopHTMLEmail, generateWorkshopPlainTextEmail } from "./generateEmail";
import { BookingPayload } from "@/types/booking";
import { loadServerMessages } from "../../messages/server";

// Capture the type from the loader
type ServerMessages = Awaited<ReturnType<typeof loadServerMessages>>;

/**
 * Safe Resend initializer (prevents build-time crash)
 */
function getResend() {
	if (!process.env.RESEND_API_KEY) {
		throw new Error("Missing RESEND_API_KEY");
	}
	return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Interfaces for grouped parameters
 */
interface BaseEmailParams {
	fromEmail: string;
	toEmail: string;
	locale: string;
	messages: ServerMessages;
}

interface CancelUserParams {
	locale: string;
	firstName: string;
	lastName: string;
	email: string; // Added to match your call
	eventDate: Date;
	messages: ServerMessages;
	fromEmail: string;
	toEmail: string;
}

interface UserConfirmationParams extends BaseEmailParams {
	userData: BookingPayload;
	userZoomLink: string;
	managementUrl: string;
	icsContent: string;
}

interface RescheduleUserParams extends BaseEmailParams {
	firstName: string;
	lastName: string;
	oldEventDate: Date;
	newStart: Date;
	newEnd: Date;
	userZoomLink: string;
	managementUrl: string;
}

interface WorkshopConfirmationParams extends BaseEmailParams {
	firstName: string;
	lastName: string;
	programCode: string; // e.g., "WS-101" or "BIZNITE-01"
	eventDate: string;   // Formatted date string
	eventTime: string;   // e.g., "19:00 - 21:00"
	eventTimeFinish: string; // e.g., "21:00"
	eventName: string; // e.g., "Effective Communication Skills"
	userZoomLink: string;
	icsContent: string;  // The generated calendar file content
}

export const EmailService = {
	
   // Inside EmailService object in email.service.ts
// Inside EmailService
async sendWorkshopConfirmation({ locale, firstName, lastName, programCode, eventDate, eventTime, eventTimeFinish, userZoomLink, messages, icsContent, fromEmail, toEmail, eventName}: WorkshopConfirmationParams) {
    
    const resend = getResend();

    const data: EmailData = {
        firstName,
        lastName,
        email: toEmail,
        phone: "",
        message: "",
        date: eventDate,
        time: eventTime,
		timeFinish: eventTimeFinish,
		eventName:eventName
       
    };

    const htmlContent = generateWorkshopHTMLEmail(locale, data, programCode, userZoomLink, messages);

    return resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: locale === "ja" ? `【参加確定】J-Globalビジネススクール` : `Confirmation: J-Global Business School`,
        html: htmlContent,
        attachments: [{ filename: "workshop.ics", content: icsContent }],
    });
},

	/**
	 * Sends confirmation and ICS file to the User
	 */
	async sendUserConfirmation({ locale, userData, userZoomLink, managementUrl, messages, icsContent, fromEmail, toEmail }: UserConfirmationParams) {
		const resend = getResend();

		const greetingName = locale === "ja" ? userData.lastName : userData.firstName;
		const emailData: EmailData = {
			...userData,
			timeFinish: userData.timeFinish || "",
			eventName: userData.eventName || "" // Add eventName to EmailData
		};
		const plainText = generatePlainTextEmail(locale, greetingName, emailData, userZoomLink, managementUrl, messages);
		const htmlContent = generateHTMLEmail(locale, greetingName, emailData, userZoomLink, managementUrl, messages);

		return resend.emails.send({
			from: fromEmail,
			to: toEmail,
			subject: messages.server.email.subject,
			text: plainText,
			html: htmlContent,
			attachments: [
				{
					filename: "coaching-session.ics",
					content: icsContent,
					contentType: "text/calendar; charset=utf-8",
				},
			],
		});
	},

	/**
	 * Notifies Lecturer of a new booking
	 */
	async sendLecturerNotification({ userData, messages, fromEmail, toEmail }: { userData: BookingPayload; messages: ServerMessages; fromEmail: string; toEmail: string }) {
		const resend = getResend();

		const emailData: EmailData = {
			...userData,
			timeFinish: userData.timeFinish || "",
			eventName: userData.eventName || "" // Add eventName to EmailData
		};
		const htmlContent = generateLecturerNotificationHTML(emailData, messages);
		return resend.emails.send({
			from: fromEmail,
			to: toEmail,
			subject: "(JBS) Free Coaching Booking Received",
			html: htmlContent,
		});
	},

	/**
	 * Sends Reschedule confirmation to the User
	 */
	async sendRescheduleUser({ locale, firstName, lastName, oldEventDate, newStart, newEnd, userZoomLink, managementUrl, messages, fromEmail, toEmail }: RescheduleUserParams) {
		const resend = getResend();

		const htmlContent = generateRescheduleHTMLEmail(locale, firstName, lastName, oldEventDate, newStart, newEnd, userZoomLink, managementUrl, messages);
		return resend.emails.send({
			from: fromEmail,
			to: toEmail,
			subject: messages.server.email.rescheduledSubject,
			html: htmlContent,
		});
	},

	/**
	 * Notifies Lecturer of a reschedule
	 */
	async sendRescheduleLecturer(firstName: string, lastName: string, oldEventDate: Date, newEventDate: Date, fromEmail: string, toEmail: string) {
		const resend = getResend();

		const htmlContent = generateLecturerRescheduleNotificationHTML(firstName, lastName, oldEventDate, newEventDate);
		return resend.emails.send({
			from: fromEmail,
			to: toEmail,
			subject: "(JBS) Coaching Session Rescheduled",
			html: htmlContent,
		});
	},

	/**
	 * Sends Cancellation notice to the User
	 */
	async sendCancelUser({ locale, firstName, lastName, eventDate, messages, fromEmail, toEmail }: CancelUserParams) {
		const resend = getResend();

		const htmlContent = generateCancelHTMLEmail(locale, firstName, lastName, eventDate, messages);
		return resend.emails.send({
			from: fromEmail,
			to: toEmail,
			subject: messages.server.email.cancelledSubject,
			html: htmlContent,
		});
	},

	/**
	 * Notifies Lecturer of a cancellation
	 */
	async sendCancelLecturer(firstName: string, lastName: string, email: string, eventDate: Date, fromEmail: string, toEmail: string) {
		const resend = getResend();

		const htmlContent = generateLecturerCancelNotificationHTML(firstName, lastName, email, eventDate);
		return resend.emails.send({
			from: fromEmail,
			to: toEmail,
			subject: "(JBS) Coaching Session Cancelled by User",
			html: htmlContent,
		});
	},

	/**
	 * Sends the contact form message to the Lecturer
	 */
	async sendContactNotification(params: { messageId: string; sessionId: string; firstName: string; lastName: string; email: string; safeMessage: string; fromEmail: string; toEmail: string }): Promise<void> {
		const resend = getResend();

		const htmlContent = generateContactNotificationHTML(params);

		await resend.emails.send({
			from: params.fromEmail,
			to: params.toEmail,
			replyTo: params.email.toLowerCase().trim(),
			subject: `New Contact Message (ID: ${params.messageId})`,
			html: htmlContent,
		});
	},
};