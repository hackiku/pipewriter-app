// lib/pages/demo/sectionMapping.ts
import type { DemoSection, SectionType } from './types';
import type { ElementObject } from "$lib/iframe/elements";
import { demoContent } from './data';

interface SectionConfig {
	id: string;
	type: SectionType;
	elementId: string;             // ID in the dropper
	editableId: string;           // First editable field ID
	initialProps: Record<string, any>;
}

// Central mapping of all section configurations
export const sectionConfigs: SectionConfig[] = [
	{
		id: 'hero',
		type: 'hero',
		elementId: 'hero',
		editableId: 'hero-headline',
		initialProps: {
			eyebrow: demoContent.hero.eyebrow,
			headline: demoContent.hero.headline
		}
	},
	{
		id: 'demo-video',
		type: 'video',
		elementId: 'video',
		editableId: 'video-title',
		initialProps: {
			title: "Quick demo video - 2 min",
			placeholder: true
		}
	},
	{
		id: 'product-features',
		type: 'product-blurbs',
		elementId: 'product-grid',
		editableId: 'product-headline',
		initialProps: {
			headline: demoContent.products.headline,
			features: demoContent.products.features
		}
	},
	{
		id: 'features-blurbs',
		type: 'blurbs',
		elementId: 'blurbs-3',
		editableId: 'blurb-0-title',
		initialProps: {
			headline: demoContent.features.headline,
			blurbs: demoContent.features.blurbs
		}
	},
	{
		id: 'zigzag-left',
		type: 'zigzag',
		elementId: 'zz-left',
		editableId: 'zigzag-left-heading',
		initialProps: {
			direction: 'left',
			...demoContent.zigzags.left
		}
	},
	{
		id: 'zigzag-right',
		type: 'zigzag',
		elementId: 'zz-right',
		editableId: 'zigzag-right-heading',
		initialProps: {
			direction: 'right',
			...demoContent.zigzags.right
		}
	},
	{
		id: 'testimonials',
		type: 'testimonials',
		elementId: 'testimonials',
		editableId: 'testimonial-0-quote',
		initialProps: {
			headline: demoContent.testimonials.headline,
			cards: demoContent.testimonials.cards
		}
	},
	{
		id: 'cta',
		type: 'cta',
		elementId: 'button-center',
		editableId: 'cta-headline',
		initialProps: {
			...demoContent.cta
		}
	}
];

// Helper functions to work with the mapping
export const sectionMapping = {
	// Get section config from element ID
	getConfigFromElement: (elementId: string) =>
		sectionConfigs.find(config => config.elementId === elementId),

	// Get section config from section ID  
	getConfigFromSection: (sectionId: string) =>
		sectionConfigs.find(config => config.id === sectionId),

	// Get editable ID for a section
	getEditableId: (sectionId: string) =>
		sectionConfigs.find(config => config.id === sectionId)?.editableId,

	// Get element ID for a section
	getElementId: (sectionId: string) =>
		sectionConfigs.find(config => config.id === sectionId)?.elementId,

	// Check if element corresponds to section
	isElementForSection: (elementId: string, sectionId: string) => {
		const config = sectionConfigs.find(config => config.id === sectionId);
		return config?.elementId === elementId;
	}
};

// Initialize sections from configs
export const getInitialSections = (): DemoSection[] =>
	sectionConfigs.map((config, index) => ({
		id: config.id,
		type: config.type,
		visible: index < 3, // First 3 sections visible by default
		order: index,
		props: config.initialProps
	}));