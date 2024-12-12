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
	}
} as const;