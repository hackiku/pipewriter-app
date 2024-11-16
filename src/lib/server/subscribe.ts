// src/lib/server/subscribe.ts
import { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID } from '$env/static/private';

export interface SubscribeResponse {
	success: boolean;
	message: string;
	error?: {
		type?: string;
		title?: string;
		detail?: string;
	};
}

export async function subscribeToMailchimp(email: string, source: string): Promise<SubscribeResponse> {
	const MAILCHIMP_DC = MAILCHIMP_API_KEY.split('-')[1];
	const MAILCHIMP_MEMBER_API = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

	try {
		// Hash the email for member lookup
		const emailHash = await crypto.subtle.digest(
			'SHA-256',
			new TextEncoder().encode(email.toLowerCase())
		);
		const hashHex = Array.from(new Uint8Array(emailHash))
			.map(b => b.toString(16).padStart(2, '0'))
			.join('');

		// First, try to get the member's status
		const checkResponse = await fetch(`${MAILCHIMP_MEMBER_API}/${hashHex}`, {
			method: 'GET',
			headers: {
				'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
				'Content-Type': 'application/json'
			}
		});

		const memberExists = checkResponse.status === 200;
		const memberData = memberExists ? await checkResponse.json() : null;

		// If member exists but was cleaned/archived, we need to use PUT to reactivate
		const method = memberExists ? 'PUT' : 'POST';
		const endpoint = memberExists ?
			`${MAILCHIMP_MEMBER_API}/${hashHex}` :
			MAILCHIMP_MEMBER_API;

		const response = await fetch(endpoint, {
			method,
			headers: {
				'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email_address: email,
				status: 'subscribed', // Use 'pending' for double opt-in, 'subscribed' for single opt-in
				status_if_new: 'subscribed', // Important for PUT requests
				tags: [source || 'Website'],
				merge_fields: {
					SOURCE: source || 'Website'
				}
			})
		});

		const data = await response.json();

		if (!response.ok) {
			// Handle specific error cases
			if (data.title === 'Member Exists') {
				// Update existing member's tags
				const updateResponse = await fetch(`${MAILCHIMP_MEMBER_API}/${hashHex}/tags`, {
					method: 'POST',
					headers: {
						'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						tags: [{ name: source, status: 'active' }]
					})
				});

				if (updateResponse.ok) {
					return {
						success: true,
						message: "You're already subscribed, but we've updated your preferences!"
					};
				}
			}

			throw new Error(data.detail || 'Subscription failed');
		}

		return {
			success: true,
			message: data.status === 'pending'
				? "Please check your email to confirm your subscription!"
				: "Successfully subscribed! Check your inbox for updates."
		};

	} catch (error) {
		console.error('Mailchimp subscription error:', error);
		return {
			success: false,
			message: error instanceof Error ? error.message : 'Subscription failed',
			error: {
				detail: error instanceof Error ? error.message : 'Unknown error occurred'
			}
		};
	}
}