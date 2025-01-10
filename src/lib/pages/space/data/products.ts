// src/lib/pages/space/data/products.ts
import type { Product } from '../types';
import { Plane, Stars, Code } from 'lucide-svelte';

export const products: Product[] = [
	{
		title: "6Pack",
		description: "Open-source portable flight instrument suite for pilots and their cats. Arduino + React Native magic.",
		icon: Plane,
		status: "Early Alpha",
		link: "https://6pack.cc",
		image: "pages/space/screenshot/6pack.png"
	},
	{
		title: "SpaceFOMO",
		description: "AI-powered news aggregator for the space industry, with FOMO scoring for trending topics.",
		icon: Stars,
		status: "Coming Soon",
		link: "#",
		image: "pages/space/screenshot/spacefomo.png"
	},
	{
		title: "Wing Designer",
		description: "3D wing design tool for aerospace engineers. Parametric modeling made simple.",
		icon: Code,
		status: "In Development",
		link: "#",
		image: "/api/placeholder/800/400"
	}
];