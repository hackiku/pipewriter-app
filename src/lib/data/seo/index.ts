// $lib/data/seo/index.ts
export * from './types';
export { defaultSEO } from './defaults';
export { pageSEO } from './pages';

// Helper to build full image URLs
export const getImageUrl = (path: string) => {
	const baseUrl = 'https://pipewriter.io';
	return path.startsWith('http') ? path : `${baseUrl}${path}`;
};

// Helper to build page titles
export const formatTitle = (title: string) => {
	return title.includes('Pipewriter')
		? title
		: `${title} — Pipewriter`;
};

// Get SEO data for a path
export const getSEOData = (path: string, pageData?: any) => {
	const pageSeoData = pageSEO[path] || defaultSEO;

	if (typeof pageSeoData === 'function' && pageData) {
		return pageSeoData(pageData);
	}

	return pageSeoData;
};
