// src/lib/pages/demo/data.ts
export const demoContent = {
	hero: {
		eyebrow: "Prototyping by typing",
		headline: "Wireframes for Writers in Google Docs++",
	},
	features: {
		headline: "10× Your Copy Decks",
		blurbs: [
			{
				emoji: "✍️",
				title: "UX Writers",
				description: "Break into tech without learning Figma. Create proper UX deliverables without touching code."
			},
			{
				emoji: "📝",
				title: "Copywriters",
				description: "Level up from $500 to $5k projects with pro-grade deliverables that look as good as they convert."
			},
			{
				emoji: "📊",
				title: "Content Strategists",
				description: "Lead with content-first design that doesn't look like an afterthought."
			}
		]
	},
	zigzags: {
		left: {
			heading: "The Sidebar App",
			subheading: "Design Superpowers in Docs",
			description: "Put together webpage wireframes in minutes without leaving Google Docs. Our sidebar app makes UX writing as easy as adding a paragraph."
		},
		right: {
			heading: "Template System",
			subheading: "80+ UI Elements Ready",
			description: "From hero sections to pricing cards, get everything you need to prototype landing pages. Pre-formatted templates that make your copy look like a million bucks."
		}
	},
	testimonials: {
		headline: "Trusted by Writers",
		cards: [
			{
				firstName: "Eoin",
				lastName: "Cronolly",
				role: "SaaS Copywriter",
				quote: "I've never seen a tool like this that works natively in Docs. I've been building wireframes by hand using tables, even for five-figure contracts.",
				imgSrc: "/testimonials/eoin.jpg"
			},
			{
				firstName: "Warren",
				lastName: "West",
				role: "Copy Chief",
				company: "WarrenWords",
				quote: "Thanks Ivan! This looks super cool and is probably 1000x better than the wireframing I've been doing in Gdocs.",
				imgSrc: "/testimonials/warren.jpg"
			},
			{
				firstName: "Giorgi",
				lastName: "C.",
				role: "Freelance Copywriter",
				quote: "Clients immediately get the vision when they see the wireframe structure. Revisions become much easier or they don't even ask.",
				imgSrc: "/testimonials/giorgi.jpg"
			}
		]
	}
};