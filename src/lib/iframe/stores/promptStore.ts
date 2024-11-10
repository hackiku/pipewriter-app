// $lib/stores/promptStore.ts
import { writable, derived } from "svelte/store";

export interface Prompt {
  id: string;
  title: string;
  content: string;
  index: number;
  isDefault: boolean;
}

const DEFAULT_PROMPTS: Prompt[] = [
  {
    id: "1",
    title: "Landing Page",
    content:
      "Generate a landing page with a hero section that highlights the main value proposition, followed by 3 feature cards showing key benefits, and end with a prominent call-to-action button.",
    index: 0,
    isDefault: true,
  },
  {
    id: "2",
    title: "Feature Section",
    content:
      "Create a feature comparison section with 3-4 columns. Each should have a clear heading, supporting text that emphasizes benefits, and maintain consistent vertical alignment.",
    index: 1,
    isDefault: true,
  },
  {
    id: "3",
    title: "Pricing Cards",
    content:
      "Design a pricing section with 3 tiers. Each card should have a clear plan name, price point, feature list highlighting key benefits, and a call-to-action button.",
    index: 2,
    isDefault: true,
  },
  {
    id: "4",
    title: "",
    content: "",
    index: 3,
    isDefault: true,
  },
  {
    id: "5",
    title: "",
    content: "",
    index: 4,
    isDefault: true,
  },
];

function createPromptStore() {
  const { subscribe, set, update } = writable({
    prompts: DEFAULT_PROMPTS,
    activePromptId: "1", // Set the default active prompt
    useMasterPrompt: false,
    currentIndex: 0,
  });

  return {
    subscribe,
    setActivePrompt: (promptId: string | null) =>
      update((state) => ({ ...state, activePromptId: promptId })),
    setIndex: (index: number) =>
      update((state) => ({ ...state, currentIndex: index })),
    toggleMasterPrompt: () =>
      update((state) => ({
        ...state,
        useMasterPrompt: !state.useMasterPrompt,
      })),
    resetPrompt: (index: number) =>
      update((state) => ({
        ...state,
        prompts: state.prompts.map((p) =>
          p.index === index
            ? { ...DEFAULT_PROMPTS[index], isDefault: true }
            : p,
        ),
      })),
    updatePrompt: (prompt: Prompt) =>
      update((state) => ({
        ...state,
        prompts: state.prompts.map((p) =>
          p.index === prompt.index ? { ...prompt, isDefault: false } : p,
        ),
      })),
    removeActivePrompt: () =>
      update((state) => ({ ...state, activePromptId: null })),
  };
}

export const promptStore = createPromptStore();
export const activePrompt = derived(promptStore, ($store) =>
  $store.prompts.find((p) => p.id === $store.activePromptId),
);
