// src/routes/(marketing)/pricing/components/plans/types.ts

export interface Plan {
	id: string;
	name: string;
	description: string;
	price: {
		amount: number | null;
		period?: 'monthly' | 'annual' | 'one-time';
	};
	features: string[];
	cta: {
		text: string;
		variant: 'default' | 'outline' | 'secondary';
		href?: string;
	};
	badge?: string;
}
