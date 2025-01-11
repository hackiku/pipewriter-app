// src/lib/(space)/repacks/firefly/stores/fireflyStore.ts
import { writable } from 'svelte/store';

type Vehicle = {
	id: string;
	name: string;
	description: string;
	image: string;
	specs: {
		height: string;
		payload: string;
		thrust: string;
		orbit: string;
	};
};

type FireflyStore = {
	selectedVehicleId: string | null;
	isModalOpen: boolean;
};

const createFireflyStore = () => {
	const { subscribe, set, update } = writable<FireflyStore>({
		selectedVehicleId: null,
		isModalOpen: false
	});

	return {
		subscribe,
		selectVehicle: (id: string) => update(state => ({
			...state,
			selectedVehicleId: id,
			isModalOpen: true
		})),
		closeModal: () => update(state => ({
			...state,
			isModalOpen: false,
			selectedVehicleId: null
		}))
	};
};

export const fireflyStore = createFireflyStore();