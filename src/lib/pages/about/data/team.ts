// $lib/pages/about/data/team.ts

export interface TeamMember {
	firstName: string;
	lastName: string;
	profession: string;
	role: string;
	image: string;
	fallback: string;
	link?: {
		text: string;
		url: string;
	}
}

export const team: TeamMember[] = [
	{
		firstName: "Ivan",
		lastName: "Karaman",
		profession: "Technical Writer",
		role: "Copywriter turned coder Pipewriter to help fellow UX- & copy-writers create beautiful wireframes.",
		image: "images/people/ivan-karaman.png",
		fallback: "IK",
		link: {
			text: "Get Pipewriter",
			url: "/early"
		}
	},
	{
		firstName: "Yury",
		lastName: "Klyuch",
		profession: "Apps Script Developer",
		role: "Created the core Google Docs integration using Apps Script. Made the magic of tables-to-wireframes possible.",
		image: "images/people/yuri-kluych.png",
		fallback: "YK",
		link: {
			text: "Hire Yury",
			url: "https://www.upwork.com/freelancers/~01c23777388000f1ce"
		}
	},
	{
		firstName: "Kutay",
		lastName: "Güler",
		profession: "Svelte Developer",
		role: "Developing the Google Workspace add-on version. Making wireframing in Docs even smoother.",
		image: "images/people/kutay-guler.png",
		fallback: "KG",
		link: {
			text: "Hire Kutay",
			url: "https://www.upwork.com/freelancers/~01b8a130e7c99033fe"
		}
	},
	{
		firstName: "Giorgi",
		lastName: "Chkoidze",
		profession: "Copywriter",
		role: "Early beta tester and writing buddy. Provided invaluable feedback on UX writing workflows.",
		image: "images/people/giorgi-chkoidze.png",
		fallback: "GC",
		link: {
			text: "Hire Giorgi",
			url: "https://www.linkedin.com/in/giorgi-chkoidze"
		}
	},
	{
		firstName: "Public",
		lastName: "Void",
		profession: "Cat",
		role: "Chief nap officer and keyboard warmer. Occasionally provides feedback by walking across keyboards.",
		image: "images/people/public-void.png",
		fallback: "PV",
		link: {
			text: "Long story...",
			url: "https://6pack.cc"
		}
	}
];