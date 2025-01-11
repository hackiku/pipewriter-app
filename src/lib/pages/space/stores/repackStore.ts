// src/lib/pages/space/stores/repackStore.ts
import { writable } from 'svelte/store';

export interface RepackExample {
	id: string;
	company: string;
	description: string;
	beforeUrl: string;
	afterUrl: string | null;  // null when using dynamic component
	component?: string;       // path to Svelte component for dynamic after view
	status: 'in-progress' | 'done';
	meta?: {
		originalUrl: string;
		launchDate?: string;
		techStack: string[];
	};
}

interface RepackState {
	examples: RepackExample[];
	currentIndex: number;
}

const initialState: RepackState = {
	examples: [
		{
			id: 'firefly',
			company: 'Firefly Aerospace',
			description: 'Launch vehicles for commercial access to space',
			beforeUrl: '/pages/space/repacks/firefly-old.png',
			afterUrl: null,
			component: 'repacks/firefly/Firefly.svelte',
			status: 'in-progress',
			meta: {
				originalUrl: 'https://fireflyspace.com',
				techStack: ['SvelteKit', 'Tailwind', 'TypeScript']
			}
		},
		{
			id: 'phase-four',
			company: 'Phase Four',
			description: 'Electric propulsion systems for satellites',
			beforeUrl: 'https://jzro.co/chute-repack/repacks/phasefour.io',
			afterUrl: '/pages/space/phase-four-after.png',
			status: 'done'
		}
	],
	currentIndex: 0
};

function createRepackStore() {
	const { subscribe, set, update } = writable<RepackState>(initialState);

	return {
		subscribe,
		setExample: (index: number) =>
			update(state => ({ ...state, currentIndex: index })),
		addExample: (example: RepackExample) =>
			update(state => ({
				...state,
				examples: [...state.examples, example]
			})),
		updateExample: (id: string, changes: Partial<RepackExample>) =>
			update(state => ({
				...state,
				examples: state.examples.map(ex =>
					ex.id === id ? { ...ex, ...changes } : ex
				)
			})),
		reset: () => set(initialState)
	};
}

export const repackStore = createRepackStore();