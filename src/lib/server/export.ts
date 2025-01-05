// src/routes/api/export/+server.ts

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sendToMake } from '$lib/server/export';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const payload = await request.json();

		if (!payload.email) {
			return json({
				success: false,
				message: 'Email is required'
			}, { status: 400 });
		}

		const result = await sendToMake(payload);

		return json(result, {
			status: result.success ? 200 : 400
		});

	} catch (error) {
		console.error('Export endpoint error:', error);
		return json({
			success: false,
			message: 'An unexpected error occurred'
		}, { status: 500 });
	}
}