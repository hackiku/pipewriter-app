// $lib/iframe/stores.ts
import { writable } from "svelte/store";

export const showInfo = writable(false);
export const chainMode = writable(false);
export const showLabels = writable(false);
export const activeTab = writable<keyof typeof tabs | null>(null);
