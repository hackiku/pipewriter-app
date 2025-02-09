// src/lib/components/demo/docs/types.ts
export interface Section {
	id: string;
	type: 'zigzag-left' | 'zigzag-right' | 'horizontal-blurbs';
	title?: string;
	description?: string;
	imageUrl?: string;
	items?: Array<{
		title: string;
		description: string;
	}>;
}