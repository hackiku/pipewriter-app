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
		logo: "/logos/wordagents.svg",
		tag: "Flash Sale",
		testimonial: {
			name: "Tommy Joiner",
			role: "Co-Founder",
			company: "WordAgents",
			photo: "/people/clients/tommy-joiner.jpg",
			text: "We hit $960k/mo from $250k average thanks to Ivan's flash sale landing page."
		},
		beforeImage: {
			desktop: "/samples/wordagents-before-desktop.jpg",
			mobile: "/samples/wordagents-before-mobile.jpg"
		},
		afterImage: {
			desktop: "/samples/wordagents-after-desktop.jpg",
			mobile: "/samples/wordagents-after-mobile.jpg"
		}
	},
	{
		id: "summaup",
		company: "SummaUp",
		logo: "/logos/summaup.svg",
		tag: "Investment",
		testimonial: {
			name: "Dr Jameson Day",
			role: "Investor",
			company: "SummaUp",
			photo: "/people/clients/jameson-day.jpeg",
			text: "Ivan mixes right brain and left brain - analytical with high Emotional IQ delivery."
		},
		beforeImage: {
			desktop: "/samples/summaup-before-desktop.jpg",
			mobile: "/samples/summaup-before-mobile.jpg"
		},
		afterImage: {
			desktop: "/samples/summaup-after-desktop.jpg",
			mobile: "/samples/summaup-after-mobile.jpg"
		}
	},
	{
		id: "suada",
		company: "Suada",
		logo: "/logos/suada.svg",
		tag: "SaaS",
		testimonial: {
			name: "David Thomson",
			role: "Founder",
			company: "Suada",
			photo: "/people/clients/david-thomson.jpeg",
			text: "This guy is incredible — level above & beyond anything I could have hoped for."
		},
		beforeImage: {
			desktop: "/samples/suada-before-desktop.jpg",
			mobile: "/samples/suada-before-mobile.jpg"
		},
		afterImage: {
			desktop: "/samples/suada-after-desktop.jpg",
			mobile: "/samples/suada-after-mobile.jpg"
		}
	}
];