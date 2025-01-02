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
		// Update examples in chuteStore.ts
		examples: [
			{
				id: 'phase-four',
				company: 'Phase Four',
				description: 'Electric propulsion systems for satellites',
				beforeUrl: 'https://jzro.co/chute-repack/repacks/phasefour.io',
				afterUrl: '/examples/space/phase-four-after',
				status: 'done'
			},
			{
				id: 'horse-tinder',
				company: 'HorseMingle',
				description: 'Connecting equestrian enthusiasts worldwide',
				beforeUrl: '/samples/horse-tinder/before.html',
				afterUrl: '/samples/horse-tinder/index.html',
				status: 'done'
			}
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