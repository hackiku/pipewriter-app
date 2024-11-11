// $lib/iframe/utils/appsScript.ts

export class AppsScriptClient {
	private static instance: AppsScriptClient;
	private initialized: boolean = false;
	private initPromise: Promise<void>;

	private constructor() {
		this.initPromise = this.initialize();
	}

	static getInstance(): AppsScriptClient {
		if (!AppsScriptClient.instance) {
			AppsScriptClient.instance = new AppsScriptClient();
		}
		return AppsScriptClient.instance;
	}

	private async initialize(): Promise<void> {
		if (this.initialized) return;

		try {
			// Add any initialization logic here
			// For example, checking if window.google exists
			await new Promise(resolve => setTimeout(resolve, 100));
			this.initialized = true;
		} catch (error) {
			console.error('Failed to initialize AppsScriptClient:', error);
			throw error;
		}
	}

	async sendMessage(action: string, payload: Record<string, any> = {}): Promise<any> {
		try {
			// Wait for initialization before sending messages
			await this.initPromise;

			// Ensure we're in a browser environment
			if (typeof window === 'undefined') {
				throw new Error('AppsScriptClient requires a browser environment');
			}

			// Log the outgoing message for debugging
			console.log('Sending message:', { action, payload });

			// Send message to parent
			window.parent.postMessage(
				JSON.stringify({
					action,
					payload
				}),
				'*'
			);

			// For now, return a resolved promise
			// In the future, you might want to wait for a response
			return Promise.resolve({ success: true });
		} catch (error) {
			console.error(AppsScriptClient failed to send message ${ action }:, error);
			return Promise.reject(error);
		}
	}
}

// Type definitions for messages
export interface AppsScriptMessage {
	action: string;
	payload?: Record<string, any>;
}

export interface AppsScriptResponse {
	success: boolean;
	error?: string;
	data?: any;
	executionTime?: number;
}