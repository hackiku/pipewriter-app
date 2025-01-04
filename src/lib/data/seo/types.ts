// $lib/data/seo/types.ts

export interface SEOData {
	title: string;
	description: string;
	type?: 'website' | 'article' | 'product';  // og:type
	image?: string;
	datePublished?: string;          // For blog posts/articles
	dateModified?: string;           // For blog posts/articles
	author?: string;                 // For blog posts
	keywords?: string[];             // Meta keywords if needed
	section?: string;                // For blog posts/articles
	noIndex?: boolean;               // For pages you don't want indexed
	alternateUrls?: {                // For internationalization
		[locale: string]: string;
	};
	structuredData?: object;        // JSON-LD data
}
