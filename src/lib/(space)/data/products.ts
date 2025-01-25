// src/lib/(space)/data/products.ts
import { Plane, Stars, Code, Rocket, Globe2 } from 'lucide-svelte';
import type { Product } from '../types';

export const products: Product[] = [
	{
		id: 'spacefomo',
		title: "SpaceFOMO",
		description: "Space-race fever weekly, 100 words a pop",
		longDescription: `Stay ahead of the space industry curve with SpaceFOMO. Our AI analyzes thousands of 
    space industry news sources, research papers, and social media to surface trending topics before they go mainstream.`,
		icon: Stars,
		status: "Coming Soon",
		link: "https://spacefomo.vercel.app",
		image: "space/products/spacefomo.png",
		tech: ["svelte", "supabase", "langchain"],
		features: [
			{
				title: "FOMO Score",
				description: "Real-time trending topics analysis",
				icon: Stars
			},
			{
				title: "Daily Briefings",
				description: "AI-curated space industry updates"
			}
		],
		meta: {
			launch: "Q2 2024",
			stats: [
				{ label: "Articles Processed", value: "10,000+" },
				{ label: "Space Companies Tracked", value: "150+" }
			]
		}
	},
	{
		id: 'jzro',
		title: "JZRO",
		description: "Mars METAR & orbital mechanics simulator",
		longDescription: `The first interplanetary airport gets its own weather app. Live METAR reports from Jezero Crater, 
    orbital mechanics playground, and a tribute to Ingenuity - the little helicopter that could.`,
		icon: Rocket,
		status: "Alpha",
		link: "https://jzro.space",
		image: "space/products/jzro.png",
		tech: ["svelte", "threlte", "webgl"],
		features: [
			{
				title: "Live Mars Weather",
				description: "Real-time METAR reports from Jezero Crater",
				demo: "https://jzro.space/metar"
			},
			{
				title: "Orbital Simulator",
				description: "Interactive 3D orbital mechanics visualization"
			}
		],
		meta: {
			stats: [
				{
					label: "Latest METAR",
					value: "JZRO 242151Z 26007KT CLEAR -13/-76 Q0073"
				},
				{
					label: "Sol",
					value: "11007"
				}
			]
		}
	},
	{
		id: '6pack',
		title: "6Pack",
		description: "Open-source portable flight instrument suite for pilots and their cats",
		longDescription: `6Pack is an open-source electronic flight instrument system (EFIS) that turns your phone 
    into a backup aviation instrument panel. Perfect for student pilots or as a backup solution.`,
		icon: Plane,
		status: "Beta",
		link: "https://6pack.cc",
		image: "space/products/6pack.png",
		tech: ["reactNative", "firebase"],
		features: [
			{
				title: "Full EFIS Suite",
				description: "All six primary flight instruments"
			},
			{
				title: "Cross Platform",
				description: "Works on iOS and Android"
			}
		],
		meta: {
			github: "https://github.com/jzro/6pack",
			stats: [
				{ label: "Test Flights", value: "50+" },
				{ label: "Cat Copilots", value: "3" }
			]
		}
	}
];