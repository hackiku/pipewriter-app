// lib/app/stores/elements.ts
import { writable, derived } from "svelte/store";
import { Blocks, Layout, Type } from "lucide-svelte";

export interface Element {
  id: string;
  type: string;
  category: string;
  props: Record<string, any>;
  icon?: any; // Lucide icon component
  description?: string;
  children?: Element[];
}

interface ElementsState {
  available: Record<string, Element>;
  instances: Element[];
  selected: Set<string>;
}

// Template elements that can be dragged onto the canvas
const elementTemplates = {
  hero: {
    id: "hero",
    type: "hero",
    category: "content",
    icon: Type,
    props: {
      title: "Welcome",
      subtitle: "This is a hero section",
      alignment: "center",
    },
    description: "A hero section with title and subtitle",
  },
  blurbs: {
    id: "blurbs",
    type: "blurbs",
    category: "content",
    icon: Layout,
    props: {
      items: [
        { title: "Feature 1", description: "Description 1" },
        { title: "Feature 2", description: "Description 2" },
        { title: "Feature 3", description: "Description 3" },
      ],
    },
    description: "3-column feature highlight section",
  },
  zigzag: {
    id: "zigzag",
    type: "zigzag",
    category: "content",
    icon: Blocks,
    props: {
      title: "Feature Highlight",
      description: "Detailed feature description",
      image: "/api/placeholder/400/300",
      reversed: false,
    },
    description: "Alternating text and image section",
  },
};

const initialState: ElementsState = {
  available: elementTemplates,
  instances: [],
  selected: new Set(),
};

function createElementsStore() {
  const { subscribe, set, update } = writable<ElementsState>(initialState);

  return {
    subscribe,
    addInstance: (templateId: string) =>
      update((state) => {
        const template = state.available[templateId];
        if (!template) return state;

        const instance = {
          ...template,
          id: crypto.randomUUID(), // New unique ID for this instance
        };

        return {
          ...state,
          instances: [...state.instances, instance],
        };
      }),
    removeInstance: (id: string) =>
      update((state) => ({
        ...state,
        instances: state.instances.filter((el) => el.id !== id),
        selected: new Set([...state.selected].filter((selId) => selId !== id)),
      })),
    updateInstance: (id: string, updates: Partial<Element>) =>
      update((state) => ({
        ...state,
        instances: state.instances.map((el) =>
          el.id === id ? { ...el, ...updates } : el,
        ),
      })),
    moveInstance: (id: string, newIndex: number) =>
      update((state) => {
        const instances = [...state.instances];
        const oldIndex = instances.findIndex((el) => el.id === id);
        if (oldIndex === -1) return state;

        const [element] = instances.splice(oldIndex, 1);
        instances.splice(newIndex, 0, element);

        return { ...state, instances };
      }),
    reset: () => set(initialState),
  };
}

export const elements = createElementsStore();

// Derived store for active elements on the canvas
export const canvasElements = derived(
  elements,
  ($elements) => $elements.instances,
);
