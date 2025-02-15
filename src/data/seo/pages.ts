// src/data/seo/pages.ts
import type { SEOData } from './types';
import { defaultSEO, seoConfig, getPageKeywords } from './config';
import { generateBlogPostSEO, blogIndexSEO } from './blog';

const createPageSEO = (data: Partial<SEOData>): SEOData => ({
	...defaultSEO,
	...data,
	keywords: [
		...(defaultSEO.keywords || []),
		...(data.keywords || [])
	]
});

export const pageSEO: Record<string, SEOData | ((data: any) => SEOData)> = {
	'/': createPageSEO({
		title: "Pipewriter — UX App for Writers in Google Docs",
		description: "Create professional wireframes and UX deliverables directly in Google Docs. The first writing-first prototyping tool for UX writers and content designers.",
		type: "product",
		keywords: getPageKeywords('product', 'commercial'),
		structuredData: {
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			"name": "Pipewriter",
			"description": "UX writing and wireframing tool for Google Docs",
			"applicationCategory": "DesignApplication",
			"offers": {
				"@type": "Offer",
				"price": "59",
				"priceCurrency": "USD",
				"priceValidUntil": "2024-12-31"
			},
			"features": [
				"Google Docs integration",
				"UX wireframing",
				"Content design tools",
				"Writer-first prototyping"
			],
			"aggregateRating": {
				"@type": "AggregateRating",
				"ratingValue": "4.8",
				"ratingCount": "30"
			}
		}
	}),

	'/about': createPageSEO({
		title: "About Pipewriter — Tools for UX Writers",
		description: "Meet the team building Pipewriter, the UX app for writers who care about design. Made by writers, for writers.",
		type: "website",
		keywords: getPageKeywords('core', 'informational'),
		structuredData: {
			"@context": "https://schema.org",
			"@type": "AboutPage",
			"name": "About Pipewriter",
			"description": "Meet the team building Pipewriter",
			"mainEntity": {
				"@type": "Organization",
				"name": "Pipewriter",
				"description": "UX writing and wireframing tools for content professionals"
			}
		}
	}),
	'/blog': createPageSEO(blogIndexSEO),
	'blog/[slug]': (post: any): SEOData => generateBlogPostSEO(post)
};