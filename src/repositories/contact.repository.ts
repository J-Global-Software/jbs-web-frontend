import { ContactMessage, CreateContactDTO } from "@/types/contact";
import { query } from "@/utils/neon";

export const ContactRepository = {
	async create(data: CreateContactDTO): Promise<number> {
		const email = data.email.toLowerCase().trim();

		const sql = `
            INSERT INTO jbs.contact_messages
            (session_id, first_name, last_name, email, message)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;

		const result = await query<Pick<ContactMessage, "id">>(sql, [data.sessionId, data.firstName, data.lastName, email, data.message]);

		return result.rows[0].id;
	},
};
