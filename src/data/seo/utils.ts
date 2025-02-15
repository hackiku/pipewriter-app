// src/data/seo/utils.ts
import type { SEOData } from './types';
import { defaultSEO, seoConfig } from './config';
import { pageSEO } from './pages';


export function getSEOData(path: string, pageData?: any): SEOData {
	try {
		// Handle dynamic routes first
		if (path.includes('/blog/') && pageData) {
			const dynamicSEO = pageSEO['blog/[slug]'];
			if (typeof dynamicSEO === 'function') {
				return {
					...defaultSEO,
					...dynamicSEO(pageData)
				};
			}
		}

		// Check for exact page match
		const exactMatch = pageSEO[path];
		if (exactMatch) {
			return {
				...defaultSEO,
				...(typeof exactMatch === 'function' ? exactMatch(pageData) : exactMatch)
			};
		}

		// Apply default SEO with path-specific modifications
		return {
			...defaultSEO,
			canonical: `${seoConfig.baseUrl}${path}`
		};
	} catch (error) {
		console.error(`Error generating SEO data for ${path}:`, error);
		return defaultSEO;
	}
}

export function validateSEOData(data: SEOData): boolean {
	const requiredFields = ['title', 'description', 'type'];
	return requiredFields.every(field => Boolean(data[field]));
}

export function generateStructuredData(data: SEOData, path: string): object {
	const baseStructuredData = {
		"@context": "https://schema.org",
		"@type": data.type === 'article' ? 'Article' : 'WebPage',
		"url": `${seoConfig.baseUrl}${path}`,
		"name": data.title,
		"description": data.description
	};

	if (data.type === 'article') {
		return {
			...baseStructuredData,
			"datePublished": data.datePublished,
			"dateModified": data.dateModified,
			"author": data.author
		};
	}

	return baseStructuredData;
}