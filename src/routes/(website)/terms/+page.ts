// src/routes/(website)/terms/+page.ts
import { error } from '@sveltejs/kit';
import { loadPolicy } from '$lib/pages/legal/utils/policies';

export const load = async () => {
	const policy = await loadPolicy('terms-of-service');

	if (!policy) {
		throw error(404, 'Terms of service not found');
	}

	return { policy };
};