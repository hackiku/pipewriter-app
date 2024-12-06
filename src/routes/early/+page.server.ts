// src/routes/early/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const GUMROAD_URL = 'https://pipewriter.gumroad.com/l/wires-for-writers';

// In production, use a proper DB
let clickCount = 0;
let lastClicks: { timestamp: Date; ip: string; source: string }[] = [];

export const load = (async ({ request, getClientAddress }) => {
	const ip = getClientAddress();
	const url = new URL(request.url);
	const referrer = request.headers.get('referer');

	// Get source - default to 'organic' for direct traffic
	let source = url.searchParams.get('utm_source') || 'organic';

	// Track click
	clickCount++;
	lastClicks.push({
		timestamp: new Date(),
		ip,
		source
	});

	// Build redirect URL with UTM params
	const redirectUrl = new URL(GUMROAD_URL);
	redirectUrl.searchParams.set('utm_source', source);
	redirectUrl.searchParams.set('utm_medium', url.searchParams.get('utm_medium') || 'link');
	redirectUrl.searchParams.set('utm_campaign', url.searchParams.get('utm_campaign') || 'early_access');

	throw redirect(303, redirectUrl.toString());
}) satisfies PageServerLoad;

