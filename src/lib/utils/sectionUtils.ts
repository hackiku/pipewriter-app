import { sections } from '../stores/sections';
import { get } from 'svelte/store';

export function addSection(type: string) {
	sections.update(s => [...s, { type, data: getDefaultData(type) }]);
}

export function removeSection(index: number) {
	sections.update(s => s.filter((_, i) => i !== index));
}

export function moveSection(fromIndex: number, toIndex: number) {
	sections.update(s => {
		const newSections = [...s];
		const [removed] = newSections.splice(fromIndex, 1);
		newSections.splice(toIndex, 0, removed);
		return newSections;
	});
}

function getDefaultData(type: string) {
	// Return default data structure for each section type
	switch (type) {
		case 'hero':
			return { title: 'New Hero', subtitle: 'Add your content here' };
		case 'blurbs':
			return {
				items: [
					{ title: 'New Feature', content: 'Describe your feature' },
					{ title: 'Another Feature', content: 'Describe another feature' },
					{ title: 'Last Feature', content: 'Describe the last feature' }
				]
			};
		// ... other section types
		default:
			return {};
	}
}