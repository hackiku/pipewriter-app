// lib/pages/demo/types.ts
import type { tools } from '$lib/data/assets/tools';

export type SectionType = 'video' | 'hero' | 'product-blurbs' | 'zigzag' | 'blurbs' | 'testimonials' | 'cta';

export interface DemoSection {
	id: string;
	type: SectionType;
	visible: boolean;
	order: number;
	props?: Record<string, any>;
}

export interface ProductFeature {
	multiplier: number;
	tool: typeof tools[keyof typeof tools];
	description: string;
}

export interface Blurb {
	emoji: string;
	title: string;
	description: string;
}

export interface Testimonial {
	firstName: string;
	lastName: string;
	role: string;
	quote: string;
	imgSrc: string;
}

export interface DemoContent {
	hero: {
		eyebrow: string;
		headline: string;
	};
	products: {
		headline: string;
		features: ProductFeature[];
	};
	features: {
		headline: string;
		blurbs: Blurb[];
	};
	zigzags: {
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
		cards: Testimonial[];
	};
	cta: {
		headline: string;
		subheading: string;
		buttonText: string;
		note: string;
	};
}