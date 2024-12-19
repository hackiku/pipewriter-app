// lib/pages/demo/data.ts

import { tools } from '$lib/data/assets/tools';

export const demoContent = {
	hero: {
		eyebrow: "Type to prototype",
		headline: "Wireframes for Writers in Google Docs++",
	},
	products: {
		headline: "Everything You Get",
		features: [
			{
				multiplier: 80,
				tool: tools.googleDocs,
				description: "Copy-paste ready layouts"
			},
			{
				multiplier: 8,
				tool: tools.googleAppsScript,
				description: "Open source Apps Scripts"
			},
			{
				multiplier: 1,
				tool: tools.googleDrive,
				description: "Lifetime access for early birdies"
			}
		]
	},
	features: {
		headline: "Write 10× Copy Decks",
		blurbs: [
			{
				emoji: "⚡️",
				title: "Click or Type to Insert",
				description: "Drop in UI elements with a click or keyboard shortcut. No more hunting through menus or building tables by hand."
			},
			{
				emoji: "🎨",
				title: "Dark Mode Built-in",
				description: "Switch between light and dark themes instantly. Your copy and wireframes auto-update to match."
			},
			{
				emoji: "🔄",
				title: "Export Anywhere",
				description: "Turn docs into HTML, React, or Figma files with one click. No more copy-paste hell between tools."
			}
		]
	},
	zigzags: {
		left: {
			heading: "DOCS APP",
			subheading: "Writey app in Google Docs",
			description: "Native Docs sidebar app makes wireframing as fast as typing a paragraph."
		},
		right: {
			heading: "Pro Templates",
			subheading: "80+ Ready Components",
			description: "Tables are dead. Long live proper wireframe components that update everywhere. Pre-formatted for that sweet agency look."
		}
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
			},
			{
				firstName: "Giorgi",
				lastName: "C.",
				role: "Freelance Copywriter",
				quote: "Clients immediately get the vision when they see the wireframe structure. Revisions become much easier or they don't even ask. Plus, for me it's easier bcs I don't have to write long copies just to impress them.",
				imgSrc: "/testimonials/giorgi.jpg"
			}
		]
	},
	cta: {
		headline: "Beta Launch Special — $59 One-Time (Until Jan 1st)",
		subheading: "The wait is over: the app is finally here. Join the first wave of writer-first wireframers for a one-off fee",
		buttonText: "Docs Bundle 40% OFF",
		note: "Old Template Users Get 50% OFF! Check your email"
	}
};