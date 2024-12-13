// $lib/data/assets/tools.ts

export const tools = {
	pipewriter: {
		name: "Pipewriter",
		icon: "/tools/pipewriter.svg",
		fallback: "📝",
		url: "https://pipewriter.io"
	},
	figma: {
		name: "Figma",
		icon: "/tools/figma.svg",
		fallback: "🎨",
		url: "https://figma.com"
	},
	react: {
		name: "React",
		icon: "/tools/react.svg",
		fallback: "⚛️",
		url: "https://reactjs.org"
	},
	mdx: {
		name: "MDX",
		icon: "/tools/mdx.svg",
		fallback: "📘",
		url: "https://mdxjs.com"
	},
	sveltekit: {
		name: "SvelteKit",
		icon: "/tools/sveltekit.svg",
		fallback: "🎭",
		url: "https://kit.svelte.dev"
	},
	python: {
		name: "Python",
		icon: "/tools/python.svg",
		fallback: "🐍",
		url: "https://python.org"
	},
	googleappsscript: {
		name: "Google Apps Script",
		icon: "/tools/gas.svg",
		fallback: "📜",
		url: "https://developers.google.com/apps-script"
	},
	tailwind: {
		name: "Tailwind CSS",
		icon: "/tools/tailwind.svg",
		fallback: "🎨",
		url: "https://tailwindcss.com"
	}
} as const;