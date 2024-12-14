// routes/(website)/blog/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/pages/blog/posts/_posts';

export const load = async ({ params }) => {
	const post = getPostBySlug(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	try {
		const module = await import(`../../../../../src/lib/pages/blog/posts/${params.slug}.md`);
		return {
			post: {
				...post,
				content: module.default
			}
		};
	} catch (e) {
		console.error('Failed to load post content:', e);
		throw error(500, 'Could not load post content');
	}
};