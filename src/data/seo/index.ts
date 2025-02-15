// src/data/seo/index.ts
/**
 * Central export point for SEO functionality
 * Coordinates all SEO-related features and ensures proper dependency management
 */

// Type definitions
export * from './types';

// Core configurations
export {
	seoConfig,
	defaultSEO,
	getPageKeywords
} from './config';

// Page-specific SEO configurations
export { pageSEO } from './pages';

// Utility functions
export {
	getSEOData,
	validateSEOData,
	generateStructuredData
} from './utils';

// Helper functions
export {
	generateOpenGraph,
	generateTwitterCard,
	trackPageView,
	ensureAbsoluteUrls,
	sanitizeDescription,
	formatStructuredData
} from './helpers';

// Additional exports for convenience
export type {
	MetaOptions,
	GeneratedSEOData
} from './types';

// Interfaces for plugin system extensibility
export interface SEOPlugin {
	name: string;
	priority: number;
	transform: (data: SEOData) => Promise<SEOData>;
}

// Helper type for SEO data generation
interface GenerateOptions {
	path: string;
	pageData?: any;
	plugins?: SEOPlugin[];
}

/**
 * Main SEO data generator with plugin support
 * @param options Generation options including path and optional data
 * @returns Promise resolving to complete SEO data
 */
export const generateCompleteSEOData = async ({
	path,
	pageData,
	plugins = []
}: GenerateOptions): Promise<SEOData> => {
	// Get base SEO data
	let seoData = getSEOData(path, pageData);

	// Ensure title suffix
	if (!seoData.title.includes(seoConfig.titleSuffix)) {
		seoData.title = `${seoData.title}${seoConfig.titleSuffix}`;
	}

	// Process through plugins in priority order
	if (plugins.length > 0) {
		const sortedPlugins = [...plugins].sort((a, b) => b.priority - a.priority);

		for (const plugin of sortedPlugins) {
			try {
				seoData = await plugin.transform(seoData);
			} catch (error) {
				console.error(`Error in SEO plugin ${plugin.name}:`, error);
			}
		}
	}

	// Ensure all URLs are absolute
	seoData = ensureAbsoluteUrls(seoData);

	// Sanitize description
	seoData.description = sanitizeDescription(seoData.description);

	return seoData;
};