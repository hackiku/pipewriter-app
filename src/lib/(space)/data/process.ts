// src/lib/(space)/data/process.ts
import type { LucideIcon } from 'lucide-svelte';
import {
	Rocket,
	Telescope,
	Zap,
	Target,
	Laptop,
	Code,
	Hexagon,
	ArrowRight,
	Sparkles,
	BadgeCheck
} from 'lucide-svelte';

export interface ProcessStep {
	title: string;
	subtitle: string;
	icon: typeof LucideIcon;
	tags: string[];
}

export const processSteps: ProcessStep[] = [
	{
		title: "Launch Sequence",
		subtitle: "Mission planning & discovery",
		icon: Rocket,
		tags: [
			"Brand Analysis",
			"UX Audit",
			"Conversion Goals",
			"User Journey Mapping",
			"Technical Requirements"
		]
	},
	{
		title: "Flight Path",
		subtitle: "Strategic design direction",
		icon: Telescope,
		tags: [
			"Information Architecture",
			"Wireframes",
			"Visual Direction",
			"Content Strategy",
			"Interactive Prototypes"
		]
	},
	{
		title: "Systems Check",
		subtitle: "High-fidelity development",
		icon: Target,
		tags: [
			"Component Architecture",
			"Responsive Layout",
			"Animation Systems",
			"Performance Optimization",
			"Cross-browser Testing"
		]
	},
	{
		title: "Mission Control",
		subtitle: "Launch preparation & QA",
		icon: Laptop,
		tags: [
			"Code Review",
			"Accessibility Testing",
			"Documentation",
			"Performance Metrics",
			"Launch Checklist"
		]
	}
];