// src/lib/(space)/repacks/firefly/stores/musicStore.ts
import { writable, derived } from 'svelte/store';

export type FrequencyData = {
	timestamp: number;
	frequency: number;
	note: string;
	amplitude: number;
};

type MusicState = {
	currentFrequency: number;
	currentNote: string;
	isPlaying: boolean;
	frequencyHistory: FrequencyData[];
	videoTimestamp: number;
	isInfoOpen: boolean;
	selectedPreset: string | null;
};

function createMusicStore() {
	const initialState: MusicState = {
		currentFrequency: 440, // A4 default
		currentNote: 'A4',
		isPlaying: false,
		frequencyHistory: [],
		videoTimestamp: 0,
		isInfoOpen: false,
		selectedPreset: null
	};

	const { subscribe, set, update } = writable(initialState);

	return {
		subscribe,

		updateFrequency: (frequency: number, note: string) => update(state => ({
			...state,
			currentFrequency: frequency,
			currentNote: note,
			frequencyHistory: [
				...state.frequencyHistory,
				{
					timestamp: Date.now(),
					frequency,
					note,
					amplitude: Math.random() // Replace with actual amplitude
				}
			].slice(-100) // Keep last 100 readings
		})),

		setPlaying: (isPlaying: boolean) => update(state => ({
			...state,
			isPlaying
		})),

		updateTimestamp: (timestamp: number) => update(state => ({
			...state,
			videoTimestamp: timestamp
		})),

		toggleInfo: () => update(state => ({
			...state,
			isInfoOpen: !state.isInfoOpen
		})),

		selectPreset: (preset: string) => update(state => ({
			...state,
			selectedPreset: preset
		})),

		reset: () => set(initialState)
	};
}

export const musicStore = createMusicStore();

// Derived store for frequency chart data
export const frequencyChartData = derived(
	musicStore,
	$musicStore => $musicStore.frequencyHistory.map(d => ({
		time: d.timestamp,
		freq: d.frequency,
		amp: d.amplitude
	}))
);