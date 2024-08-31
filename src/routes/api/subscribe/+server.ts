// src/routes/api/subscribe/+server.ts


import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json();

	// Replace with your Mailchimp API key and list ID
	const MAILCHIMP_API_KEY = 'your-mailchimp-api-key';
	const MAILCHIMP_LIST_ID = 'your-mailchimp-list-id';
	const MAILCHIMP_DC = MAILCHIMP_API_KEY.split('-')[1];

	const data = {
		email_address: email,
		status: 'subscribed'
	};

	try {
		const response = await fetch(
			`https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
			{
				method: 'POST',
				headers: {
					Authorization: `apikey ${MAILCHIMP_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}
		);

		if (response.status === 200) {
			return json({ success: true });
		} else {
			const errorData = await response.json();
			return json({ error: errorData.detail || 'Subscription failed' }, { status: 400 });
		}
	} catch (error) {
		console.error('Mailchimp API error:', error);
		return json({ error: 'An error occurred' }, { status: 500 });
	}
};