// src/lib/pages/product/stores/productStore.ts
import { writable } from 'svelte/store';
import type { ProductState } from '../types';

function createProductStore() {
	const { subscribe, set, update } = writable<ProductState>({
		activeProduct: 'google-docs',
		previousProduct: null,
		isNavVisible: true
	});

	return {
		subscribe,
		setActive: (id: string) => update(state => ({
			...state,
			previousProduct: state.activeProduct,
			activeProduct: id
		})),
		reset: () => set({
			activeProduct: 'google-docs',
			previousProduct: null,
			isNavVisible: true
		})
	};
}

export const productStore = createProductStore();