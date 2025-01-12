// src/lib/blog/types/index.ts

export interface Author {
	name: string;
	avatar?: string;
}

export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	author: Author;
	category: string;
	readingTime: string;
	excerpt: string;
	heroImage?: string;
	// Support both markdown and structured content
	content: string | {
		intro: string;
		videoEmbed?: string;
		chapters?: Array<{
			title: string;
			content: string;
		}>;
		emailSection?: {
			title: string;
			subtitle?: string;
		};
		conclusion?: string;
	};
	// Asset handling
	assets?: {
		images: string[];
		videos?: string[];
	};
}

// Additional metadata for the blog list view
export interface BlogPostMeta extends Omit<BlogPost, 'content'> {
	preview: string;
}