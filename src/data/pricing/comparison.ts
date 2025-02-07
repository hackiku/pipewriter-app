// src/data/pricing/comparison.ts

export interface Feature {
	name: string;
	tooltip: string;
	free: boolean | string;
	pro: boolean | string;
	figma: boolean | string;
	manual: boolean | string;
}

export interface FeatureCategory {
	name: string;
	features: Feature[];
}

export const featureCategories: FeatureCategory[] = [
	{
		name: "Core Experience",
		features: [
			{
				name: "Google Docs Native App",
				tooltip: "Work directly in Google Docs with a native sidebar app - no context switching",
				free: true,
				pro: true,
				figma: false,
				manual: true
			},
			{
				name: "Pre-made Components",
				tooltip: "Ready-to-use UI components like headers, CTAs, forms and more",
				free: "12 components",
				pro: "90+ components",
				figma: "∞",
				manual: false
			},
			{
				name: "Dark/Light Themes",
				tooltip: "Auto-updating themes for both your docs and components",
				free: false,
				pro: true,
				figma: true,
				manual: false
			}
		]
	},
	{
		name: "Writing Tools",
		features: [
			{
				name: "Word Count",
				tooltip: "Smart word counting for UX copy and AI prompts",
				free: true,
				pro: true,
				figma: false,
				manual: true
			},
			{
				name: "Auto Text Styles",
				tooltip: "Consistent text styles that auto-update everywhere (H1-H6)",
				free: "Basic",
				pro: true,
				figma: true,
				manual: false
			},
			{
				name: "Comment & Collaborate",
				tooltip: "Real-time collaboration using Google Docs native features",
				free: true,
				pro: true,
				figma: "Limited",
				manual: true
			}
		]
	},
	{
		name: "Development",
		features: [
			{
				name: "Export to HTML/CSS",
				tooltip: "Convert your wireframes to production-ready code",
				free: false,
				pro: true,
				figma: true,
				manual: false
			},
			{
				name: "AI Code Generation",
				tooltip: "Generate code from your wireframes using AI",
				free: false,
				pro: true,
				figma: false,
				manual: false
			},
			{
				name: "Custom Scripts",
				tooltip: "Access and modify the underlying Google Apps Scripts",
				free: false,
				pro: true,
				figma: false,
				manual: false
			}
		]
	},
	{
		name: "Templates & Examples",
		features: [
			{
				name: "Sample Wireframes",
				tooltip: "Ready-to-use wireframe templates for common pages",
				free: "2",
				pro: "13+",
				figma: "∞",
				manual: false
			},
			{
				name: "Page Layouts",
				tooltip: "Pre-made page layouts and section templates",
				free: "5",
				pro: "All",
				figma: "∞",
				manual: false
			}
		]
	}
];

// Export default 3 rows for initial preview
export const previewFeatures = featureCategories
	.flatMap(cat => cat.features)
	.slice(0, 3);

// Constants for comparison table
export const PREVIEW_ROWS = 3;
export const PLANS = [
	{ id: "free", name: "Free", price: "$0", actionText: "Get Started" },
	{ id: "pro", name: "Pro", price: "$59", popular: true, actionText: "Get Pro" },
	{ id: "figma", name: "Figma", price: "$15/mo", disabled: true },
	{ id: "manual", name: "Manual", price: "$0", disabled: true }
];