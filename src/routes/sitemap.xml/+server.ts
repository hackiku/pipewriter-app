// src/routes/sitemap.xml/+server.ts
import { pageSEO } from '$data/seo/pages';
import { seoConfig } from '$data/seo/config';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		// Filter out dynamic routes and internal routes
		const validPages = Object.entries(pageSEO)
			.filter(([path]) => {
				// Exclude dynamic routes and protected routes
				return !path.includes('[') &&
					!path.includes('(space)') &&
					!path.startsWith('/api') &&
					!path.startsWith('/iframe') &&
					!path.startsWith('/admin');
			})
			.map(([path, data]) => {
				// Safely access data properties
				const seoData = typeof data === 'function' ? null : data;
				return {
					url: `${seoConfig.baseUrl}${path}`,
					lastmod: new Date().toISOString().split('T')[0],
					priority: seoData?.priority || seoConfig.defaultPriority || 0.7
				};
			})
			.filter(page => page.url && page.lastmod); // Ensure all required fields exist

		const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${validPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

		return new Response(xml.trim(), {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'public, max-age=3600'
			}
		});
	} catch (error) {
		console.error('Sitemap generation error:', error);

		// Return a minimal valid sitemap in case of errors
		const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${seoConfig.baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;

		return new Response(fallbackXml, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'public, max-age=3600'
			}
		});
	}
}