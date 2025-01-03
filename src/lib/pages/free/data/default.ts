// src/lib/pages/free/data/default.ts

import type { SectionContent } from '../types';

export const defaultContent: SectionContent = {
	hero: {
		eyebrow: "Type to prototype",
		headline: "UX App for Writers"
		// description: "Wireframes in Google Docs and on the web."
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
				quote: "I've never seen a tool like this that works natively in Docs...",
				imgSrc: "/testimonials/eoin-cronnolly.jpg"
			},
			{
				firstName: "Warren",
				lastName: "West",
				role: "Senior Copywriter @ AppSumo",
				quote: "Thanks Ivan! this looks super cool and is probably 1000x better than the wireframing I've been doing in Gdocs.",
				imgSrc: "/testimonials/warren-west.jpg"
			}
			// Add other testimonials...
		]
	},
  cta: {
    headline: "Ready to start?",
    subheading: "Join the first wave of writer-first wireframers",
    buttonText: "Get Started",
    note: "Early access pricing available"
  },
};