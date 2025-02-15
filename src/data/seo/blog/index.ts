// src/data/seo/blog/index.ts

import type { SEOData } from '../types';
import { seoConfig, getPageKeywords } from '../config';

interface BlogPostMetadata {
	title: string;
	excerpt?: string;
	date: string;
	category?: string;
	author?: {
		name: string;
		avatar?: string;
	};
	slug: string;
	tags?: string[];
}

export function generateBlogPostSEO(post: BlogPostMetadata): SEOData {
	const blogKeywords = getPageKeywords('blog', 'informational');
	const publicationDate = new Date(post.date).toISOString();

	return {
		title: `${post.title} — Pipewriter Blog`,
		description: post.excerpt || `Read ${post.title} on the Pipewriter blog`,
		type: "article",
		image: `/blog/${post.slug}/og.png`,
		datePublished: publicationDate,
		dateModified: publicationDate,
		author: post.author?.name,
		section: "Blog",
		keywords: [
			...blogKeywords,
			...(post.tags || []),
			post.category || "UX Writing"
		].slice(0, 10),
		structuredData: {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"headline": post.title,
			"description": post.excerpt,
			"image": `${seoConfig.baseUrl}/blog/${post.slug}/og.png`,
			"datePublished": publicationDate,
			"dateModified": publicationDate,
			"author": {
				"@type": "Person",
				"name": post.author?.name || "Pipewriter Team"
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
			"articleSection": post.category || "UX Writing",
			"isAccessibleForFree": "True"
		}
	};
}

// Blog index page SEO
export const blogIndexSEO: SEOData = {
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
};