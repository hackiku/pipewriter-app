// routes/(website)/blog/+page.ts
import { posts } from '$lib/pages/blog/posts/_posts';

export const load = () => {
	return {
		posts
	};
};
