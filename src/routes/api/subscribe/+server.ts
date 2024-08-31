import { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json();

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
				status: 'pending', // This will send a confirmation email
			}),
		});

		const data = await response.json();

		if (response.ok) {
			return json({ success: true, message: 'Please check your email to confirm your subscription.' });
		} else {
			// Check for specific error codes
			if (data.title === 'Member Exists') {
				// The member already exists, let's try to update their status
				const subscriberHash = Buffer.from(email.toLowerCase()).toString('hex');
				const updateResponse = await fetch(`${MAILCHIMP_MEMBER_API}/${subscriberHash}`, {
					method: 'PATCH',
					headers: {
						Authorization: `apikey ${MAILCHIMP_API_KEY}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ status: 'pending' }),
				});

				if (updateResponse.ok) {
					return json({ success: true, message: 'Please check your email to confirm your subscription.' });
				} else {
					return json({ error: 'You are already subscribed or have previously unsubscribed. Please check your email for any previous communications.' }, { status: 400 });
				}
			} else {
				return json({ error: data.detail || 'An error occurred while subscribing. Please try again.' }, { status: 400 });
			}
		}
	} catch (error) {
		console.error('Mailchimp API error:', error);
		return json({ error: 'An error occurred. Please try again.' }, { status: 500 });
	}
};