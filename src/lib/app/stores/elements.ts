// lib/app/stores/elements.ts
import { writable, derived } from "svelte/store";

export interface Element {
  id: string;
  type: string;
  category: string;
  props: Record<string, any>;
  icon?: string;
  description?: string;
  children?: Element[];
}

interface ElementsState {
  available: Record<string, Element>; // Available element templates
  instances: Element[]; // Actual elements on the canvas
  selected: Set<string>; // Selected element IDs
}

const initialState: ElementsState = {
  available: {
    hero: {
      id: "hero",
      type: "hero",
      category: "content",
      props: {
        title: "Welcome",
        subtitle: "This is a hero section",
        alignment: "center",
      },
      description: "A hero section with title and subtitle",
    },
    // Add other available elements...
  },
  instances: [],
  selected: new Set(),
};

function createElementsStore() {
  const { subscribe, set, update } = writable<ElementsState>(initialState);

  return {
    subscribe,
    addInstance: (element: Element) =>
      update((state) => ({
        ...state,
        instances: [...state.instances, element],
      })),
    removeInstance: (id: string) =>
      update((state) => ({
        ...state,
        instances: state.instances.filter((el) => el.id !== id),
      })),
    updateInstance: (id: string, updates: Partial<Element>) =>
      update((state) => ({
        ...state,
        instances: state.instances.map((el) =>
          el.id === id ? { ...el, ...updates } : el,
        ),
      })),
    toggleSelect: (id: string) =>
      update((state) => {
        const selected = new Set(state.selected);
        if (selected.has(id)) {
          selected.delete(id);
        } else {
          selected.add(id);
        }
        return { ...state, selected };
      }),
    reset: () => set(initialState),
  };
}

export const elements = createElementsStore();

// Derived store for selected elements
export const selectedElements = derived(elements, ($elements) =>
  Array.from($elements.selected)
    .map((id) => $elements.instances.find((el) => el.id === id))
    .filter(Boolean),
);
