// lib/pages/demo/types.ts
export type SectionType = 'video' | 'hero' | 'product-blurbs' | 'zigzag' | 'blurbs' | 'testimonials' | 'cta';

export interface DemoSection {
	id: string;
	type: SectionType;
	visible: boolean;
	order: number;
	props?: Record<string, any>;
}