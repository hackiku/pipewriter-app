// src/lib/pages/pricing/data/store.ts
export interface TemplateBundle {
	id: string;
	name: string;
	description: string;
	price: number;
	originalPrice?: number;
	elements: string;
	image: string;
	cover: string; // Image for card cover
	popular: boolean;
	tags: string[];
	features: string[];
}

export const templateBundles: TemplateBundle[] = [
	{
		id: 'saas-starter',
		name: 'SaaS Landing Pages',
		description: '15 complete SaaS wireframes with conversion-focused layouts',
		price: 29,
		elements: '45+ elements',
		image: '📱',
		cover: '/templates/covers/saas-cover.webp',
		popular: false,
		tags: ['SaaS', 'B2B', 'Conversion'],
		features: [
			'Hero sections with social proof',
			'Feature comparison tables',
			'Pricing tiers with CTAs',
			'Testimonial layouts',
			'FAQ sections'
		]
	},
	{
		id: 'ecommerce-bundle',
		name: 'eCommerce Bundle',
		description: '20 product & checkout flows for online stores',
		price: 39,
		originalPrice: 59,
		elements: '60+ elements',
		image: '🛒',
		cover: '/templates/covers/ecommerce-cover.webp',
		popular: true,
		tags: ['eCommerce', 'Product', 'Checkout'],
		features: [
			'Product showcase layouts',
			'Shopping cart flows',
			'Checkout optimization',
			'Category pages',
			'Review & rating sections'
		]
	},
	{
		id: 'agency-pack',
		name: 'Agency Starter Pack',
		description: '25 client-ready templates for service businesses',
		price: 79,
		elements: '100+ elements',
		image: '🎯',
		cover: '/templates/covers/agency-cover.webp',
		popular: false,
		tags: ['Agency', 'Services', 'Portfolio'],
		features: [
			'Service page layouts',
			'Portfolio showcases',
			'Team member sections',
			'Contact forms',
			'Case study templates'
		]
	},
	{
		id: 'complete-collection',
		name: 'Complete Collection',
		description: 'Every template + future releases',
		price: 149,
		originalPrice: 199,
		elements: '200+ elements',
		image: '🚀',
		cover: '/templates/covers/complete-cover.webp',
		popular: false,
		tags: ['Complete', 'Lifetime', 'All Access'],
		features: [
			'All current templates',
			'Lifetime access to new releases',
			'Priority support',
			'Commercial license',
			'Reseller rights'
		]
	}
];

export const storeFeatures = [
	'✓ Lifetime access',
	'✓ Commercial license included',
	'✓ Light & dark mode versions',
	'✓ Copy-paste ready elements',
	'✓ Professional formatting'
];