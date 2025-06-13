// src/routes/api/subscribe/+server.ts

import { json } from '@sveltejs/kit';
import { subscribeToMailchimp } from '$lib/server/subscribe';
import type { RequestHandler } from './$types';

// src/routes/api/subscribe/+server.ts
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email, source } = await request.json();

		if (!email) {
			return json({
				success: false,
				message: 'Email is required'
			}, { status: 400 });
		}

		// Simple, permissive email regex that should accept most valid patterns
		const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

		if (!emailRegex.test(email)) {
			return json({
				success: false,
				message: 'Please enter a valid email address'
			}, { status: 400 });
		}

		const result = await subscribeToMailchimp(email, source);

		return json(result, {
			status: result.success ? 200 : 400
		});

	} catch (error) {
		console.error('Subscribe endpoint error:', error);
		return json({
			success: false,
			message: 'An unexpected error occurred'
		}, { status: 500 });
	}
}