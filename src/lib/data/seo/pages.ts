// $lib/data/seo/pages.ts
import type { SEOData } from './types';
import { defaultSEO } from './defaults';

export const pageSEO: Record<string, SEOData | ((data: any) => SEOData)> = {
	'/': defaultSEO,

	'/about': {
		title: "About Pipewriter — Writey tools for writers",
		description: "Meet the team building Pipewriter, the UX app for techy writers. Made by writers, for writers.",
		type: "website",
		image: "/og-about.png"
	},

	'/blog': {
		title: "Pipewriter Blog — UX Writing & Product Design",
		description: "Articles about UX writing, copywriting, product design, and the odd space rant.",
		type: "website",
		image: "/og-blog.png"
	},
	'/space': {
		title: "Chute Repack — Aerospace Website Redesign & Dev",
		description: "Orbitally-converting landing pages for space & aerospace industry. SaaS grade UX writing and design, on-brand, delivered in your code stack.",
		type: "website",
		image: "/og-space.png",
		structuredData: {
			"@context": "https://schema.org",
			"@type": "Service",
			"name": "Chute Repack",
			"description": "Reentry-speed landing page redesign service for aerospace & space technology companies.",
			"provider": {
				"@type": "Organization",
				"name": "Pipewriter",
				"url": "https://pipewriter.io"
			},
			// "offers": {
			// 	"@type": "Offer",
			// 	"price": "2000",
			// 	"priceCurrency": "USD",
			// 	"priceValidUntil": "2024-12-31",
			// 	"availability": "https://schema.org/InStock"
			// },
			"serviceType": "Web Design",
			"category": "Aerospace Web Development",
		}
	},
	'/space/firefly': {
		title: "Firefly Aerospace — Responsive Space Reimagined",
		description: "A conceptual redesign of Firefly Aerospace's digital presence, showcasing their lunar missions, launch vehicles, and space capabilities through an immersive user experience.",
		type: "website",
		image: "/og-firefly.png",
		structuredData: {
			"@context": "https://schema.org",
			"@type": "CreativeWork",
			"name": "Firefly Aerospace Website Concept",
			"description": "An experimental redesign concept for Firefly Aerospace's web presence",
			"creator": {
				"@type": "Organization",
				"name": "Pipewriter",
				"url": "https://pipewriter.io"
			},
			"about": {
				"@type": "Organization",
				"name": "Firefly Aerospace",
				"url": "https://fireflyspace.com",
				"description": "Commercial space company specializing in small to medium-sized launch vehicles and lunar missions"
			},
			"genre": "Web Design",
			"keywords": [
				"aerospace web design",
				"space industry",
				"launch vehicles",
				"lunar missions",
				"Blue Ghost",
				"responsive space",
				"website concept"
			],
			"isBasedOn": {
				"@type": "WebSite",
				"name": "Firefly Aerospace Official Website",
				"url": "https://fireflyspace.com"
			},
			"workExample": {
				"@type": "WebSite",
				"name": "Firefly Aerospace Redesign Concept",
				"description": "Interactive prototype showcasing modern space industry web design principles"
			}
		}
	},



	'/space/repacks': {
		title: "Launch Site — Chute Repack Showcase",
		description: "Launch-ready website designs for space startups. Browse our collection of aerospace landing pages and website redesigns.",
		type: "website",
		image: "/og-repacks.png",
		structuredData: {
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			"name": "Aerospace Website Showcase",
			"description": "Portfolio of custom website designs for space and aerospace companies",
			"provider": {
				"@type": "Organization",
				"name": "Pipewriter",
				"url": "https://pipewriter.io"
			},
			"about": {
				"@type": "Thing",
				"name": "Aerospace Web Development"
			}
		}
	},

	'/space/repacks/firefly': {
		title: "Firefly Aerospace — Website Redesign Case Study",
		description: "Explore how we transformed Firefly Aerospace's digital presence with a launch-ready website redesign, optimized for conversions and brand storytelling.",
		type: "website",
		image: "/og-firefly-repack.png",
		structuredData: {
			"@context": "https://schema.org",
			"@type": "CaseStudy",
			"headline": "Firefly Aerospace Website Redesign",
			"description": "A detailed look at the website redesign process for Firefly Aerospace",
			"publisher": {
				"@type": "Organization",
				"name": "Pipewriter",
				"url": "https://pipewriter.io"
			},
			"about": {
				"@type": "Organization",
				"name": "Firefly Aerospace",
				"url": "https://fireflyspace.com"
			},
			"industry": "Aerospace",
			"serviceUsed": "Chute Repack"
		}
	},
	'blog/[slug]': (post: any): SEOData => ({
		title: `${post.title} — Pipewriter Blog`,
		description: post.excerpt || post.description,
		type: "article",
		image: post.ogImage || `/blog/${post.slug}/og.png`,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt,
		author: post.author,
		section: "Blog",
		structuredData: {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"headline": post.title,
			"datePublished": post.publishedAt,
		}
	})
};