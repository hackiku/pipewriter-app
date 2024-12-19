// lib/pages/demo/config.ts
import type { DemoSection } from './types';
import { demoContent } from './data';

export const initialSections: DemoSection[] = [
	{
		id: 'demo-video',
		type: 'video',
		visible: true,
		order: 0,
		props: {
			title: "Quick demo video - 2 min",
			placeholder: true
		}
	},
	{
		id: 'product-features',
		type: 'product-blurbs',
		visible: true,
		order: 1,
		props: {
			headline: demoContent.products.headline,
			features: demoContent.products.features
		}
	},
	{
		id: 'zigzag-left',
		type: 'zigzag',
		visible: true,
		order: 2,
		props: {
			direction: 'left',
			...demoContent.zigzags.left
		}
	},
	{
		id: 'features-blurbs',
		type: 'blurbs',
		visible: false,
		order: 3,
		props: {
			headline: demoContent.features.headline,
			blurbs: demoContent.features.blurbs
		}
	},
	{
		id: 'zigzag-right',
		type: 'zigzag',
		visible: false,
		order: 4,
		props: {
			direction: 'right',
			...demoContent.zigzags.right
		}
	},
	{
		id: 'testimonials',
		type: 'testimonials',
		visible: false,
		order: 5,
		props: {
			headline: demoContent.testimonials.headline,
			cards: demoContent.testimonials.cards
		}
	},
	{
		id: 'cta',
		type: 'cta',
		visible: false,
		order: 6,
		props: {
			...demoContent.cta
		}
	}
];


// Map dropper elements to section configs
export const dropperToSection: Record<string, Partial<DemoSection>> = {
	'blurbs-3': { type: 'blurbs', id: 'features-blurbs' },
	'zz-left': { type: 'zigzag', id: 'zigzag-left' },
	'zz-right': { type: 'zigzag', id: 'zigzag-right' },
	'testimonials': { type: 'testimonials', id: 'testimonials' },
	'button-center': { type: 'cta', id: 'cta' }
};