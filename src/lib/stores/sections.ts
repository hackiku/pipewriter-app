import { writable } from 'svelte/store';

type Section = {
	id: number;
	type: string;
	data: any;
};

export const sections = writable<Section[]>([]);

export function addSection(type: string) {
	sections.update(s => [...s, {
		id: Date.now(),
		type,
		data: getDefaultData(type)
	}]);
}

export function removeSection(id: number) {
	sections.update(s => s.filter(section => section.id !== id));
}

export function reorderSections(newOrder: Section[]) {
	sections.set(newOrder);
}

function getDefaultData(type: string) {
	// Return default data for each section type
	// ... (implement this based on your needs)
}