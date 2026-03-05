import { query } from "@/utils/neon";

export interface CreateProgramRegistrationDTO {
    sessionId: string | null;
    workshopId: string;
    firstName: string;
    lastName: string;
    email: string;
    programCode: string;
    eventDate: string; // ISO Date
    eventTime: string; // HH:mm
    eventTimeFinish: string; // HH:mm
    zoomJoinUrl?: string;
    eventName: string;
}
export const ProgramRepository = {
    async findByEmailAndWorkshop(email: string, workshopId: string) {
        const sql = `
            SELECT id FROM jbs.program_registrations 
            WHERE LOWER(email) = LOWER($1) AND workshop_id = $2
            LIMIT 1
        `;
        const res = await query<{ id: string }>(sql, [email, workshopId]);
        return res.rows[0] || null;
    },
    
    async create(data: CreateProgramRegistrationDTO) {
        // 1. Ensure the SQL string has EXACTLY 10 placeholders for 10 columns
        const sql = `
            INSERT INTO jbs.program_registrations 
            (
                session_id,        -- 1
                workshop_id,       -- 2
                first_name,        -- 3
                last_name,         -- 4
                email,             -- 5
                program_code,      -- 6
                event_date,        -- 7
                event_time,        -- 8
                event_time_finish, -- 9
                zoom_join_url      -- 10
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id, created_at
        `;

        // 2. Ensure this array has EXACTLY 10 items in the EXACT same order
        const values = [
            data.sessionId,               // $1
            data.workshopId || null,      // $2
            data.firstName,               // $3
            data.lastName,                // $4
            data.email,                   // $5
            data.programCode,             // $6
            data.eventDate,               // $7
            data.eventTime,               // $8
            data.eventTimeFinish,         // $9
            data.zoomJoinUrl || null,     // $10
        ];

        // 3. Log the length if it keeps failing to debug
        // console.log("Value count:", values.length); 

        const res = await query<{ id: string; created_at: string }>(sql, values);
        return res.rows[0];
    }
};