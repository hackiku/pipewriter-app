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
			desktop: "/samples/gdocs.png",
			mobile: "/samples/gdocs.png"
		},
		afterImage: {
			desktop: "/samples/live.png",
			mobile: "/samples/live.png"
			// desktop: "/samples/wordagents-after-desktop.jpg",
			// mobile: "/samples/wordagents-after-mobile.jpg"
		}
	},
	{
		id: "summaup",
		company: "SummaUp",
		logo: "/logos/uploadcare.svg",
		tag: "Investment",
		testimonial: {
			name: "Dr Jameson Day",
			role: "Investor",
			company: "SummaUp",
			photo: "/people/clients/jameson-day.jpeg",
			text: "Ivan mixes right brain and left brain - analytical with high Emotional IQ delivery."
		},
		beforeImage: {
			desktop: "/samples/gdocs.png",
			mobile: "/samples/gdocs.png"
		},
		afterImage: {
			desktop: "/samples/live.png",
			mobile: "/samples/live.png"
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