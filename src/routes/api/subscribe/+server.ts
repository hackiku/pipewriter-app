// src/routes/api/subscribe/+server.ts
import { json } from '@sveltejs/kit';
import { subscribeToMailchimp } from '$lib/server/subscribe';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { email, source } = await request.json();

	if (!email) {
		return json({
			success: false,
			message: 'Email is required'
		}, { status: 400 });
	}

	const result = await subscribeToMailchimp(email, source);

	return json(result, {
		status: result.success ? 200 : 400
	});
};
