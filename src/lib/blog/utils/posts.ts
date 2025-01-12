// src/lib/blog/utils/posts.ts
import type { BlogPost } from '../types';

export const loadPosts = async (): Promise<BlogPost[]> => {
	const paths = import.meta.glob('../content/*/index.md', { eager: true });

	return Object.entries(paths)
		.map(([path, post]: [string, any]) => {
			const slug = path.split('/')[2];
			// Make sure we get all metadata
			const { metadata, default: content } = post;
			return {
				slug,
				content, // Include content for preview if needed
				...metadata
			} as BlogPost;
		})
		// .filter(post => post.slug === 'google-docs-to-code')
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPost = async (slug: string): Promise<BlogPost | undefined> => {
	try {
		const { metadata, default: content } = await import(`../content/${slug}/index.md`);
		return {
			slug,
			content,
			...metadata
		} as BlogPost;
	} catch (e) {
		console.error(`Failed to load post: ${slug}`, e);
		return undefined;
	}
};
