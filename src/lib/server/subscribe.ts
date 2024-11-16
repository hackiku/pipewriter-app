// src/lib/server/subscribe.ts
import { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID } from '$env/static/private';

export interface SubscribeResponse {
	success: boolean;
	message: string;
}

export async function subscribeToMailchimp(email: string, source: string): Promise<SubscribeResponse> {
	const MAILCHIMP_DC = MAILCHIMP_API_KEY.split('-')[1];
	const MAILCHIMP_MEMBER_API = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

	try {
		const response = await fetch(MAILCHIMP_MEMBER_API, {
			method: 'POST',
			headers: {
				Authorization: `apikey ${MAILCHIMP_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email_address: email,
				status: 'subscribed',
				tags: [source],
				skip_merge_validation: true
			})
		});

		const data = await response.json();

		if (!response.ok) {
			if (data.title === 'Member Exists') {
				return {
					success: true,
					message: "You're already subscribed!"
				};
			}
			throw new Error(data.detail || 'Subscription failed');
		}

		return {
			success: true,
			message: "Successfully subscribed!"
		};
	} catch (error) {
		console.error('Mailchimp subscription error:', error);
		return {
			success: false,
			message: error instanceof Error ? error.message : 'Subscription failed'
		};
	}
}

