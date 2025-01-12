// src/lib/blog/utils/posts.ts
import type { BlogPost } from '../types';

// Load all posts
export const loadPosts = async (): Promise<BlogPost[]> => {
	const paths = import.meta.glob('../content/*/index.md', { eager: true });

	return Object.entries(paths)
		.map(([path, post]: [string, any]) => {
			const slug = path.split('/')[2]; // Get slug from path
			return {
				slug,
				...post.metadata
			} as BlogPost;
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get single post
export const getPost = async (slug: string): Promise<BlogPost | undefined> => {
	try {
		const post = await import(`../content/${slug}/index.md`);
		return {
			slug,
			...post.metadata,
			content: post.default
		};
	} catch (e) {
		console.error(`Failed to load post: ${slug}`, e);
		return undefined;
	}
};