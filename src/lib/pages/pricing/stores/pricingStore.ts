// src/lib/pages/pricing/stores/pricingStore.ts
import { writable } from 'svelte/store';

interface PricingState {
	isAnnual: boolean;
	selectedPlan: string | null;
	showComparison: boolean;
}

const createPricingStore = () => {
	const { subscribe, set, update } = writable<PricingState>({
		isAnnual: false, // Default to monthly for simpler onboarding
		selectedPlan: null,
		showComparison: false
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
		})),

		toggleComparison: () => update(state => ({
			...state,
			showComparison: !state.showComparison
		})),

		reset: () => set({
			isAnnual: false,
			selectedPlan: null,
			showComparison: false
		})
	};
};

export const pricingStore = createPricingStore();