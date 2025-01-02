// $lib/stores/chuteStore.ts
import { writable } from 'svelte/store';

export interface RedesignExample {
	id: string;
	company: string;
	description: string;
	beforeUrl: string;
	afterUrl: string;
	status: 'done' | 'in-progress';
}

interface RedesignsState {
	examples: RedesignExample[];
	currentIndex: number;
}

function createRedesignsStore() {
	const { subscribe, set, update } = writable<RedesignsState>({
		examples: [
			{
				id: 'phase-four',
				company: 'Phase Four',
				description: 'Electric propulsion systems for satellites',
				beforeUrl: 'https://jzro.co/chute-repack/repacks/phasefour.io',
				afterUrl: '/examples/space/phase-four-after',
				status: 'done'
			},
			// Add more examples as they come in
		],
		currentIndex: 0
	});

	return {
		subscribe,
		setExample: (index: number) =>
			update(state => ({ ...state, currentIndex: index })),
		addExample: (example: RedesignExample) =>
			update(state => ({
				...state,
				examples: [...state.examples, example]
			})),
		reset: () =>
			update(state => ({ ...state, currentIndex: 0 }))
	};
}

export const redesignsStore = createRedesignsStore();