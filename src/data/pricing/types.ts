// src/data/pricing/types.ts

export interface PlanPrice {
	amount: number | null;
	period?: 'one-time' | 'monthly' | 'yearly' | 'lifetime';
}

export interface PlanCTA {
	text: string;
	variant: 'default' | 'outline' | 'secondary';
	href: string;
}

export interface Plan {
	id: string;
	name: string;
	description: string;
	price: PlanPrice;
	features: string[];
	badge?: string;
	cta: PlanCTA;
}
