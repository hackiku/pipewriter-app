// src/lib/(space)/data/examples.ts
import type { UXExample } from '../types';

export const uxExamples: UXExample[] = [
	{
		position: {
			x: '5%',
			y: '15%'
		},
		size: 'lg',
		yOffset: 20,
		bad: {
			title: 'Legacy Website',
			points: [
				{ label: '5s load time' },
				{ label: 'Generic template' }
			]
		},
		good: {
			title: 'Space-Ready Site',
			points: [
				{ label: 'Blazing fast' },
				{ label: 'Custom design' }
			]
		}
	},
	{
		position: {
			x: '60%',
			y: '25%'
		},
		size: 'md',
		yOffset: -30,
		bad: {
			title: 'Poor Experience',
			points: [
				{ label: 'Generic call to action' },
				{ label: 'Bland visuals' }
			]
		},
		good: {
			title: 'Optimized UX',
			points: [
				{ label: 'Sales copy' },
				{ label: 'Thoughtful interaction' }
			]
		}
	}
];