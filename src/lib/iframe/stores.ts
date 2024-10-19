// <!-- $lib/iframe/stores.ts -->

import { writable } from "svelte/store";

// Store to control the visibility of labels
export const showInfo = writable(false);
export const chainMode = writable(false);
export const showLabels = writable(false);
export const activeTab = writable(false);
