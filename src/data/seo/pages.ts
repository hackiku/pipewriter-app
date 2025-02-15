// src/data/seo/pages.ts
import type { SEOData } from './types';
import { defaultSEO, seoConfig, getPageKeywords } from './config';

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

	'/blog': createPageSEO({
		title: "Pipewriter Blog — UX Writing & Content Design",
		description: "Expert insights on UX writing, content design, and creating better digital content workflows.",
		type: "website",
		keywords: getPageKeywords('blog', 'informational'),
		structuredData: {
			"@context": "https://schema.org",
			"@type": "Blog",
			"name": "Pipewriter Blog",
			"description": "UX writing and content design insights",
			"publisher": {
				"@type": "Organization",
				"name": "Pipewriter",
				"logo": {
					"@type": "ImageObject",
					"url": `${seoConfig.baseUrl}/logo.png`
				}
			}
		}
	}),

	'blog/[slug]': (post: any): SEOData => {
		const blogKeywords = getPageKeywords('blog', 'informational');

		return {
			title: `${post.title} — Pipewriter Blog`,
			description: post.excerpt || post.description,
			type: "article",
			image: post.ogImage || `/blog/${post.slug}/og.png`,
			datePublished: post.publishedAt,
			dateModified: post.updatedAt,
			author: post.author,
			section: "Blog",
			keywords: [
				...blogKeywords,
				...(post.tags || [])
			].slice(0, 10), // Limit to top 10 most relevant keywords
			structuredData: {
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				"headline": post.title,
				"description": post.excerpt || post.description,
				"image": post.ogImage || `/blog/${post.slug}/og.png`,
				"datePublished": post.publishedAt,
				"dateModified": post.updatedAt,
				"author": {
					"@type": "Person",
					"name": post.author
				},
				"publisher": {
					"@type": "Organization",
					"name": "Pipewriter",
					"logo": {
						"@type": "ImageObject",
						"url": `${seoConfig.baseUrl}/logo.png`
					}
				},
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": `${seoConfig.baseUrl}/blog/${post.slug}`
				},
				"keywords": post.tags?.join(', '),
				"articleSection": "UX Writing",
				"isAccessibleForFree": "True"
			}
		};
	}
};