// lib/pages/demo/config.ts
import type { DemoSection } from './types';
import { demoContent } from './data';
import { get } from 'svelte/store';
import { demoStore } from '$lib/stores/demoStore';

// Get initial visibility from store
const getDefaultVisibility = (sectionId: string): boolean => {
	return ['hero', 'demo-video', 'product-features', 'cta'].includes(sectionId);
};

export const initialSections: DemoSection[] = [
	{
		id: 'hero',
		type: 'hero',
		visible: getDefaultVisibility('hero'),
		order: 0,
		props: {
			eyebrow: demoContent.hero.eyebrow,
			headline: demoContent.hero.headline
		}
	},
	{
		id: 'demo-video',
		type: 'video',
		visible: getDefaultVisibility('demo-video'),
		order: 1,
		props: {
			title: "Quick demo video - 2 min",
			placeholder: true
		}
	},
	{
		id: 'product-features',
		type: 'product-blurbs',
		visible: getDefaultVisibility('product-features'),
		order: 2,
		props: {
			headline: demoContent.products.headline,
			features: demoContent.products.features
		}
	},
	{
		id: 'cta',
		type: 'cta',
		visible: getDefaultVisibility('cta'),
		order: 3,
		props: {
			...demoContent.cta
		}
	},
	{
		id: 'zigzag-left',
		type: 'zigzag',
		visible: getDefaultVisibility('zigzag-left'),
		order: 4,
		props: {
			direction: 'left',
			...demoContent.zigzags.left
		}
	},
	{
		id: 'features-blurbs',
		type: 'blurbs',
		visible: getDefaultVisibility('features-blurbs'),
		order: 5,
		props: {
			headline: demoContent.features.headline,
			blurbs: demoContent.features.blurbs
		}
	},
	{
		id: 'zigzag-right',
		type: 'zigzag',
		visible: getDefaultVisibility('zigzag-right'),
		order: 6,
		props: {
			direction: 'right',
			...demoContent.zigzags.right
		}
	},
	{
		id: 'testimonials',
		type: 'testimonials',
		visible: getDefaultVisibility('testimonials'),
		order: 7,
		props: {
			headline: demoContent.testimonials.headline,
			cards: demoContent.testimonials.cards
		}
	}
];

// Map dropper elements to section configs
export const dropperToSection: Record<string, Partial<DemoSection>> = {
	'blurbs-3': { type: 'blurbs', id: 'features-blurbs' },
	'zz-left': { type: 'zigzag', id: 'zigzag-left' },
	'zz-right': { type: 'zigzag', id: 'zigzag-right' },
	'cards-3': { type: 'testimonials', id: 'testimonials' },
	'button-2-center': { type: 'cta', id: 'cta' }
};