// src/lib/stores/backgroundStore.ts
import { writable } from 'svelte/store';

type GridSize = "xs" | "sm" | "md" | "lg" | "xl";
type PatternOpacity = "low" | "medium" | "high";

interface BackgroundState {
	size: GridSize;
	opacity: PatternOpacity;
	gradient: boolean;
}

const initialState: BackgroundState = {
	size: "lg",
	opacity: "high",
	gradient: true
};

export const backgroundStore = writable<BackgroundState>(initialState);