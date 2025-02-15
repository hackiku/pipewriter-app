// src/routes/sitemap.xml/+server.ts
import { pageSEO } from '$data/seo/pages';
import { seoConfig } from '$data/seo/config';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import path from 'path';
import fs from 'fs/promises';

async function getBlogPosts() {
	try {
		// Determine the correct content directory path based on environment
		const contentDir = dev
			? path.join(process.cwd(), 'src/lib/blog/content')
			: path.join(process.cwd(), 'build/client/blog/content');

		try {
			await fs.access(contentDir);
		} catch (e) {
			console.warn(`Blog content directory not found at ${contentDir}`);
			return [];
		}

		const entries = await fs.readdir(contentDir, { withFileTypes: true });
		const posts = [];

		for (const entry of entries) {
			if (entry.isDirectory()) {
				const postDir = path.join(contentDir, entry.name);
				const files = await fs.readdir(postDir);

				// Look for published markdown files
				const mdFile = files.find(file =>
					file.endsWith('.md') &&
					!file.includes('xxx') &&
					!file.includes('no')
				);

				if (mdFile) {
					const fileStats = await fs.stat(path.join(postDir, mdFile));
					posts.push({
						url: `${seoConfig.baseUrl}/blog/${entry.name}`,
						lastmod: fileStats.mtime.toISOString().split('T')[0],
						changefreq: 'monthly',
						priority: 0.6
					});
				}
			}
		}

		return posts;
	} catch (error) {
		console.error('Error reading blog posts:', error);
		// Return empty array instead of failing completely
		return [];
	}
}

export const GET: RequestHandler = async () => {
	try {
		const pageMetadata = {
			'/': { priority: 1.0, changefreq: 'weekly' },
			'/blog': { priority: 0.8, changefreq: 'daily' },
			'/about': { priority: 0.7, changefreq: 'monthly' }
		} as const;

		// Process static pages
		const staticPages = Object.entries(pageSEO)
			.filter(([path]) => {
				return !path.includes('[') &&
					!path.includes('(space)') &&
					!path.startsWith('/api') &&
					!path.startsWith('/iframe') &&
					!path.startsWith('/admin');
			})
			.map(([path]) => ({
				url: `${seoConfig.baseUrl}${path}`,
				lastmod: new Date().toISOString().split('T')[0],
				priority: pageMetadata[path]?.priority || 0.7,
				changefreq: pageMetadata[path]?.changefreq || 'monthly'
			}));

		// Get blog posts with better error handling
		const blogPosts = await getBlogPosts();

		// Combine all entries
		const allEntries = [...staticPages, ...blogPosts];

		const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
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
    <changefreq>weekly</changefreq>
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