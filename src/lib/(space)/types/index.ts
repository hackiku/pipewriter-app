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

// ======== PORTFOLIO ========

interface ContentBase {
	id: string;
	title: string;
	description: string;
	link: string;
	image: string;
	status: 'Coming Soon' | 'Alpha' | 'Beta' | 'Live' | 'In Development';
	tech: (keyof typeof tools)[]; // This ensures we only use tools from our list
}

interface Feature {
	title: string;
	description: string;
	icon?: LucideIcon;
	demo?: string; // Optional link to feature demo
}

// Specific interfaces
export interface Product extends ContentBase {
	icon: LucideIcon;
	longDescription: string;
	features: Feature[];
	meta?: {
		launch?: string;
		github?: string;
		demo?: string;
		stats?: {
			label: string;
			value: string;
		}[];
	};
}

export interface Project extends ContentBase {
	category: 'simulation' | 'design' | 'visualization';
	demo?: {
		url: string;
		instructions?: string;
	};
}
