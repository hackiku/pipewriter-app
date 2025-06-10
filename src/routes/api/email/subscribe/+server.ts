// src/routes/api/email/subscribe/+server.ts

import { json } from '@sveltejs/kit';
import { addToAudience, sendEmail } from '$lib/server/email/resend';
import { generateWelcomeEmail } from '$lib/server/email/templates/welcome';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email, source = 'website' } = await request.json();

		if (!email) {
			return json({
				success: false,
				message: 'Email is required'
			}, { status: 400 });
		}

		const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
		if (!emailRegex.test(email)) {
			return json({
				success: false,
				message: 'Please enter a valid email address'
			}, { status: 400 });
		}

		// Add to Resend audience
		const subscribeResult = await addToAudience(email, source);

		if (!subscribeResult.success) {
			return json(subscribeResult, { status: 400 });
		}

		// Send welcome email (only if new subscriber)
		if (subscribeResult.message !== 'Already subscribed!') {
			const { subject, html, text } = generateWelcomeEmail(email);
			const emailResult = await sendEmail({
				to: email,
				subject,
				html,
				text
			});

			if (!emailResult.success) {
				console.error('Welcome email failed:', emailResult.error);
			}
		}

		return json({
			success: true,
			message: subscribeResult.message
		});

	} catch (error) {
		console.error('Subscribe endpoint error:', error);
		return json({
			success: false,
			message: 'An unexpected error occurred'
		}, { status: 500 });
	}
};