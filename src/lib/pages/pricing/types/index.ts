// src/lib/pages/pricing/types/index.ts

export interface Plan {
	id: string;
	name: string;
	description: string;
	price: {
		amount: number;
		period: 'monthly' | 'annually' | 'one-time' | 'forever';
		monthlyEquivalent?: number; // For annual plans
		savings?: string; // "Save $26" etc
	};
	features: string[];
	cta: {
		text: string;
		variant: 'default' | 'outline' | 'secondary';
		href: string;
	};
	badge?: string;
	highlight?: boolean; // Makes it stand out as recommended
}

export interface Feature {
	name: string;
	description: string;
	free: boolean;
	pro: boolean;
	bundle: boolean;
}

export interface FeatureCategory {
	name: string;
	features: Feature[];
}

export interface FAQ {
	question: string;
	answer: string;
}