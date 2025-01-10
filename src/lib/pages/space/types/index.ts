// src/lib/pages/space/types/index.ts
// import type { LucideIcon } from 'lucide-svelte'

export interface Testimonial {
	quote: string;
	author: string;
	role: string;
	company: string;
	imgSrc?: string;
}


export interface Testimonial {
	quote: string;
	author: string;
	role: string;
	company: string;
	imgSrc?: string;
}

export interface Product {
	title: string;
	description: string;
	// icon?: LucideIcon;
	status: "Early Alpha" | "Coming Soon" | "In Development" | "Beta" | "Live";
	link: string;
	image: string;
}