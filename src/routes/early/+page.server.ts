// src/routes/early/+page.server.ts
import type { PageServerLoad } from './$types';

const GUMROAD_URL = 'https://pipewriter.gumroad.com/l/wires-for-writers';

export const load = (async ({ request, getClientAddress }) => {
	const ip = getClientAddress();
	const url = new URL(request.url);
	const source = url.searchParams.get('utm_source') || 'organic';

	// Build redirect URL with UTM params
	const redirectUrl = new URL(GUMROAD_URL);
	redirectUrl.searchParams.set('utm_source', source);
	redirectUrl.searchParams.set('utm_medium', url.searchParams.get('utm_medium') || 'link');
	redirectUrl.searchParams.set('utm_campaign', url.searchParams.get('utm_campaign') || 'early_access');

	// Always return URL instead of redirecting
	return { redirectUrl: redirectUrl.toString() };
}) satisfies PageServerLoad;
