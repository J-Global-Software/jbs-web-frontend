export class FileMakerService {
	private static cachedToken: string | null = null;
	private static tokenExpiresAt = 0;
	private static readonly API_VERSION = "v1";

	private static async getToken(): Promise<string> {
		if (this.cachedToken && Date.now() < this.tokenExpiresAt) {
			return this.cachedToken;
		}

		const { FILEMAKER_USER, FILEMAKER_PASS, FILEMAKER_URL, FILEMAKER_DB } = process.env;
		if (!FILEMAKER_USER || !FILEMAKER_PASS || !FILEMAKER_URL || !FILEMAKER_DB) {
			throw new Error("Missing FileMaker environment variables.");
		}

		const auth = Buffer.from(`${FILEMAKER_USER}:${FILEMAKER_PASS.replace(/\\n/g, "\n")}`).toString("base64");
		const url = `${FILEMAKER_URL}/fmi/data/${this.API_VERSION}/databases/${FILEMAKER_DB}/sessions`;

		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
		});

		const data = await res.json();
		if (!res.ok || !data?.response?.token) {
			throw new Error(`FileMaker Auth Failed: ${JSON.stringify(data)}`);
		}

		this.cachedToken = data.response.token;
		this.tokenExpiresAt = Date.now() + 14 * 60 * 1000;
		return this.cachedToken!;
	}

	/**
	 * Generic Find method to be used by Repositories
	 */
	public static async find(layout: string, query: object, sort?: object[]) {
		const token = await this.getToken();
		const { FILEMAKER_URL, FILEMAKER_DB } = process.env;

		// Use vLatest or v1 as per your requirements
		const url = `${FILEMAKER_URL}/fmi/data/vLatest/databases/${FILEMAKER_DB}/layouts/${layout}/_find`;

		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ query: [query], sort }),
		});

		const data = await res.json();
		if (!res.ok) throw new Error(data.messages?.[0]?.message || "FileMaker Find Error");

		return data.response.data;
	}
}
