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
		title: "Pipewriter Blog — UX Writing & Product Design",
		description: "Articles about UX writing, copywriting, product design, and the odd space rant.",
		type: "website",
		image: "/og-blog.png"
	},
	'/space': {
		title: "Chute Repack — Aerospace Website Redesign & Dev",
		description: "Orbitally-converting landing pages for space & aerospace industry. SaaS grade UX writing and design, on-brand, delivered in your code stack.",
		type: "website",
		image: "/og-space.png",
		structuredData: {
			"@context": "https://schema.org",
			"@type": "Service",
			"name": "Chute Repack",
			"description": "Professional landing page redesign service for aerospace and space technology companies",
			"provider": {
				"@type": "Organization",
				"name": "Pipewriter",
				"url": "https://pipewriter.io"
			},
			"offers": {
				"@type": "Offer",
				"price": "2000",
				"priceCurrency": "USD",
				"priceValidUntil": "2024-12-31",
				"availability": "https://schema.org/InStock"
			},
			"serviceType": "Web Design",
			"category": "Aerospace Web Development",
		}
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