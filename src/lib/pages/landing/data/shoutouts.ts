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
		quote: "Works natively in Docs. No more building table wireframes by hand for five-figure contracts.",
	},
	{
		writer: "Giorgi Chkoidze",
		role: "Copywriter",
		image: "/people/writers/giorgi-chkoidze.jpeg",
		quote: "Clients immediately get the vision. Revisions become much easier or they don't even ask.",
	},
	{
		writer: "Warren West",
		role: "Copy Chief",
		image: "/people/writers/warren-west.jpeg",
		quote: "Looks 1000x better than the wireframing I've been doing in Google Docs.",
	},
	{
		writer: "Matthew Szymanski",
		role: "Copywriter & Dev",
		image: "/people/writers/matthew-szymanski.png",
		quote: "I can go from copy doc to a website that's around 90% ready to deploy.",
	},
];