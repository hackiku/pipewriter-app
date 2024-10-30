// lib/app/stores/editor.ts
import { writable, derived } from "svelte/store";

export type EditorMode = "edit" | "insert" | "story" | "preview";

interface EditorState {
  mode: EditorMode;
  selectedElementId: string | null;
  isDragging: boolean;
  zoom: number;
  history: {
    past: any[];
    present: any;
    future: any[];
  };
}

const initialState: EditorState = {
  mode: "edit",
  selectedElementId: null,
  isDragging: false,
  zoom: 1,
  history: {
    past: [],
    present: null,
    future: [],
  },
};

function createEditorStore() {
  const { subscribe, set, update } = writable<EditorState>(initialState);

  return {
    subscribe,
    setMode: (mode: EditorMode) => update((state) => ({ ...state, mode })),
    selectElement: (id: string | null) =>
      update((state) => ({ ...state, selectedElementId: id })),
    setDragging: (isDragging: boolean) =>
      update((state) => ({ ...state, isDragging })),
    setZoom: (zoom: number) => update((state) => ({ ...state, zoom })),
    reset: () => set(initialState),
  };
}

export const editor = createEditorStore();

// Convenience derived stores
export const editorMode = derived(editor, ($editor) => $editor.mode);
export const selectedElement = derived(
  editor,
  ($editor) => $editor.selectedElementId,
);
export const isDragging = derived(editor, ($editor) => $editor.isDragging);
