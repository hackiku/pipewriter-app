// $lib/data/seo/pages.ts
import type { SEOData } from './types';
import { defaultSEO } from './defaults';

export const pageSEO: Record<string, SEOData | ((data: any) => SEOData)> = {
	'/': defaultSEO,

	'/about': {
		title: "About Pipewriter — Building Tools for Writers",
		description: "Meet the team building Pipewriter, the UX app for technical writers. Made by writers, for writers.",
		type: "website",
		image: "/og-about.png"
	},

	'/blog': {
		title: "Pipewriter Blog — UX Writing & Technical Content",
		description: "Articles about UX writing, technical writing, and building better documentation.",
		type: "website",
		image: "/og-blog.png"
	},

	// Dynamic route example (blog posts)
	'blog/[slug]': (post: any): SEOData => ({
		title: `${post.title} — Pipewriter Blog`,
		description: post.excerpt || post.description,
		type: "article",
		image: post.ogImage || `/blog/${post.slug}/og.png`,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt,
		author: post.author,
		section: "Blog",
		structuredData: {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"headline": post.title,
			"datePublished": post.publishedAt,
		}
	})
};