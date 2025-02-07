// src/routes/early/+page.server.ts
import { redirect } from '@sveltejs/kit';

const CHECKOUT_URL = "https://app.gumroad.com/checkout?product=qmifdo&quantity=1";

export const load = (async ({ request, getClientAddress }) => {
	// Basic logging to server logs (shows up in Vercel logs)
	console.log({
		timestamp: new Date().toISOString(),
		ip: getClientAddress(),
		url: request.url
	});

	throw redirect(302, CHECKOUT_URL);
}) satisfies PageServerLoad;