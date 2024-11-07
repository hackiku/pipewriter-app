// $lib/iframe/stores/promptStore.ts
import { writable, derived } from "svelte/store";

export interface Prompt {
  id: string;
  title: string;
  content: string;
}

const defaultPrompts: Prompt[] = [
  {
    id: "landing",
    title: "Landing Page",
    content:
      "Generate a landing page with a hero section that highlights the main value proposition, followed by 3 feature cards displaying key benefits, and end with a prominent call-to-action button. Use clear headings and concise copy.",
  },
  {
    id: "features",
    title: "Product Features",
    content:
      "Create a product features section with benefit-focused headings and descriptions. Include 4-6 key features, each with a clear heading and supporting text that emphasizes user value. Format as HTML.",
  },
  {
    id: "blog",
    title: "Blog Post",
    content:
      "Write a blog post structure with clear headings, subheadings, and body text. Include an engaging introduction, 3-4 main sections with descriptive headings, and a conclusion. Format using semantic HTML.",
  },
];

interface PromptState {
  prompts: Prompt[];
  activePromptId: string | null;
  usePrompt: boolean;
}

function createPromptStore() {
  const { subscribe, set, update } = writable<PromptState>({
    prompts: defaultPrompts,
    activePromptId: null,
    usePrompt: false,
  });

  return {
    subscribe,
    setActivePrompt: (promptId: string | null) =>
      update((state) => ({ ...state, activePromptId: promptId })),
    updatePrompt: (prompt: Prompt) =>
      update((state) => ({
        ...state,
        prompts: state.prompts.map((p) => (p.id === prompt.id ? prompt : p)),
      })),
    deletePrompt: (promptId: string) =>
      update((state) => ({
        ...state,
        prompts: state.prompts.filter((p) => p.id !== promptId),
        activePromptId:
          state.activePromptId === promptId ? null : state.activePromptId,
      })),
    setUsePrompt: (use: boolean) =>
      update((state) => ({ ...state, usePrompt: use })),
  };
}

export const promptStore = createPromptStore();

// Derived store for the currently active prompt
export const activePrompt = derived(
  promptStore,
  ($store) =>
    $store.prompts.find((p) => p.id === $store.activePromptId) || null,
);
