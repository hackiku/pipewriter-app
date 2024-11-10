<!-- $lib/iframe/features/ai/PromptSelect.svelte -->
<script lang="ts">
  import { slide } from "svelte/transition";
  import { ChevronUp, X } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import PromptEditor from './PromptEditor.svelte';
  import { promptStore, activePrompt, type Prompt } from '../../stores/promptStore';

  export let isOpen = false;
  export let isProcessing = false;
  
  let editMode = false;

  function handlePromptClick(prompt: Prompt) {
    promptStore.setActivePrompt(prompt.id);
    promptStore.setUsePrompt(true);
    isOpen = false;
    editMode = false;
  }

  function handleEdit(prompt: Prompt) {
    promptStore.setActivePrompt(prompt.id);
    promptStore.setUsePrompt(true);
    editMode = true;
  }

  function handleSave(updatedPrompt: Prompt) {
    promptStore.updatePrompt(updatedPrompt);
    editMode = false;
  }

  function handleCancel() {
    editMode = false;
  }

  function handleReset() {
    // Implementation for resetting to default
    console.log('Reset to default');
  }

  function truncateText(text: string, length = 60) {
    return text.length > length ? text.slice(0, length) + "..." : text;
  }

  $: buttonClass = cn(
    "w-full justify-between h-9",
    editMode && "border-red-200 bg-red-50 hover:bg-red-100"
  );
</script>

<div class="relative w-full">
  <Button
    variant="outline"
    class={buttonClass}
    on:click={() => isOpen = !isOpen}
    disabled={isProcessing}
  >
    <span class="text-sm truncate">
      {$activePrompt ? $activePrompt.title : "No AI prompt"}
    </span>
    {#if editMode}
      <X class="h-4 w-4" />
    {:else}
      <ChevronUp 
        class={cn(
          "h-4 w-4 transition-transform duration-200",
          !isOpen && "rotate-180"
        )}
      />
    {/if}
  </Button>

  {#if isOpen && !editMode}
    <div
      class="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 
             rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg overflow-hidden"
      transition:slide={{ duration: 150, axis: "y" }}
    >
      {#each $promptStore.prompts as prompt (prompt.id)}
        <button
          class={cn(
            "w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700",
            $promptStore.activePromptId === prompt.id && "bg-gray-100 dark:bg-gray-700"
          )}
          on:click={() => handlePromptClick(prompt)}
          on:dblclick={() => handleEdit(prompt)}
        >
          <div class="text-sm font-medium mb-1">{prompt.title}</div>
          <div class="text-xs text-muted-foreground truncate">
            {truncateText(prompt.content)}
          </div>
        </button>
      {/each}
    </div>
  {/if}

  {#if editMode && $activePrompt}
    <div class="absolute bottom-full left-0 right-0 mb-2">
      <PromptEditor 
        prompt={$activePrompt}
        onSave={handleSave}
        onCancel={handleCancel}
        onReset={handleReset}
      />
    </div>
  {/if}
</div>