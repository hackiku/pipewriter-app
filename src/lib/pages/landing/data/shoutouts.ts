// src/lib/pages/landing/data/shoutouts.ts

export interface Shoutout {
	writer: string;
	role: string;
	image: string;
	// step: string;
	quote: string;
}

export const shoutouts: Shoutout[] = [
	{
		writer: "Eoin Cronolly",
		role: "SaaS Copywriter",
		image: "/people/writers/eoin-cronolly.jpeg",
		// step: "Collaboration",
		quote: "Works natively in Docs. No more building table wireframes by hand for five-figure contracts.",
	},
	{
		writer: "Giorgi Chkoidze",
		role: "UX Writer",
		image: "/people/writers/giorgi-chkoidze.jpeg",
		// step: "Ideation",
		quote: "Perfect for quick wireframes right where I write my copy. No more switching tools.",
	},
	{
		writer: "Warren West",
		role: "Copy Chief",
		image: "/people/writers/warren-west.jpeg",
		// step: "Review",
		quote: "Finally - we can review copy in its actual context. No more guessing about placement.",
	},
	{
		writer: "Esma Akalin",
		role: "Content Designer",
		image: "/people/writers/esma-akalin.jpeg",
		// step: "Handoff",
		quote: "Clean handoff to engineering with all the specs they need. No back-and-forth.",
	},
];