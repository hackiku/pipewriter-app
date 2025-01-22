// src/lib/(space)/data/process.ts
import type { LucideIcon } from 'lucide-svelte';
import {
	Rocket,
	Telescope,
	Zap,
	Target,
	ArrowRight,
	Sparkles
} from 'lucide-svelte';

export interface ProcessStep {
	title: string;
	subtitle: string;
	icon: typeof LucideIcon;
	tags: string[];
}

export const processSteps: ProcessStep[] = [
	{
		title: "Crazy conversion booster",
		subtitle: "with SaaS-level copywriting and experience design",
		icon: Rocket,
		tags: [
			"Copywriting",
			"UX design",
			"Interactions",
		]
	},
	{
		title: "Orbitally fast delivery",
		subtitle: "by staying on brand and skipping straight to code",
		icon: Target,
		tags: [
			"7 days",
			"no Figma",
			"no Figma",
		]
	},
	{
		title: "In your code stack",
		subtitle: "delivered ",
		icon: Zap,
		tags: [
			"Clean Components",
			"Production Code",
			"Performance Tuned",
			"Launch Checklist",
			"Documentation"
		]
	}
];