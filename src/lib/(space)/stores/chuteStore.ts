// src/lib/pages/space/stores/chuteStore.ts
import { writable } from 'svelte/store';

type Planet = 'earth' | 'mars';

interface ChuteState {
	planet: Planet;
	altitude: number;
	velocity: number;
}

function createChuteStore() {
	const { subscribe, set, update } = writable<ChuteState>({
		planet: 'earth',
		altitude: 0,
		velocity: 0
	});

	return {
		subscribe,
		setPlanet: (planet: Planet) => update(state => ({ ...state, planet })),
		updateStats: (altitude: number, velocity: number) =>
			update(state => ({ ...state, altitude, velocity })),
	};
}

export const chuteStore = createChuteStore();