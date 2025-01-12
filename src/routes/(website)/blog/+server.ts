// src/routes/blog/+server.ts
import { dev } from '$app/environment';

export const GET = async ({ url, request }) => {
	const response = await fetch(
		url.pathname.replace('/blog', dev ? '/src/lib/blog/content' : '/content'),
		request
	);

	return new Response(response.body, {
		status: response.status,
		headers: {
			'Content-Type': response.headers.get('Content-Type') ?? 'application/octet-stream',
			'Cache-Control': 'public, max-age=31536000'
		}
	});
};