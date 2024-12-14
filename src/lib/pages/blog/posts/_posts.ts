// lib/pages/blog/posts/_posts.ts
export const posts = [
	{
		slug: 'writers-lead-product-development',
		title: 'Why Writers Should Lead Product Development',
		excerpt: "Great products start with words, not wireframes. Here's how technical writers can drive the product development process from day one.",
		date: 'Dec 12, 2024',
		readingTime: '5 min read',
		category: 'Product Design',
		heroImage: '/images/blog/writers-lead.webp'
	},
	{
		slug: 'google-docs-wireframes',
		title: 'From Google Docs to Wireframes: A Writer\'s Journey',
    excerpt: 'How I transformed my copywriting process by treating Google Docs as a design tool, and why it made my clients happier.',
		date: 'Dec 10, 2024',
		readingTime: '4 min read',
		category: 'Case Study',
		heroImage: '/images/blog/google-docs.webp'
	}
];

export const getPostBySlug = (slug: string) => {
	return posts.find(post => post.slug === slug);
};