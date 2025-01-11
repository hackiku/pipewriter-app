// src/lib/pages/space/types/index.ts
import type { LucideIcon } from 'lucide-svelte';

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
	longDescription: string;
	status: "Early Alpha" | "Coming Soon" | "In Development" | "Beta" | "Live";
	link: string;
	image: string;
	tech: string[];
}

export interface RepackExample {
	id: string;
	company: string;
	description: string;
	beforeUrl: string;
	afterUrl: string | null;  // null when using dynamic component
	component?: string;       // path to Svelte component for dynamic after view
	defaultSize?: number;     // default size percentage for resizable pane
	status: 'in-progress' | 'done';
	meta?: {
		originalUrl: string;
		launchDate?: string;
		techStack: string[];
	};
}