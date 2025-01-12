// src/routes/(website)/blog/+page.ts
import { loadPosts } from '$lib/blog/utils/posts';

export const load = async () => {
	const posts = await loadPosts();
	return { posts };
};