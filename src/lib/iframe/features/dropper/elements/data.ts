// features/dropper/elements/data.ts

export const elements = {
	// Content
	'hero': {
		category: 'content',
		description: 'Hero layout with heading and subtext',
		hasDarkVariant: true
	},
	'zz-left': {
		category: 'content',
		description: 'Text layout with left zigzag pattern',
		hasDarkVariant: true
	},
	'zz-right': {
		category: 'content',
		description: 'Text layout with right zigzag pattern',
		hasDarkVariant: true
	},

	// Containers
	'container-center': {
		category: 'containers',
		description: 'Centered container for content',
		hasDarkVariant: true
	},
	'background-empty': {
		category: 'containers',
		description: 'Full width empty container',
		hasDarkVariant: true
	},

	// Lists
	'list-1': {
		category: 'lists',
		description: 'Single column list',
		hasDarkVariant: true
	},
	'list-2': {
		category: 'lists',
		description: 'Two column list',
		hasDarkVariant: true
	},
	'list-3': {
		category: 'lists',
		description: '2x2 grid list layout',
		hasDarkVariant: true
	},

	// Buttons 
	'button-left': {
		category: 'buttons',
		description: 'Left-aligned button',
		hasDarkVariant: true
	},
	'button-center': {
		category: 'buttons',
		description: 'Center-aligned button',
		hasDarkVariant: true
	},
	'button-right': {
		category: 'buttons',
		description: 'Right-aligned button',
		hasDarkVariant: true
	},
	'button-2-left': {
		category: 'buttons',
		description: 'Two buttons, left-aligned',
		hasDarkVariant: true
	},
	'button-2-center': {
		category: 'buttons',
		description: 'Two buttons, center-aligned',
		hasDarkVariant: true
	},
	'button-2-right': {
		category: 'buttons',
		description: 'Two buttons, right-aligned',
		hasDarkVariant: true
	},

	// Cards
	'cards-2-left': {
		category: 'cards',
		description: 'Two cards, left-aligned',
		hasDarkVariant: true
	},
	'cards-2-center': {
		category: 'cards',
		description: 'Two cards, center-aligned',
		hasDarkVariant: true
	},
	'cards-3': {
		category: 'cards',
		description: 'Three cards layout',
		hasDarkVariant: true
	},
	'cards-2x2': {
		category: 'cards',
		description: '2x2 grid of cards',
		hasDarkVariant: true
	},
	'pricing-cards': {
		category: 'cards',
		description: 'Pricing comparison cards',
		hasDarkVariant: true
	},
	'cards-6': {
		category: 'cards',
		description: 'Six cards grid layout',
		hasDarkVariant: true
	},

	// Special elements
	'styleguide': {
		category: 'special',
		description: 'Text style guidelines',
		hasDarkVariant: false
	}
} as const;