// src/data/seo/helpers.ts
import type { SEOData } from './types';
import { seoConfig } from './config';

/**
 * Generates Open Graph metadata for social sharing
 * @param seoData Base SEO data to generate Open Graph tags from
 * @returns Object containing Open Graph metadata
 */
export const generateOpenGraph = (seoData: SEOData) => {
	const baseUrl = seoConfig.baseUrl.replace(/\/$/, '');

	return {
		title: seoData.title,
		description: seoData.description,
		type: seoData.type,
		image: seoData.image
			? (seoData.image.startsWith('http')
				? seoData.image
				: `${baseUrl}${seoData.image}`)
			: `${baseUrl}${seoConfig.social.defaultImage.url}`,
		url: baseUrl,
		siteName: 'Pipewriter',
		locale: 'en_US'
	};
};

/**
 * Generates Twitter Card metadata for Twitter sharing
 * @param seoData Base SEO data to generate Twitter Card from
 * @returns Object containing Twitter Card metadata
 */
export const generateTwitterCard = (seoData: SEOData) => {
	const baseUrl = seoConfig.baseUrl.replace(/\/$/, '');

	return {
		card: 'summary_large_image',
		title: seoData.title.replace(seoConfig.titleSuffix, '').trim(), // Remove suffix for Twitter
		description: seoData.description,
		image: seoData.image
			? (seoData.image.startsWith('http')
				? seoData.image
				: `${baseUrl}${seoData.image}`)
			: `${baseUrl}${seoConfig.social.defaultImage.url}`,
		creator: '@pipewriter', // Consider making this configurable
		site: '@pipewriter'
	};
};

/**
 * Analytics event tracking for page views
 * @param path Current page path
 * @param seoData Associated SEO data
 */
export const trackPageView = (path: string, seoData: SEOData) => {
	// Implement your analytics tracking here
	// Example with type safety for analytics events
	const eventData = {
		path,
		title: seoData.title,
		type: seoData.type,
		keywords: seoData.keywords || [],
		timestamp: new Date().toISOString()
	};

	// Log the event (replace with your analytics implementation)
	console.log('Page View:', eventData);
};

/**
 * Ensures all URLs in SEO data are absolute
 * @param seoData SEO data to process
 * @returns SEO data with absolute URLs
 */
export const ensureAbsoluteUrls = (seoData: SEOData): SEOData => {
	const baseUrl = seoConfig.baseUrl.replace(/\/$/, '');

	return {
		...seoData,
		image: seoData.image && !seoData.image.startsWith('http')
			? `${baseUrl}${seoData.image}`
			: seoData.image,
		canonical: `${baseUrl}${seoData.canonical || ''}`
	};
};

/**
 * Validates and sanitizes SEO meta description
 * @param description Meta description to validate
 * @returns Validated and truncated description
 */
export const sanitizeDescription = (description: string): string => {
	const maxLength = 160;
	let sanitized = description
		.replace(/[\r\n]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

	if (sanitized.length > maxLength) {
		sanitized = sanitized.substring(0, maxLength - 3) + '...';
	}

	return sanitized;
};

/**
 * Formats schema.org structured data
 * @param seoData Base SEO data
 * @param path Current page path
 * @returns Formatted structured data object
 */
export const formatStructuredData = (seoData: SEOData, path: string) => {
	const baseUrl = seoConfig.baseUrl.replace(/\/$/, '');

	// Return existing structured data if present
	if (seoData.structuredData) {
		return seoData.structuredData;
	}

	// Generate default structured data based on page type
	const baseStructuredData = {
		"@context": "https://schema.org",
		"@type": seoData.type === 'article' ? 'Article' : 'WebPage',
		"url": `${baseUrl}${path}`,
		"name": seoData.title,
		"description": seoData.description
	};

	if (seoData.type === 'article') {
		return {
			...baseStructuredData,
			"datePublished": seoData.datePublished,
			"dateModified": seoData.dateModified || seoData.datePublished,
			"author": {
				"@type": "Person",
				"name": seoData.author
			},
			"publisher": {
				"@type": "Organization",
				"name": "Pipewriter",
				"logo": {
					"@type": "ImageObject",
					"url": `${baseUrl}/logo.png`
				}
			}
		};
	}

	return baseStructuredData;
};