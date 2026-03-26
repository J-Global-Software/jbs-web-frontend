import { EmailService } from "./email.service";
import { loadServerMessages } from "../../messages/server";
import { generateICS, generateICSWorkshop } from "./generateEmail";
import { CreateProgramRegistrationDTO, ProgramRepository } from "@/repositories/biznite.repository";
import { eventNames } from "process";

export const BizniteService = {
    /**
     * Registers a user for a Biznite workshop and handles the date conversion
     * from MM/DD/YYYY format to a valid JS Date object for ICS generation.
     */
    async registerUser(payload: CreateProgramRegistrationDTO, locale: string = "ja") {
        try {
            // 1. Zoom Link Logic
            const userZoomLink = payload.zoomJoinUrl || "";


            // 2. Persist to Neon Database
            const registration = await ProgramRepository.create({
                ...payload,
                zoomJoinUrl: userZoomLink
            });

            // 3. Email & Calendar Logic
            try {
                const messages = await loadServerMessages(locale);
                const fromEmail = process.env.FROM_EMAIL || "info@j-globalbizschool.com";

                // --- DATE REFORMATTING FIX ---
                // Problem: Payload date is "03/05/2026" (MM/DD/YYYY)
                // Solution: Convert to "2026-03-05" (YYYY-MM-DD)
                const dateParts = payload.eventDate.split('/'); // Splits "03", "05", "2026"
                
                if (dateParts.length !== 3) {
                    throw new Error(`Invalid date format received: ${payload.eventDate}. Expected MM/DD/YYYY.`);
                }

                const [month, day, year] = dateParts;
                const isoDate = `${year}-${month}-${day}`; // Reconstructs to "2026-03-05"

                // Merge with Time and JST Offset (+09:00)
                const startDateTimeStr = `${isoDate}T${payload.eventTime}:00+09:00`;
                const startDate = new Date(startDateTimeStr);

                // 2. Construct End Date (Same date, different time)
const endDateTimeStr = `${isoDate}T${payload.eventTimeFinish}:00+09:00`;
const endDate = new Date(endDateTimeStr);


if (isNaN(endDate.getTime())) {
    throw new Error(`Invalid End Date: ${endDateTimeStr}`);
}

                // Final safety check to prevent "Invalid Date" errors
                if (isNaN(startDate.getTime())) {
                    throw new Error(`JS Date failed to parse: ${startDateTimeStr}`);
                }


                // --- GENERATE ICS FILE ---
                const icsContent = generateICSWorkshop({
                    start: startDate,
                    end:    endDate,
                    title: `${payload.eventName} (${payload.programCode})`,
                    description: `Thank you for registering for ${payload.eventName} (${payload.programCode}). We look forward to seeing you there!`,
                    location: "Zoom Online",
                    url: userZoomLink
                });


                // --- SEND CUSTOM WORKSHOP EMAIL ---
                await EmailService.sendWorkshopConfirmation({
                    locale,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    programCode: payload.programCode,
                    eventDate: payload.eventDate, 
                    eventTime: payload.eventTime,
                    eventTimeFinish: payload.eventTimeFinish,
                    userZoomLink,
                    icsContent,
                    messages,
                    fromEmail,
                    toEmail: payload.email,
                    eventName: payload.eventName
                });

                

            } catch (emailError) {
                // Log the error but don't prevent the user from seeing a "Success" page
                console.error("Non-blocking Email/ICS Error:", emailError);
            }

            return registration;
        } catch (error) {
            console.error("Biznite Registration Service Error:", error);
            throw error;
        }
    }
};