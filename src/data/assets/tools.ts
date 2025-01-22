// src/lib/data/tools/index.ts
import type { Tool } from './types';

export const tools = {
	// Frameworks
	svelte: {
		name: "Svelte",
		icon: "/tools/svelte.svg",
		fallback: "🎭",
		url: "https://kit.svelte.dev",
		description: "Cybernetically enhanced web apps",
		category: 'framework',
		tags: ['frontend', 'fullstack', 'performance']
	},
	react: {
		name: "React",
		icon: "/tools/react.svg",
		fallback: "⚛️",
		url: "https://react.dev",
		description: "Component-based UI library",
		category: 'library',
		tags: ['frontend', 'ui']
	},
	vue: {
		name: "Vue",
		icon: "/tools/vue.svg",
		fallback: "🟩",
		url: "https://vuejs.org",
		description: "Progressive JavaScript framework",
		category: 'framework',
		tags: ['frontend']
	},
	nextjs: {
		name: "Next.js",
		icon: "/tools/nextjs.svg",
		fallback: "⚡",
		url: "https://nextjs.org",
		description: "React framework for production",
		category: 'framework',
		tags: ['frontend', 'fullstack']
	},
	remix: {
		name: "Remix",
		icon: "/tools/remix.svg",
		fallback: "🎵",
		url: "https://remix.run",
		description: "Full stack web framework",
		category: 'framework',
		tags: ['frontend', 'fullstack']
	},
	astro: {
		name: "Astro",
		icon: "/tools/astro.svg",
		fallback: "🚀",
		url: "https://astro.build",
		description: "Content-focused static sites",
		category: 'framework',
		tags: ['frontend', 'performance', 'content']
	},
	supabase: {
		name: "Supabase",
		icon: "/tools/supabase.svg",
		fallback: "⚡",
		url: "https://supabase.com",
		description: "Open source Firebase alternative",
		category: 'framework',
		tags: ['backend', 'database', 'auth']
	},
	langchain: {
		name: "LangChain",
		icon: "/tools/langchain.svg",
		fallback: "🦜",
		url: "https://langchain.com",
		description: "LLM application framework",
		category: 'framework',
		tags: ['ai', 'llm', 'automation']
	},
	firebase: {
		name: "Firebase",
		icon: "/tools/firebase.svg",
		fallback: "🔥",
		url: "https://firebase.google.com",
		description: "App development platform",
		category: 'framework',
		tags: ['backend', 'database', 'auth']
	},
	reactNative: {
		name: "React Native",
		icon: "/tools/react-native.svg",
		fallback: "📱",
		url: "https://reactnative.dev",
		description: "Native mobile apps with React",
		category: 'framework',
		tags: ['mobile', 'cross-platform']
	},
	streamlit: {
		name: "Streamlit",
		icon: "/tools/streamlit.svg",
		fallback: "🌊",
		url: "https://streamlit.io",
		description: "Data apps in Python",
		category: 'framework',
		tags: ['data', 'python', 'dashboard']
	},
	// Design & CSS
	tailwind: {
		name: "Tailwind CSS",
		icon: "/tools/tailwind.svg",
		fallback: "🎨",
		url: "https://tailwindcss.com",
		description: "Utility-first CSS framework",
		category: 'library',
		tags: ['css', 'design']
	},
	// CMS
	wordpress: {
		name: "WordPress",
		icon: "/tools/wordpress.svg",
		fallback: "🎪",
		url: "https://wordpress.org",
		description: "World's most used CMS",
		category: 'cms',
		tags: ['content']
	},
	shopify: {
		name: "Shopify",
		icon: "/tools/shopify.svg",
		fallback: "🛍️",
		url: "https://shopify.com",
		description: "E-commerce platform",
		category: 'cms',
		tags: ['ecommerce']
	},
	// ... add more tools as needed
} as const;

// Helper functions
export function getToolsByCategory(category: ToolCategory) {
	return Object.entries(tools)
		.filter(([_, tool]) => tool.category === category)
		.reduce((acc, [id, tool]) => ({ ...acc, [id]: tool }), {});
}

export function getToolsByTags(tags: string[]) {
	return Object.entries(tools)
		.filter(([_, tool]) =>
			tags.some(tag => tool.tags?.includes(tag))
		)
		.reduce((acc, [id, tool]) => ({ ...acc, [id]: tool }), {});
}
