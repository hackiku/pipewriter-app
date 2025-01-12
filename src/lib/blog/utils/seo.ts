// lib/blog/utils/seo.ts
import type { SEOData } from '$lib/data/seo/types';
import { getImageUrl, formatTitle } from '$lib/data/seo';

export const generatePostSEO = (post: any): SEOData => ({
	title: formatTitle(post.title),
	description: post.excerpt,
	type: 'article',
	image: getImageUrl(post.heroImage),
	datePublished: post.date,
	structuredData: {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"headline": post.title,
		"datePublished": post.date,
		"articleBody": post.content,
		"author": {
			"@type": "Person",
			"name": post.author || "Ivan Karaman"
		}
	}
});