// src/routes/(website)/blog/[slug]/+server.ts
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { readFile } from 'fs/promises';
import { join, extname, resolve } from 'path';

export const GET = async ({ params, request, locals }) => {
	try {
		const url = new URL(request.url);
		const assetPath = url.pathname.replace(`/blog/${params.slug}/`, '');

		// Construct path to content directory
		const contentDir = dev
			? resolve(process.cwd(), 'src/lib/blog/content')
			: resolve(process.cwd(), 'build/client/blog/content');


		const fullPath = join(contentDir, params.slug, assetPath);

		// Security check - ensure path is within content directory
		if (!fullPath.startsWith(contentDir)) {
			throw error(403, 'Invalid asset path');
		}

		const file = await readFile(fullPath);
		const ext = extname(fullPath).toLowerCase();

		const contentType = {
			'.svg': 'image/svg+xml',
			'.png': 'image/png',
			'.jpg': 'image/jpeg',
			'.jpeg': 'image/jpeg',
			'.gif': 'image/gif',
			'.webp': 'image/webp'
		}[ext] || 'application/octet-stream';

		return new Response(file, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': dev ? 'no-cache' : 'public, max-age=31536000'
			}
		});
	} catch (err) {
		console.error('Asset loading error:', err);
		throw error(404, 'Asset not found');
	}
};