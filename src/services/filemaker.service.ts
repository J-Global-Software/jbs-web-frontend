const FMP_URL = process.env.FILEMAKER_URL;
const FMP_DB = process.env.FILEMAKER_DB;
const FMP_USER = process.env.FILEMAKER_USER;
const FMP_PASS = process.env.FILEMAKER_PASS;

// --- Interfaces for FileMaker Data API ---

interface FMPMessage {
	code: string;
	message: string;
}

/**
 * Replaced <T = any> with <T = unknown> to satisfy ESLint.
 * unknown is the safe alternative to any.
 */
interface FMPResponse<T = unknown> {
	response: {
		token?: string;
		data?: T[];
		dataInfo?: {
			database: string;
			layout: string;
			table: string;
			totalRecordCount: number;
			foundCount: number;
			returnedCount: number;
		};
	};
	messages: FMPMessage[];
}

export interface FMPRecord<T = Record<string, unknown>> {
	fieldData: T;
	portalData: Record<string, Array<Record<string, unknown>>>;
	recordId: string;
	modId: string;
}

interface FMPSort {
	fieldName: string;
	sortOrder: "ascend" | "descend" | string;
}

/**
 * Using a Symbol is the cleanest way to signal internal state
 * without leaking 'any' or magic strings.
 */
const RETRY_SYMBOL = Symbol("RETRY_REQUIRED");

export class FileMakerService {
	private static token: string | null = null;

	private static async getToken(forceRefresh = false): Promise<string> {
		if (this.token && !forceRefresh) return this.token;

		const auth = Buffer.from(`${FMP_USER}:${FMP_PASS}`).toString("base64");
		try {
			const response = await fetch(`${FMP_URL}/fmi/data/v1/databases/${FMP_DB}/sessions`, {
				method: "POST",
				headers: {
					Authorization: `Basic ${auth}`,
					"Content-Type": "application/json",
				},
				cache: "no-store",
			});

			if (!response.ok) throw new Error("Failed to authenticate with FileMaker");

			// Typed as unknown first, then narrowed via response structure
			const data = (await response.json()) as FMPResponse;

			if (!data.response.token) throw new Error("No token returned from FileMaker");

			this.token = data.response.token;
			return this.token;
		} catch (error) {
			console.error("FMP Auth Error:", error);
			throw error;
		}
	}

	private static async handleResponse<T>(response: Response, retryCount = 0): Promise<FMPRecord<T>[] | typeof RETRY_SYMBOL> {
		const result = (await response.json()) as FMPResponse<FMPRecord<T>>;
		const errorCode = result.messages[0].code;

		if (errorCode === "952") {
			this.token = null;
			if (retryCount < 1) {
				console.warn("Token expired. Attempting automatic refresh...");
				return RETRY_SYMBOL;
			}
			throw new Error("Token expired and refresh failed.");
		}

		if (errorCode !== "0") {
			if (errorCode === "401") return [];
			throw new Error(`FMP Error: ${result.messages[0].message} (Code: ${errorCode})`);
		}

		return result.response.data || [];
	}

	/**
	 * find now supports a generic T for the shape of fieldData.
	 */
	static async find<T = Record<string, unknown>>(layout: string, query: Record<string, string | number | boolean>, sort: FMPSort[] = []): Promise<FMPRecord<T>[]> {
		const executeRequest = async () => {
			const token = await this.getToken();
			const url = `${FMP_URL}/fmi/data/v1/databases/${FMP_DB}/layouts/${layout}/_find`;

			// Strictly typed request body
			const body: { query: Array<Record<string, string | number | boolean>>; sort?: FMPSort[] } = {
				query: [query],
			};
			if (sort.length > 0) body.sort = sort;

			return await fetch(url, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
		};

		let response = await executeRequest();
		let data = await this.handleResponse<T>(response);

		if (data === RETRY_SYMBOL) {
			await this.getToken(true);
			response = await executeRequest();
			data = await this.handleResponse<T>(response, 1);
		}

		// Final check to ensure we return an array, even if retry somehow failed
		return Array.isArray(data) ? data : [];
	}
}
