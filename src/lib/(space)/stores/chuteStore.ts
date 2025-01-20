// src/lib/pages/space/stores/chuteStore.ts
import { writable } from 'svelte/store';

type Planet = 'earth' | 'mars';

interface ChuteState {
	planet: Planet;
	altitude: number;
	velocity: number;
	lastUpdate: number;
}

function createChuteStore() {
	const { subscribe, set, update } = writable<ChuteState>({
		planet: 'earth',
		altitude: 0,
		velocity: 0,
		lastUpdate: Date.now()
	});

	// Throttle updates to prevent excessive store updates
	let updateTimeout: NodeJS.Timeout | null = null;
	const THROTTLE_MS = 50; // Only update every 50ms max

	return {
		subscribe,
		setPlanet: (planet: Planet) => update(state => ({ ...state, planet })),
		updateStats: (altitude: number, velocity: number) => {
			if (updateTimeout) return;

			updateTimeout = setTimeout(() => {
				update(state => ({
					...state,
					altitude,
					velocity,
					lastUpdate: Date.now()
				}));
				updateTimeout = null;
			}, THROTTLE_MS);
		},
	};
}

export const chuteStore = createChuteStore();