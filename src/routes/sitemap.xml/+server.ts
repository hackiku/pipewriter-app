// src/routes/sitemap.xml/+server.ts
import { pageSEO } from '$data/seo/pages';
import { seoConfig } from '$data/seo/config';
import type { RequestHandler } from './$types';
import path from 'path';
import fs from 'fs/promises';

interface SitemapEntry {
	url: string;
	lastmod: string;
	priority: number;
	changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

async function getBlogPosts(): Promise<SitemapEntry[]> {
	try {
		const contentDir = path.join(process.cwd(), 'src/lib/blog/content');
		const entries = await fs.readdir(contentDir, { withFileNumbers: true });

		const posts = [];
		for (const entry of entries) {
			// Skip hidden directories and draft posts
			if (entry.startsWith('.') || entry.startsWith('_')) continue;

			const postDir = path.join(contentDir, entry);
			const stats = await fs.stat(postDir);

			if (stats.isDirectory()) {
				// Check for markdown files that aren't drafts
				const files = await fs.readdir(postDir);
				const mdFile = files.find(file =>
					file.endsWith('.md') &&
					!file.includes('xxx') &&
					!file.includes('no')
				);

				if (mdFile) {
					const fileStats = await fs.stat(path.join(postDir, mdFile));
					posts.push({
						url: `${seoConfig.baseUrl}/blog/${entry}`,
						lastmod: fileStats.mtime.toISOString().split('T')[0],
						priority: 0.6,
						changefreq: 'monthly'
					});
				}
			}
		}
		return posts;
	} catch (error) {
		console.error('Error reading blog posts:', error);
		return [];
	}
}

export const GET: RequestHandler = async () => {
	try {
		// Define priorities and change frequencies for different types of pages
		const pageMetadata = {
			'/': { priority: 1.0, changefreq: 'weekly' },
			'/blog': { priority: 0.8, changefreq: 'daily' },
			'/about': { priority: 0.7, changefreq: 'monthly' },
			'/pricing': { priority: 0.9, changefreq: 'weekly' }
		} as const;

		// Process static pages
		const staticPages: SitemapEntry[] = Object.entries(pageSEO)
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

		// Get blog posts
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
};