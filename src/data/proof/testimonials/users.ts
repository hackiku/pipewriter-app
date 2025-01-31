// src/data/proof/testimonials/users.ts
import type { Testimonial } from '../types';

export interface HireInfo {
	url: string;
	buttonText: string;
}

export interface TestimonialContent {
	full: string;
	short: string;
}

export interface EnhancedTestimonial extends Testimonial {
	quote: TestimonialContent;
	hire?: HireInfo;
}

export const userTestimonials: EnhancedTestimonial[] = [
	{
		quote: {
			full: "I've never seen a tool like this that works natively in Docs. Been building wireframes by hand using tables, even for five-figure contracts. This changes everything for us UX writers.",
			short: "This changes everything for us UX writers. Been building wireframes by hand in tables, even for five-figure contracts."
		},
		author: "Eoin Cronolly",
		role: "SaaS Copywriter",
		company: "Freelance",
		imgSrc: 'people/writers/eoin-cronolly.jpg',
		hire: {
			url: "https://eoincronolly.com",
			buttonText: "Visit Website"
		}
	},
	{
		quote: {
			full: "Clients immediately get the vision when they see the wireframe structure. Revisions become much easier or they don't even ask. Plus, for me it's easier because I don't have to write long copies just to impress them.",
			short: "Clients immediately get the vision. Revisions become much easier or they don't even ask."
		},
		author: "Giorgi C.",
		role: "Freelance Copywriter",
		company: "Independent",
		imgSrc: 'people/writers/giorgi-c.jpg',
		hire: {
			url: "https://twitter.com/giorgicopywrite",
			buttonText: "Hire Giorgi"
		}
	},
	{
		quote: {
			full: "Thanks Ivan! This looks super cool and is probably 1000x better than the wireframing I've been doing in Google Docs.",
			short: "This is 1000x better than the wireframing I've been doing in Google Docs."
		},
		author: "Warren West",
		role: "Copy Chief",
		company: "AppSumo",
		imgSrc: 'people/writers/warren-west.jpg',
		hire: {
			url: "https://warrenwords.com",
			buttonText: "Hire Warren"
		}
	}
];