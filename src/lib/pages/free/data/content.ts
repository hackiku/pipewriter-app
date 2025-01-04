// src/lib/pages/free/data/content.ts
import type { ContentStructure } from '../types';

export const initialContent: ContentStructure = {
	sections: [
		{
			id: 'hero',
			order: 0,
			elements: [
				{
					type: 'h1',
					value: 'UX App for Writers',
					path: ['hero', 'headline'],
					metadata: {
						className: 'text-4xl font-bold tracking-tight'
					}
				},
				{
					type: 'text',
					value: 'Type to prototype',
					path: ['hero', 'eyebrow'],
					metadata: {
						className: 'text-primary/80'
					}
				}
			]
		},
		{
			id: 'features',
			order: 1,
			elements: [
				{
					type: 'h2',
					value: 'Write 10× Copy Decks',
					path: ['features', 'headline'],
					metadata: {
						className: 'text-3xl font-semibold'
					}
				}
			],
			children: [
				{
					id: 'feature-1',
					elements: [
						{
							type: 'emoji',
							value: '⚡️',
							path: ['features', 'blurbs', 0, 'emoji']
						},
						{
							type: 'h3',
							value: 'Click-drop workflow',
							path: ['features', 'blurbs', 0, 'title']
						},
						{
							type: 'text',
							value: 'Native Docs app',
							path: ['features', 'blurbs', 0, 'description']
						}
					]
				},
				// More features...
			]
		},
		{
			id: 'testimonials',
			order: 2,
			elements: [
				{
					type: 'h2',
					value: 'Writers Dig That',
					path: ['testimonials', 'headline']
				}
			],
			children: [
				{
					id: 'testimonial-1',
					elements: [
						{
							type: 'quote',
							value: "I've never seen a tool like this that works natively in Docs...",
							path: ['testimonials', 'cards', 0, 'quote']
						},
						{
							type: 'text',
							value: 'Eoin',
							path: ['testimonials', 'cards', 0, 'firstName']
						},
						{
							type: 'text',
							value: 'Cronolly',
							path: ['testimonials', 'cards', 0, 'lastName']
						},
						{
							type: 'label',
							value: 'SaaS Copywriter',
							path: ['testimonials', 'cards', 0, 'role']
						}
					]
				}
			]
		},
		{
			id: 'cta',
			order: 3,
			elements: [
				{
					type: 'h2',
					value: 'Beta Launch Special — $59 One-Time (Until Jan 10th)',
					path: ['cta', 'headline']
				},
				{
					type: 'text',
					value: 'Join the first wave of writer-first wireframers for a one-off fee',
					path: ['cta', 'subheading']
				},
				{
					type: 'button',
					value: 'Docs Bundle 40% OFF',
					path: ['cta', 'buttonText']
				},
				{
					type: 'label',
					value: 'Old Template Users Get 50% OFF! Check your email',
					path: ['cta', 'note']
				}
			]
		}
	]
};