// src/data/seo/types.ts
export interface SEOData {
	// Core SEO fields
	title: string;
	description: string;
	type: 'website' | 'article' | 'product';
	image?: string;

	// Content metadata
	datePublished?: string;
	dateModified?: string;
	author?: string;

	// SEO optimization
	keywords?: string[];
	priority?: number;
	noIndex?: boolean;

	// Schema data
	structuredData?: {
		"@context": "https://schema.org";
		"@type": string;
		[key: string]: any;
	};
}

// Product-specific schema
export interface ProductSchema extends SEOData {
	structuredData: {
		"@context": "https://schema.org";
		"@type": "SoftwareApplication";
		name: string;
		description: string;
		applicationCategory: string;
		offers: {
			"@type": "Offer";
			price: string;
			priceCurrency: string;
		};
	};
}