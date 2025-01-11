// src/lib/pages/space/data/products.ts
import type { Product } from '../types';
import { Plane, Stars, Code } from 'lucide-svelte';

export const products: Product[] = [
	{
		title: "SpaceFOMO",
		description: "AI-powered news aggregator for the space industry, with FOMO scoring for trending topics.",
		longDescription: `Stay ahead of the space industry curve with SpaceFOMO. Our AI analyzes thousands of 
    space industry news sources, research papers, and social media to surface trending topics before they go mainstream.
    
    Features:
    • Real-time FOMO score for space industry topics
    • Personalized news feed based on your interests
    • Daily briefings on emerging space technologies
    • Integration with major space news sources
    • Custom alerts for your favorite space companies
    
    Built with OpenAI, Supabase, and Next.js. Currently processing over 10,000 articles daily.`,
		icon: Stars,
		status: "Coming Soon",
		link: "https://spacefomo.vercel.app",
		image: "pages/space/screenshots/spacefomo.png",
		tech: ["OpenAI", "Next.js", "Supabase", "Vercel"]
	},
	{
		title: "6Pack",
		description: "Open-source portable flight instrument suite for pilots and their cats. Arduino + React Native magic.",
		longDescription: `6Pack is an open-source electronic flight instrument system (EFIS) that turns your phone 
    into a backup aviation instrument panel. Perfect for student pilots or as a backup solution.
    
    Features:
    • Attitude indicator with AHRS
    • Airspeed indicator (GPS + pitot tube)
    • Altimeter with pressure setting
    • Turn coordinator
    • Magnetic compass
    • GPS moving map
    
    Built with Arduino, React Native, and lots of coffee. Currently being tested by a growing community of pilots and their feline copilots.`,
		icon: Plane,
		status: "Early Alpha",
		link: "https://6pack.cc",
		image: "pages/space/screenshots/6pack.png",
		tech: ["Arduino", "React Native", "TypeScript", "BLE"]
	},
	{
		title: "Wing Designer",
		description: "3D wing design tool for aerospace engineers. Parametric modeling made simple.",
		longDescription: `Wing Designer helps aerospace engineers rapidly prototype and analyze wing designs. 
    Built for both students and professionals, it makes parametric airfoil design accessible and fun.
    
    Features:
    • Parametric airfoil generation
    • Real-time 3D visualization
    • Basic CFD analysis integration
    • Export to common CAD formats
    • Collaborative design spaces
    
    Built with Three.js and WebAssembly for maximum performance. Currently supporting NACA airfoils with custom profiles coming soon.`,
		icon: Code,
		status: "In Development",
		link: "https://wingy.vercel.app/",
		image: "pages/space/screenshots/wingy.png",
		tech: ["Three.js", "WebAssembly", "React", "WebGL"]
	}
];