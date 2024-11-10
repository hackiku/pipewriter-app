// src/lib/iframe/types/status.ts

export interface StatusUpdate {
	type: "success" | "error" | "processing";
	message: string;
	executionTime?: number;
}

export interface TabStatus extends StatusUpdate {
	tabId: string;
}