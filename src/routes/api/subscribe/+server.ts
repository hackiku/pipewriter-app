// src/routes/api/subscribe/+server.ts

import { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// src/routes/api/subscribe/+server.ts

// ...previous imports...

export const POST: RequestHandler = async ({ request }) => {
	const { email, source } = await request.json(); // Add source parameter for tracking

	const MAILCHIMP_DC = MAILCHIMP_API_KEY.split('-')[1];
	const MAILCHIMP_MEMBER_API = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

	try {
		const response = await fetch(MAILCHIMP_MEMBER_API, {
			method: 'POST',
			headers: {
				Authorization: `apikey ${MAILCHIMP_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email_address: email,
				status: 'subscribed', // Changed from 'pending' to skip confirmation
				tags: [source || 'Website'] // Track where the subscription came from
			}),
		});

		const data = await response.json();

		if (response.ok) {
			return json({ success: true, message: 'Successfully subscribed!' });
		} else {
			// Check for specific error codes
			if (data.title === 'Member Exists') {
				return json({ success: true, message: 'Already subscribed!' });
			} else {
				return json({
					success: false,
					error: data.detail || 'An error occurred while subscribing.'
				}, { status: 400 });
			}
		}
	} catch (error) {
		console.error('Mailchimp API error:', error);
		return json({
			success: false,
			error: 'An error occurred. Please try again.'
		}, { status: 500 });
	}
};