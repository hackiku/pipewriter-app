// src/data/pricing/comparison.ts

export interface Plan {
	id: string;
	name: string;
	price: string;
	actionText?: string;
	popular?: boolean;
	disabled?: boolean;
	highlight?: string;
}

export interface Feature {
	name: string;
	tooltip: string;
	plans: string[];  // Values for each plan, in order
}

export interface FeatureCategory {
	name: string;
	features: Feature[];
}

export const PLANS: Plan[] = [
	{
		id: "free",
		name: "Free",
		price: "$0",
		actionText: "Get Started"
	},
	{
		id: "pro",
		name: "Pro",
		price: "$57",
		actionText: "Get Pro",
		popular: true,
		highlight: "Early bird offer"
	},
	{
		id: "manual",
		name: "Manual Docs",
		price: "$0",
		disabled: true
	}
];

export const featureCategories: FeatureCategory[] = [
	{
		name: "Writing Experience",
		features: [
			{
				name: "UI Components",
				tooltip: "Pre-built wireframe components ready to use",
				plans: ["12", "90+", "✗"]
			},
			{
				name: "Docs Sidebar App",
				tooltip: "Drop components right from Google Docs sidebar",
				plans: ["✗", "✓", "✗"]
			},
			{
				name: "Dark Mode Support",
				tooltip: "Switch between light and dark themes",
				plans: ["✗", "✓", "✗"]
			}
		]
	},
	{
		name: "Code & Export",
		features: [
			{
				name: "HTML Export",
				tooltip: "Convert wireframes to semantic HTML",
				plans: ["Basic", "Full", "✗"]
			},
			{
				name: "Custom Scripts",
				tooltip: "Access and modify the Apps Scripts",
				plans: ["Read", "Full", "✗"]
			},
			{
				name: "AI Prompts",
				tooltip: "Generate code from your wireframes",
				plans: ["✗", "✓", "✗"]
			}
		]
	},
	{
		name: "Templates",
		features: [
			{
				name: "Landing Pages",
				tooltip: "Ready-to-use landing page templates",
				plans: ["2", "13+", "0"]
			},
			{
				name: "Team Features",
				tooltip: "Collaboration and sharing features",
				plans: ["Basic", "Full", "Basic"]
			}
		]
	}
];

// For preview functionality
export const PREVIEW_ROWS = 3;
export const previewFeatures = featureCategories
	.flatMap(cat => cat.features)
	.slice(0, PREVIEW_ROWS);