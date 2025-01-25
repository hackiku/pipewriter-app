// src/lib/(space)/data/projects.ts
export const projects: Project[] = [
	{
		id: 'flysvelte',
		title: "FlySvelte",
		description: "Component-based flight simulator toolkit",
		category: "simulation",
		image: "/projects/flysvelte.png",
		link: "https://flysvelte.vercel.app/right-rudder",
		status: "Alpha",
		tech: ["svelte", "threlte"],
		demo: {
			url: "https://flysvelte.vercel.app/demo",
			instructions: "Use WASD to control, Space to toggle view"
		}
	},
	{
		id: 'handyfly',
		title: "HandyFly",
		description: "Camera-controlled F-16 flight sim using MediaPipe",
		category: "simulation",
		image: "/projects/handyfly.png",
		link: "https://handyfly.web.app",
		status: "Demo",
		tech: ["threejs", "firebase"],
		demo: {
			url: "https://handyfly.web.app/demo",
			instructions: "Show palm to camera to start tracking"
		}
	},
	{
		id: 'pipistrel',
		title: "Pipistrel Aero",
		description: "Interactive wing design tools with live LaTeX",
		category: "design",
		image: "/projects/pipistrel.png",
		link: "https://pipistrel.streamlit.app",
		status: "Beta",
		tech: ["streamlit", "python"],
		demo: {
			url: "https://pipistrel.streamlit.app/demo"
		}
	},
	{
		id: 'artemis',
		title: "Project Artemis",
		description: "Space mission planning visualization toolkit",
		category: "visualization",
		image: "/projects/artemis.png",
		link: "#",
		status: "Coming Soon",
		tech: ["threejs", "webgl"],
		demo: {
			url: "#"
		}
	}
];
