// src/lib/pages/landing/sections/samples/data.ts

export interface SampleTestimonial {
	name: string;
	role: string;
	company?: string;
	photo: string;
	text: string;
}

export interface Sample {
	id: string;
	company: string;
	logo: string;
	tag: string;
	testimonial: SampleTestimonial;
	beforeImage: {
		desktop: string;
		mobile: string;
	};
	afterImage: {
		desktop: string;
		mobile: string;
	};
}

export const samples: Sample[] = [
	{
		id: "wordagents",
		company: "WordAgents",
		logo: "/logos/redocly.svg",
		tag: "Flash Sale",
		testimonial: {
			name: "Tommy Joiner",
			role: "Co-Founder",
			company: "WordAgents",
			photo: "/people/clients/tommy-joiner.jpg",
			text: "We hit $960k/mo from $250k average thanks to Ivan's flash sale landing page."
		},
		beforeImage: {
			desktop: "/samples/redocly/redocly-gdocs.png",
			mobile: "/samples/redocly/redocly-gdocs.png"
		},
		afterImage: {
			desktop: "/samples/redocly/redocly-live.png",
			mobile: "/samples/redocly/redocly-live.png"
			// desktop: "/samples/wordagents-after-desktop.jpg",
			// mobile: "/samples/wordagents-after-mobile.jpg"
		}
	},
	{
		id: "uploadcare",
		company: "Uploadcare",
		logo: "/logos/uploadcare.svg",
		tag: "Investment",
		testimonial: {
			name: "Anton Nesterov",
			role: "Design Lead",
			company: "Uploadcare",
			// photo: "/people/clients/jameson-day.jpeg",
			photo: "/people/clients/anton-nesterov.jpg",
			text: "Ivan mixes right brain and left brain - analytical with high Emotional IQ delivery."
		},
		beforeImage: {
			desktop: "/samples/uploadcare/uploadcare-gdocs.png",
			mobile: "/samples/uploadcare/uploadcare-gdocs-mobile.png"
		},
		afterImage: {
			desktop: "/samples/uploadcare/uploadcare-live.png",
			mobile: "/samples/uploadcare/uploadcare-live-mobile.png"
		}
	},
	{
		id: "stoovo",
		company: "Stoovo",
		logo: "/logos/stoovo.svg",
		tag: "SaaS",
		testimonial: {
			name: "David Thomson",
			role: "Co-Founder",
			company: "Suada",
			photo: "/people/clients/hantz-fevry.png",
			// photo: "/people/clients/david-thomson.jpeg",
			text: "Ivan's wireframe docs are a collab godsend. We iterate website copy in hours and go straight to design."
		},
		beforeImage: {
			desktop: "/samples/gdocs.png",
			mobile: "/samples/gdocs.png"
		},
		afterImage: {
			desktop: "/samples/live.png",
			mobile: "/samples/live.png"
		}
	}
];