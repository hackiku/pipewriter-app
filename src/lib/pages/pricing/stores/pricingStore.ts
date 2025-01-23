// stores/pricingStore.ts
import { writable } from 'svelte/store';

interface PricingState {
	isAnnual: boolean;
	selectedPlan: string | null;
}

const createPricingStore = () => {
	const { subscribe, set, update } = writable<PricingState>({
		isAnnual: true,
		selectedPlan: null
	});

	return {
		subscribe,
		toggleBilling: () => update(state => ({
			...state,
			isAnnual: !state.isAnnual
		})),
		selectPlan: (planId: string) => update(state => ({
			...state,
			selectedPlan: planId
		}))
	};
};

export const pricingStore = createPricingStore();