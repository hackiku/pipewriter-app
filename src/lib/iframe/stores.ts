// <!-- $lib/iframe/stores.ts -->

import { writable } from "svelte/store";

export const showInfo = writable(false); // show
export const chainMode = writable(false);
export const showLabels = writable(false);
export const activeTab = writable(false);
export const elementsTheme = writable<"light" | "gray" | "dark">("light");
