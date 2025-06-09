// src/lib/pages/legal/utils/policies.ts
import { dev } from '$app/environment';

export interface LegalPolicy {
	slug: string;
	title: string;
	lastUpdated: string;
	content: any; // Svelte component
}

export async function loadPolicy(slug: string): Promise<LegalPolicy | null> {
	try {
		// Import the markdown file as a Svelte component
		const policy = await import(`../content/${slug}.md`);

		return {
			slug,
			title: policy.metadata?.title || getDefaultTitle(slug),
			lastUpdated: policy.metadata?.lastUpdated || new Date().toISOString().split('T')[0],
			content: policy.default
		};
	} catch (error) {
		console.error(`Failed to load policy: ${slug}`, error);
		return null;
	}
}

function getDefaultTitle(slug: string): string {
	const titles: Record<string, string> = {
		'privacy-policy': 'Privacy Policy',
		'terms-of-service': 'Terms of Service'
	};
	return titles[slug] || slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}