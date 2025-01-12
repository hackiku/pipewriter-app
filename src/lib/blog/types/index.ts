// lib/pages/blog/types.ts
export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	author: {
		name: string;
		avatar?: string;
	};
	category: string;
	readingTime: string;
	excerpt: string;
	heroImage: string;
	content: {
		intro: string;
		videoEmbed?: string;
		chapters: Array<{
			title: string;
			content: string;
		}>;
		emailSection: {
			title: string;
			subtitle?: string;
		};
		conclusion: string;
	};
}

// lib/pages/blog/posts/wireframe-to-web.ts
export const post: BlogPost = {
	slug: 'wireframe-to-web',
	title: 'From Wireframes to Websites: The AI Bridge for Writers',
	date: 'December 14, 2024',
	author: {
		name: 'Ivan Karaman',
	},
	category: 'Product Updates',
	readingTime: '4 min read',
	excerpt: 'Converting Google Docs wireframes into production-ready websites with a single AI prompt. A new way for writers to lead product development.',
	heroImage: '/images/blog/wireframe-to-web.webp',
	content: {
		intro: `Just finished building something that changes how writers create websites: instant conversion from Google Docs wireframes to production-ready code. No more hand-coding or back-and-forth with developers. Just write, structure, and convert.`,

		videoEmbed: `<div style="position: relative; padding-bottom: 64.5933014354067%; height: 0;"><iframe src="https://www.loom.com/embed/78c316404a1849fc832c8bd6505fa660?sid=2b58091a-4df0-4e9d-aade-5a51a91aa7ea" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`,

		chapters: [
			{
				title: 'The Power of Headings',
				content: `Our wireframes use headings for styling and consistency. These structural elements aren't just for organization - they're the blueprint for your final website. With our conversion script, each heading becomes a perfectly styled component in your live site.`
			},
			{
				title: 'Smart AI Conversion',
				content: `The magic happens through a specialized prompt that understands document structure and design intent. Add comments to guide the styling, paste your content, and watch as it transforms into clean, production-ready HTML with Tailwind CSS classes.`
			}
		],

		emailSection: {
			title: 'Want to see it in action?',
			subtitle: 'Join the beta and start building websites the writer\'s way.'
		},

		conclusion: `This is just the beginning of our journey to revolutionize how writers build for the web. For early adopters, we're offering special beta pricing - and if you were one of our template users, check your email for a 50% discount code. The future of content-first design starts with writers like you.`
	}
};