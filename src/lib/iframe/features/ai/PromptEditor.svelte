<!-- $lib/iframe/features/ai/PromptEditor.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { RotateCcw } from 'lucide-svelte';
  import type { Prompt } from '../../stores/promptStore';

  export let prompt: Prompt;
  export let onSave: (updatedPrompt: Prompt) => void;
  export let onCancel: () => void;
  export let onReset: () => void;

  let title = prompt.title;
  let content = prompt.content;
</script>

<div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 space-y-4">
  <input
    type="text"
    bind:value={title}
    class="w-full p-2 text-sm font-medium bg-transparent border-b border-gray-200 
           dark:border-gray-700 focus:outline-none focus:border-primary"
    placeholder="Prompt title..."
  />
  
  <textarea
    bind:value={content}
    class="w-full h-24 p-2 text-sm bg-white dark:bg-gray-900 rounded 
           border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-primary"
    placeholder="Enter your prompt..."
  />

  <div class="flex justify-between">
    <Button
      variant="ghost"
      size="sm"
      on:click={onReset}
      class="h-8 px-2 text-gray-500 hover:text-gray-700"
    >
      <RotateCcw class="h-4 w-4 mr-2" />
      Reset
    </Button>

    <div class="flex gap-2">
      <Button
        variant="ghost"
        size="sm"
        on:click={onCancel}
        class="h-8 px-3"
      >
        Cancel
      </Button>
      <Button
        variant="default"
        size="sm"
        on:click={() => onSave({ ...prompt, title, content })}
        class="h-8 px-3"
      >
        Save
      </Button>
    </div>
  </div>
</div>