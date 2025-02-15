// src/routes/(website)/+layout.ts
import { getSEOData } from '$data/seo/utils';
import { defaultSEO } from '$data/seo/config';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, data, route }) => {
	// Skip SEO generation for specific routes
	const skipSEO = route.id?.includes('(space)') ||
		url.pathname.startsWith('/iframe') ||
		url.pathname.startsWith('/api');

	if (skipSEO) {
		return {
			currentPath: url.pathname
		};
	}

	try {
		const seoData = getSEOData(url.pathname, data);

		return {
			seo: seoData,
			currentPath: url.pathname
		};
	} catch (error) {
		console.error(`Error loading SEO data for ${url.pathname}:`, error);
		return {
			seo: defaultSEO,
			currentPath: url.pathname
		};
	}
};
