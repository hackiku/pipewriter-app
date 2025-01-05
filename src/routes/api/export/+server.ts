// src/routes/api/export/+server.ts

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MAKE_WEBHOOK_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email, content, format } = await request.json();

		if (!email) {
			return json({
				success: false,
				message: 'Email is required'
			}, { status: 400 });
		}

		// Send to Make.com webhook
		try {
			await fetch(MAKE_WEBHOOK_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					content,
					format,
					timestamp: new Date().toISOString(),
					source: 'pipewriter-export'
				})
			});

			return json({
				success: true,
				message: 'Content will be sent to your email shortly!'
			});

		} catch (error) {
			console.error('Make.com webhook error:', error);
			return json({
				success: false,
				message: 'Failed to process export request'
			}, { status: 500 });
		}

	} catch (error) {
		console.error('Export endpoint error:', error);
		return json({
			success: false,
			message: 'An unexpected error occurred'
		}, { status: 500 });
	}
}