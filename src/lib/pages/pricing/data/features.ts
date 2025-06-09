// src/lib/pages/pricing/data/features.ts
export interface Feature {
	name: string;
	description: string;
	free: boolean;
	pro: boolean;
	bundle: boolean;
}

export const featureCategories = [
	{
		name: 'Core Elements',
		features: [
			{
				name: 'Basic wireframe elements',
				description: 'Essential layout components and text blocks',
				free: true,
				pro: true,
				bundle: true
			},
			{
				name: 'Premium element library',
				description: '84+ advanced components, forms, and layouts',
				free: false,
				pro: true,
				bundle: true
			},
			{
				name: 'One-click insertion',
				description: 'Click or Enter/Space to insert at cursor',
				free: true,
				pro: true,
				bundle: true
			}
		]
	},
	{
		name: 'Design & Theming',
		features: [
			{
				name: 'Light/dark mode',
				description: 'Professional document themes',
				free: true,
				pro: true,
				bundle: true
			},
			{
				name: 'Premium color schemes',
				description: 'Advanced color palettes and branding',
				free: false,
				pro: true,
				bundle: true
			},
			{
				name: 'Document backgrounds',
				description: 'Custom backgrounds and table styling',
				free: false,
				pro: true,
				bundle: true
			},
			{
				name: 'Typography controls',
				description: 'Professional text styles and spacing',
				free: true,
				pro: true,
				bundle: true
			}
		]
	},
	{
		name: 'AI & Automation',
		features: [
			{
				name: 'Basic prompts',
				description: 'Simple content generation helpers',
				free: false,
				pro: true,
				bundle: true
			},
			{
				name: 'Advanced AI prompts',
				description: 'Custom prompts for your workflow',
				free: false,
				pro: true,
				bundle: true
			},
			{
				name: 'Content generation',
				description: 'AI-powered wireframe content',
				free: false,
				pro: true,
				bundle: true
			}
		]
	},
	{
		name: 'Export & Integration',
		features: [
			{
				name: 'Google Docs integration',
				description: 'Native sidebar app experience',
				free: true,
				pro: true,
				bundle: true
			},
			{
				name: 'Basic export',
				description: 'Copy wireframes to other documents',
				free: false,
				pro: true,
				bundle: true
			},
			{
				name: 'Advanced export',
				description: 'HTML, React component generation',
				free: false,
				pro: true,
				bundle: true
			}
		]
	},
	{
		name: 'Templates & Support',
		features: [
			{
				name: 'Basic templates',
				description: 'Starter wireframe templates',
				free: true,
				pro: true,
				bundle: true
			},
			{
				name: 'Premium template library',
				description: '100+ industry-specific templates',
				free: false,
				pro: false,
				bundle: true
			},
			{
				name: 'Community support',
				description: 'Email and community forums',
				free: true,
				pro: true,
				bundle: true
			},
			{
				name: 'Priority support',
				description: 'Direct access and faster response',
				free: false,
				pro: true,
				bundle: true
			},
			{
				name: 'VIP onboarding',
				description: 'Personal setup call with founder',
				free: false,
				pro: false,
				bundle: true
			}
		]
	}
];

export const features: Feature[] = featureCategories.flatMap(category => category.features);