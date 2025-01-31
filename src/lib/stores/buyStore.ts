// src/lib/stores/buyStore.ts
import { writable } from 'svelte/store';

// Core types that can be extended later
type PlanId = 'lite' | 'suite' | 'free';

interface BuyState {
	drawer: {
		isOpen: boolean;
		source: string | null;
		lastInteraction: Date | null;
	};
	// Future fields (commented but typed for reference)
	// selection?: {
	//   selectedPlan: PlanId | null;
	//   lastSelected: Date | null;
	// };
}

const initialState: BuyState = {
	drawer: {
		isOpen: false,
		source: null,
		lastInteraction: null
	}
};

function createBuyStore() {
	const { subscribe, set, update } = writable<BuyState>(initialState);

	return {
		subscribe,

		// Drawer actions
		openDrawer: (source: string = 'default') =>
			update(state => ({
				...state,
				drawer: {
					isOpen: true,
					source,
					lastInteraction: new Date()
				}
			})),

		closeDrawer: () =>
			update(state => ({
				...state,
				drawer: {
					...state.drawer,
					isOpen: false,
					lastInteraction: new Date()
				}
			})),

		// Complete reset
		reset: () => set(initialState),

		// Analytics helpers
		getLastSource: () => {
			let state: BuyState;
			subscribe(s => state = s)();
			return state.drawer.source;
		},

		getLastInteraction: () => {
			let state: BuyState;
			subscribe(s => state = s)();
			return state.drawer.lastInteraction;
		}
	};
}

export const buyStore = createBuyStore();