// src/lib/pages/space/types/index.ts
import type { LucideIcon } from 'lucide-svelte';


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

export interface UXExamplePoint {
	label: string;
}

export interface UXExampleVariant {
	title: string;
	points: UXExamplePoint[];
}

export interface UXExample {
	position: {
		x: string;
		y: string;
	};
	size: 'sm' | 'md' | 'lg';
	yOffset: number;
	bad: UXExampleVariant;
	good: UXExampleVariant;
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
	longDescription: string;
	status: "Early Alpha" | "Coming Soon" | "In Development" | "Beta" | "Live";
	link: string;
	image: string;
	tech: string[];
}
