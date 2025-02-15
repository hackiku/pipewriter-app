// src/data/seo/config.ts
import type { SEOData } from './types';

interface KeywordIntent {
	commercial: string[];
	informational: string[];
	navigational: string[];
}

interface KeywordGroup {
	primary: string[];
	secondary: string[];
	intent: KeywordIntent;
}

export const seoConfig = {
	// Base configuration
	baseUrl: 'https://pipewriter.io',
	titleSuffix: '— Pipewriter',
	defaultPriority: 0.7,

	// Social media configuration
	social: {
		defaultImage: {
			url: '/images/og/pipewriter-social.png',
			width: 1200,
			height: 630,
			alt: 'Pipewriter - UX App for Writers in Google Docs'
		},
		fallbackImage: {
			url: '/images/og/pipewriter-fallback.png',
			width: 800,
			height: 418,
			alt: 'Pipewriter'
		}
	},

	// Platform-specific settings
	platforms: {
		instagram: {
			enabled: false,
			alternateLink: 'https://pipewriter.gumroad.com'
		}
	},

	// Comprehensive keyword management
	keywords: {
		core: {
			primary: [
				'UX writing tool',
				'Google Docs wireframe',
				'content design tool',
				'copywriting wireframe',
				'UX writer tools'
			],
			secondary: [
				'wireframe in Google Docs',
				'UX writing workflow',
				'content first design',
				'copywriting deliverables',
				'writer first prototyping'
			],
			intent: {
				commercial: [
					'best UX writing tool',
					'buy wireframing tool',
					'UX writing software pricing'
				],
				informational: [
					'how to wireframe in Google Docs',
					'UX writing examples',
					'content design process'
				],
				navigational: [
					'Pipewriter login',
					'Pipewriter docs',
					'Pipewriter templates'
				]
			}
		},

		// Page-specific keyword groups
		product: {
			primary: [
				'UX writing tool',
				'Google Docs wireframe',
				'wireframing for writers'
			],
			secondary: [
				'professional UX deliverables',
				'writer-first prototyping',
				'content design workflow'
			],
			intent: {
				commercial: [
					'buy UX writing tool',
					'wireframing tool pricing'
				],
				informational: [
					'how to create UX deliverables',
					'wireframing best practices'
				],
				navigational: [
					'Pipewriter features',
					'Pipewriter pricing'
				]
			}
		},

		blog: {
			primary: [
				'UX writing tips',
				'content design insights',
				'wireframing tutorials'
			],
			secondary: [
				'UX writing best practices',
				'content design process',
				'wireframing for beginners'
			],
			intent: {
				commercial: [],  // Blog content typically doesn't target commercial intent
				informational: [
					'learn UX writing',
					'content design examples',
					'wireframing guides'
				],
				navigational: [
					'Pipewriter blog',
					'UX writing resources'
				]
			}
		}
	}
};

// Default SEO configuration
export const defaultSEO: SEOData = {
	title: "Pipewriter — UX App for Writers (Early Access)",
	description: "Wireframe copy decks in Google Docs. For UX writers, copywriters, and content strategists. Web app coming soon.",
	type: "website",
	image: seoConfig.social.defaultImage.url,
	keywords: seoConfig.keywords.core.primary,
	structuredData: {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "Pipewriter",
		"description": "UX writing and wireframing tool for Google Docs",
		"applicationCategory": "DesignApplication",
		"offers": {
			"@type": "Offer",
			"price": "59",
			"priceCurrency": "USD"
		},
		"additionalType": [
			"UX Writing Tool",
			"Content Design Software",
			"Wireframing Application"
		],
		"potentialAction": {
			"@type": "UseAction",
			"description": "Create professional UX wireframes directly in Google Docs"
		}
	}
};

// Utility function to get relevant keywords for different page types
export const getPageKeywords = (
	pageType: 'product' | 'blog' | 'core',
	intentType?: keyof KeywordIntent
) => {
	const keywordGroup = seoConfig.keywords[pageType];

	if (intentType) {
		return keywordGroup.intent[intentType];
	}

	return [...keywordGroup.primary, ...keywordGroup.secondary];
};