// src/lib/pages/free/data/content.ts

export interface PageContent {
	sections: SectionConfig[];
	metadata: PageMetadata;
}

export interface SectionConfig {
	id: string;
	type: 'hero' | 'features' | 'testimonials' | 'cta';
	order: number;
	visible: boolean;
	content: HeroContent | FeaturesContent | TestimonialsContent | CTAContent;
}

// Content definition
export const pageContent: PageContent = {
	sections: [
		{
			id: 'hero',
			type: 'hero',
			order: 0,
			visible: true,
			content: {
				eyebrow: "Type to prototype",
				headline: "UX App for Writers"
			}
		},
		// ... other sections
	]
}