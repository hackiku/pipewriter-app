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
		author: "Jaye Hannah",
		quote: {
			full: "1 • Just discovered Pipewriter. Been obsessing over it all morning.",
			short: "Just discovered Pipewriter. Been obsessing over it all morning."
		},
		role: "Content Strategist",
		company: "",
		imgSrc: 'people/writers/jaye-hannah.jpeg',
		hire: {
			// url: "https://www.upwork.com/freelancers/~01fea28dff1519da4a",
			url: "https://www.jayewrites.com/",
			buttonText: "Hire Jaye"
		}
	},
	{
		author: "Giorgi Chkoidze",
		quote: {
			full: "2 Clients immediately get the vision when they see the wireframe structure. Revisions become much easier or they don't even ask.",
			short: "Clients immediately get the vision. Revisions become much easier or they don't even ask."
		},
		role: "Freelance Copywriter",
		company: "",
		imgSrc: 'people/writers/giorgi-chkoidze.jpeg',
		hire: {
			url: "https://www.linkedin.com/in/giorgi-kynecos/",
			buttonText: "Hire Giorgi"
		}
	},
	{
		author: "Eoin Cronolly",
		status: "Early Adopter",
		quote: {
			full: "3 I've never seen a tool like this that works natively in Docs. Been building wireframes by hand using tables, even for five-figure contracts. This changes everything for us UX writers.",
			short: "This changes everything for us UX writers. Been building wireframes by hand in tables, even for five-figure contracts."
		},
		role: "SaaS Copywriter",
		company: "",
		imgSrc: 'people/writers/eoin-cronolly.jpeg',
		hire: {
			url: "https://www.upwork.com/freelancers/~01a3d679d42bc61963",
			buttonText: "Hire Eoin"
		}
	},
	{
		author: "Steena Marie Pierce",
		quote: {
			full: "4 This is such a fascinating use of AI for writers – could I potentially kiss my GDoc-patchwork wireframes goodbye?! Let\’s hope so.",
			short: "Fascinating AI for writers. I can kiss my GDoc-patchwork wireframes goodbye."
		},
		role: "Writer & Coach",
		company: "",
		imgSrc: 'people/writers/steena-marie-pierce.jpeg',
		hire: {
			url: "https://theartoflifedesign.com/",
			buttonText: "Hire Steena"
		}
	},

	{
		author: "Warren West",
		quote: {
			full: "5 Thanks Ivan! This looks super cool and is probably 1000x better than the wireframing I've been doing in Google Docs.",
			short: "This is 1000x better than the wireframing I've been doing in Google Docs."
		},
		role: "Copy Chief",
		company: "AppSumo",
		imgSrc: 'people/writers/warren-west.jpeg',
		hire: {
			url: "https://www.linkedin.com/in/warrenwords/",
			buttonText: "Hire Warren"
		}
	},
	{
		author: "Matthew Szymanski",
		quote: {
			full: "6 I've been trying out no-code editors like Webflow and Wix Studio but found them clunky. Going from copy doc to a website that's around 90% ready to deploy is the exact thing I've been looking for.",
			short: "No-code editors are clunky. Going 90% This is 1000x better than the wireframing I've been doing in Google Docs."
		},
		role: "Web Copywriter & Dev",
		company: "",
		imgSrc: 'people/writers/matthew-szymanski.png',
		// hire: {
		// url: "",
		// buttonText: "Hire Matt"
		// }
	},
	{
		author: "7",
		quote: {
			full: "7 No-code editors suck hard. Svelte is the key, beltalowda.",
			short: "No-code editors are clunky. Going 90% This is 1000x better than the wireframing I've been doing in Google Docs."
		},
		role: "7 Writer",
	},
	{
		author: "8",
		quote: {
			full: "8 Layout challenges, here's how we can improve the distribution of cards after the founder card for both layouts:",
			short: "No-code editors are clunky. Going 90% This is 1000x better than the wireframing I've been doing in Google Docs."
		},
		role: "UX Writer",
	},
	{
		author: "9",
		quote: {
			full: "9 Simple slice with direct counts instead of modulo. Show More functionality that adds 3 cards",
		},
		role: "UX Writer",
	},
	{
		author: "10",
		quote: {
			full: "10  We'll just fill columns from left to right, respecting the initial card positions.",
		},
		role: "UX Writer",
	}
];