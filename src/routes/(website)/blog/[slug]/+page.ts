// routes/(website)/blog/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import { getPost } from '$lib/blog/utils/posts';

export const load = async ({ params }) => {
	const post = await getPost(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return { post };
};