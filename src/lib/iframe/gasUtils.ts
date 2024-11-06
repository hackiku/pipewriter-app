// $lib/iframe/gasUtils.ts

interface GASResponse {
	success: boolean;
	action?: string;
	data?: any;
	error?: string;
	executionTime?: number;
	timestamp?: string;
}

interface StatusUpdate {
	type: 'processing' | 'success' | 'error';
	message: string;
	executionTime?: number;
}

type StatusCallback = (status: StatusUpdate) => void;

export class GASCommunicator {
	private static instance: GASCommunicator;
	private activeRequests: Map<string, {
		resolve: (value: GASResponse) => void;
		reject: (reason: any) => void;
		timer: number;
	}> = new Map();

	private constructor(private timeout: number = 5000) {
		this.setupMessageListener();
	}

	static getInstance(timeout?: number): GASCommunicator {
		if (!GASCommunicator.instance) {
			GASCommunicator.instance = new GASCommunicator(timeout);
		}
		return GASCommunicator.instance;
	}

	private setupMessageListener() {
		window.addEventListener('message', this.handleMessage.bind(this));
	}

	private handleMessage(event: MessageEvent) {
		try {
			// Handle direct messages first
			if (event.data === "Background changed") {
				this.resolveActiveRequests('changeBg');
				return;
			}

			// Parse JSON responses
			const response = typeof event.data === 'string'
				? JSON.parse(event.data)
				: event.data;

			if (response.action) {
				this.resolveActiveRequests(response.action, response);
			}
		} catch (error) {
			console.error('Error handling message:', error);
		}
	}

	private resolveActiveRequests(action: string, response?: GASResponse) {
		const request = this.activeRequests.get(action);
		if (request) {
			clearTimeout(request.timer);
			if (response?.error) {
				request.reject(new Error(response.error));
			} else {
				request.resolve(response || { success: true });
			}
			this.activeRequests.delete(action);
		}
	}

	public async sendMessage(
		action: string,
		payload: Record<string, any> = {},
		onStatus?: StatusCallback
	): Promise<GASResponse> {
		return new Promise((resolve, reject) => {
			// Set timeout handler
			const timer = window.setTimeout(() => {
				this.activeRequests.delete(action);
				reject(new Error(`Operation ${action} timed out`));
			}, this.timeout);

			// Store the promise handlers
			this.activeRequests.set(action, { resolve, reject, timer });

			// Notify status
			if (onStatus) {
				onStatus({
					type: 'processing',
					message: `Processing ${action}...`
				});
			}

			// Send message to Apps Script
			try {
				window.parent.postMessage(JSON.stringify({ action, payload }), '*');
			} catch (error) {
				this.activeRequests.delete(action);
				clearTimeout(timer);
				reject(error);
			}
		});
	}

	public destroy() {
		window.removeEventListener('message', this.handleMessage.bind(this));
		this.activeRequests.forEach(({ timer }) => clearTimeout(timer));
		this.activeRequests.clear();
	}
}