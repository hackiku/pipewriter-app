// src/lib/pages/free/data/content.ts

export interface SectionContent {
	hero: {
		eyebrow: string;
		headline: string;
	};
	products?: {
		headline: string;
		features: Array<{
			multiplier: number;
			tool: any; // We'll type this properly once we have the tools import
			description: string;
		}>;
	};
	features: {
		headline: string;
		blurbs: Array<{
			emoji: string;
			title: string;
			description: string;
		}>;
	};
	zigzags?: {
		left: {
			heading: string;
			subheading: string;
			description: string;
		};
		right: {
			heading: string;
			subheading: string;
			description: string;
		};
	};
	testimonials: {
		headline: string;
		cards: Array<{
			firstName: string;
			lastName: string;
			role: string;
			quote: string;
			imgSrc: string;
		}>;
	};
	cta: {
		headline: string;
		subheading: string;
		buttonText: string;
		note?: string;
	};
}

export const initialContent: SectionContent = {
	hero: {
		eyebrow: "Type to prototype",
		headline: "Wireframes for Writers in Google Docs++"
	},
	features: {
		headline: "Write 10× Copy Decks",
		blurbs: [
			{
				emoji: "⚡️",
				title: "Click-drop workflow",
				description: "Native Docs app"
			},
			{
				emoji: "🎨",
				title: "SaaS B2B looks",
				description: "Ultra polished templates"
			},
			{
				emoji: "🔄",
				title: "Writer's IDE",
				description: "Write Words + UX"
			}
		]
	},
	testimonials: {
		headline: "Writers Dig That",
		cards: [
			{
				firstName: "Eoin",
				lastName: "Cronolly",
				role: "SaaS Copywriter",
				quote: "I've never seen a tool like this that works natively in Docs. I've been building wireframes by hand using tables, even for five-figure contracts. This changes everything for us UX writers.",
				imgSrc: "/testimonials/eoin.jpg"
			},
			{
				firstName: "Warren",
				lastName: "West",
				role: "Copy Chief @ WarrenWords",
				quote: "Thanks Ivan! this looks super cool and is probably 1000x better than the wireframing I've been doing in Gdocs.",
				imgSrc: "/testimonials/warren.jpg"
			}
		]
	},
	cta: {
		headline: "Beta Launch Special — $59 One-Time (Until Jan 10th)",
		subheading: "The wait is over: the app is finally here. Join the first wave of writer-first wireframers for a one-off fee",
		buttonText: "Docs Bundle 40% OFF",
		note: "Old Template Users Get 50% OFF! Check your email"
	}
};