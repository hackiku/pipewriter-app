// src/lib/(space)/data/projects.ts
import type { Project } from '../types';

export const projects: Project[] = [
	{
		title: "FlySvelte",
		description: "SvelteKit + Threlte + Rapier modular flight simulator for composable aerospace engineering GUIs",
		image: "space/projects/flysimulator.png",
		link: "https://flysvelte.vercel.app",
		status: "Early Development",
		tech: ["SvelteKit", "Threlte", "Rapier"]
	},
	{
		title: "HandyFly",
		description: "Camera-controlled F-16 flight simulator using MediaPipe hand tracking",
		image: "space/projects/handyfly.png",
		link: "https://handyfly.web.app",
		status: "Demo",
		tech: ["Three.js", "MediaPipe", "Firebase"]
	},
	{
		title: "Pipistrel Aerodynamics",
		description: "Interactive wing designer with LaTeX documentation and live calculations",
		image: "space/projects/pipistrel.png",
		link: "https://pipistrel.streamlit.app",
		status: "Beta",
		tech: ["Python", "Streamlit", "LaTeX"]
	},
	// Placeholder projects
	{
		title: "Project Artemis",
		description: "Space mission planning and visualization toolkit",
		image: "space/projects/placeholder1.png",
		link: "#",
		status: "Coming Soon",
		tech: ["WebGL", "React Three Fiber"]
	},
	{
		title: "Orbital Mechanics",
		description: "Interactive orbital dynamics calculator and visualizer",
		image: "space/projects/placeholder2.png",
		link: "#",
		status: "Planning",
		tech: ["Three.js", "WebAssembly"]
	}
];