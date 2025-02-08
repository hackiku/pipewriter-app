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
		author: "Giorgi Chkoidze",
		quote: {
			full: "Clients immediately get the vision when they see the wireframe structure. Revisions become much easier or they don't even ask.",
			short: "Clients immediately get the vision. Revisions become much easier or they don't even ask."
		},
		role: "Copywriter",
		// company: "CopyWho",
		imgSrc: 'people/writers/giorgi-chkoidze.jpeg',
		hire: {
			url: "https://www.linkedin.com/in/giorgi-kynecos/",
			buttonText: "Hire Giorgi"
		}
	},
	{
		author: "Jaye Hannah",
		quote: {
			full: "Just discovered Pipewriter. Been obsessing over it all morning.",
			short: "Just discovered Pipewriter. Been obsessing over it all morning."
		},
		role: "Content Strategist",
		// company: "",
		imgSrc: 'people/writers/jaye-hannah.jpeg',
		hire: {
			// url: "https://www.upwork.com/freelancers/~01fea28dff1519da4a",
			url: "https://www.jayewrites.com/",
			buttonText: "Hire Jaye"
		}
	},
	{
		author: "Eoin Cronolly",
		status: "Early Adopter",
		quote: {
			full: "I've never seen a tool like this that works natively in Docs. Been building wireframes by hand using tables, even for five-figure contracts. This changes everything for us UX writers.",
			short: "This changes everything for us UX writers. Been building wireframes by hand in tables, even for five-figure contracts."
		},
		role: "SaaS Copywriter",
		// company: "",
		imgSrc: 'people/writers/eoin-cronolly.jpeg',
		hire: {
			url: "https://www.upwork.com/freelancers/~01a3d679d42bc61963",
			buttonText: "Hire Eoin"
		}
	},
	{
		author: "Steena Marie Pierce",
		quote: {
			full: "This is such a fascinating use of AI for writers – could I potentially kiss my GDoc-patchwork wireframes goodbye?! Let\’s hope so.",
			short: "Fascinating AI for writers. I can kiss my GDoc-patchwork wireframes goodbye."
		},
		role: "Writer & Coach",
		// company: "",
		imgSrc: 'people/writers/steena-marie-pierce.jpeg',
		hire: {
			url: "https://theartoflifedesign.com/",
			buttonText: "Hire Steena"
		}
	},
	{
		author: "Matthew Szymanski",
		quote: {
			full: "I've been trying out no-code editors like Webflow and Wix but found them clunky. Going from copy doc to a website that's around 90% ready to deploy is the exact thing I've been looking for.",
			short: "No-code editors are clunky. Going 90% This is 1000x better than the wireframing I've been doing in Google Docs."
		},
		role: "Copywriter & Dev",
		// company: "",
		imgSrc: 'people/writers/matthew-szymanski.png',
		hire: {
		url: "https://www.linkedin.com/in/matthew-szy/",
		buttonText: "Hire Matt"
		}
	},
	{
		author: "Esma Akalın",
		quote: {
			full: "Had a chance to test early versions. Couldn't believe what Google Docs scripts could do.",
			short: "Had a chance to test early version. Couldn't believe what Google Docs scripts could do."
		},
		role: "UX Writer",
		company: "Papara",
		imgSrc: 'people/writers/esma-akalin.jpeg',
		hire: {
		url: "https://www.linkedin.com/in/esma-akal%C4%B1n-355b49125",
		buttonText: "Hire Esma"
		}
	},
	{
		author: "Warren West",
		quote: {
			full: "Thanks Ivan! This looks super cool and is probably 1000x better than the wireframing I've been doing in Google Docs.",
			short: "This is 1000x better than the wireframing I've been doing in Google Docs."
		},
		role: "Copy Chief",
		// company: "AppSumo",
		imgSrc: 'people/writers/warren-west.jpeg',
		hire: {
			url: "https://www.linkedin.com/in/warrenwords/",
			buttonText: "Hire Warren"
		}
	},
	{
		author: "Jamie Smith",
		quote: {
			full: "//todo",
			short: "//todo"
		},
		role: "Content Marketer",
		// company: "AppSumo",
		imgSrc: 'people/writers/jamie-smith.png',
		hire: {
			url: "https://www.wireframeagency.co.uk/",
			buttonText: "Hire Jamie"
		}
	}
];