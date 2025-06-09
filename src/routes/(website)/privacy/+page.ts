// src/routes/(website)/privacy/+page.ts
import { error } from '@sveltejs/kit';
import { loadPolicy } from '$lib/pages/legal/utils/policies';

export const load = async () => {
	const policy = await loadPolicy('privacy-policy');

	if (!policy) {
		throw error(404, 'Privacy policy not found');
	}

	return { policy };
};