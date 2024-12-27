// $lib/utils/seo.ts
import { page } from '$app/stores';
import { defaultSEO, pageSEO } from '$lib/data/seo';

export function getSEOData(path: string, pageData?: any): SEOData {
	// Check for exact page match
	if (pageSEO[path]) {
		return pageSEO[path];
	}

	// Check for dynamic routes
	const isDynamicRoute = path.includes('/blog/');
	if (isDynamicRoute && pageData) {
		const dynamicSEO = pageSEO['blog/[slug]'];
		if (typeof dynamicSEO === 'function') {
			return dynamicSEO(pageData);
		}
	}

	// Fallback to defaults
	return defaultSEO;
}