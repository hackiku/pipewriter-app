// $lib/iframe/features/dropper/rawElements.ts

export interface ElementInfo {
	id: string;
	category: string;
	hasContainer?: boolean; // For elements that have a container variant
	description: string;
}

// Light theme elements
export const lightElements: ElementInfo[] = [
	// Layout elements
	{
		id: 'empty-center',
		category: 'layout',
		description: 'Centered container with max-width'
	},
	{
		id: 'empty-fullwidth',
		category: 'layout',
		description: 'Full-width container'
	},
	{
		id: 'gray-fullwidth',
		category: 'layout',
		description: 'Gray background full-width section'
	},

	// Hero & Content
	{
		id: 'hero',
		category: 'hero',
		description: 'Hero section with heading and subtext'
	},
	{
		id: 'zz-left',
		category: 'content',
		hasContainer: true,
		description: 'Zigzag section with image on left'
	},
	{
		id: 'zz-right',
		category: 'content',
		hasContainer: true,
		description: 'Zigzag section with image on right'
	},
	{
		id: 'placeholder',
		category: 'content',
		description: 'Generic placeholder section'
	},

	// Blurbs
	{
		id: 'blurbs-3',
		category: 'blurbs',
		hasContainer: true,
		description: '3-column feature blocks'
	},
	{
		id: 'blurbs-4',
		category: 'blurbs',
		hasContainer: true,
		description: '4-column feature blocks'
	},
	{
		id: 'blurbs-vert-3',
		category: 'blurbs',
		hasContainer: true,
		description: '3 vertical feature blocks'
	},

	// Lists
	{
		id: 'list-1',
		category: 'lists',
		hasContainer: true,
		description: 'Single column list'
	},
	{
		id: 'list-2',
		category: 'lists',
		hasContainer: true,
		description: 'Two column list'
	},

	// Buttons
	{
		id: 'button-primary-left',
		category: 'buttons',
		description: 'Left-aligned primary button'
	},
	{
		id: 'button-primary-center',
		category: 'buttons',
		description: 'Center-aligned primary button'
	},
	{
		id: 'button-secondary-left',
		category: 'buttons',
		description: 'Left-aligned secondary button'
	},
	{
		id: 'button-secondary-center',
		category: 'buttons',
		description: 'Center-aligned secondary button'
	},
	{
		id: 'button-2-left',
		category: 'buttons',
		description: 'Two buttons left-aligned'
	},
	{
		id: 'button-2-center',
		category: 'buttons',
		description: 'Two buttons center-aligned'
	},

	// Cards
	{
		id: 'cards-2-center',
		category: 'cards',
		hasContainer: true,
		description: '2 centered cards'
	},
	{
		id: 'cards-3',
		category: 'cards',
		hasContainer: true,
		description: '3 cards in a row'
	},
	{
		id: 'cards-2x2',
		category: 'cards',
		hasContainer: true,
		description: '4 cards in 2x2 grid'
	},
	{
		id: 'cards-6',
		category: 'cards',
		hasContainer: true,
		description: '6 cards grid'
	},

	// Style Guide
	{
		id: 'styleguide',
		category: 'utility',
		description: 'Document style guide template'
	}
];

// Dark theme elements
export const darkElements: ElementInfo[] = [
	// Layout elements
	{
		id: 'empty-center-dark',
		category: 'layout',
		hasContainer: true,
		description: 'Dark theme centered container'
	},
	{
		id: 'empty-fullwidth-dark',
		category: 'layout',
		description: 'Dark theme full-width container'
	},

	// Hero & Content
	{
		id: 'hero-dark',
		category: 'hero',
		description: 'Dark theme hero section'
	},
	{
		id: 'zz-left-dark',
		category: 'content',
		hasContainer: true,
		description: 'Dark theme zigzag left'
	},
	{
		id: 'zz-right-dark',
		category: 'content',
		hasContainer: true,
		description: 'Dark theme zigzag right'
	},

	// Blurbs
	{
		id: 'blurbs-3-dark',
		category: 'blurbs',
		hasContainer: true,
		description: 'Dark theme 3-column features'
	},
	{
		id: 'blurbs-4-dark',
		category: 'blurbs',
		hasContainer: true,
		description: 'Dark theme 4-column features'
	},
	{
		id: 'blurbs-vert-3-dark',
		category: 'blurbs',
		hasContainer: true,
		description: 'Dark theme vertical features'
	},

	// Lists
	{
		id: 'list-1-dark',
		category: 'lists',
		hasContainer: true,
		description: 'Dark theme single column list'
	},
	{
		id: 'list-2-dark',
		category: 'lists',
		hasContainer: true,
		description: 'Dark theme two column list'
	},

	// Buttons
	{
		id: 'button-primary-left-dark',
		category: 'buttons',
		description: 'Dark theme primary button left'
	},
	{
		id: 'button-primary-center-dark',
		category: 'buttons',
		description: 'Dark theme primary button center'
	},
	{
		id: 'button-secondary-left-dark',
		category: 'buttons',
		description: 'Dark theme secondary button left'
	},
	{
		id: 'button-secondary-center-dark',
		category: 'buttons',
		description: 'Dark theme secondary button center'
	},
	{
		id: 'button-2-left-dark',
		category: 'buttons',
		description: 'Dark theme two buttons left'
	},
	{
		id: 'button-2-center-dark',
		category: 'buttons',
		description: 'Dark theme two buttons center'
	},

	// Cards
	{
		id: 'cards-2-center-dark',
		category: 'cards',
		hasContainer: true,
		description: 'Dark theme 2 centered cards'
	},
	{
		id: 'cards-3-dark',
		category: 'cards',
		hasContainer: true,
		description: 'Dark theme 3 cards row'
	},
	{
		id: 'cards-2x2-dark',
		category: 'cards',
		hasContainer: true,
		description: 'Dark theme 4 cards grid'
	},
	{
		id: 'cards-6-dark',
		category: 'cards',
		hasContainer: true,
		description: 'Dark theme 6 cards grid'
	},

	// Style Guide
	{
		id: 'styleguide-dark',
		category: 'utility',
		description: 'Dark theme style guide'
	}
];

// Helper functions to get all IDs for each theme
export function getLightElementIds(): string[] {
	return lightElements.map(el => el.id);
}

export function getDarkElementIds(): string[] {
	return darkElements.map(el => el.id);
}

// Helper to get all container variants
export function getContainerVariants(theme: 'light' | 'dark'): string[] {
	const elements = theme === 'light' ? lightElements : darkElements;
	return elements
		.filter(el => el.hasContainer)
		.map(el => `${el.id}-container`);
}

// Categories in order of appearance
export const categories = [
	'layout',
	'hero',
	'content',
	'blurbs',
	'lists',
	'buttons',
	'cards',
	'utility'
] as const;

export type Category = typeof categories[number];