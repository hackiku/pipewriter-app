<!-- $lib/iframe/features/ai/PromptEditor.svelte -->
<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { Button } from "$lib/components/ui/button";
  import { RotateCw } from 'lucide-svelte';
  import { cn } from "$lib/utils";
  import { promptStore, type Prompt } from '../../stores/promptStore';

  export let disabled: boolean = false;

  let currentPrompt: Prompt;
  let isEdited = false;

  $: currentPrompt = $promptStore.prompts[$promptStore.currentIndex];
  $: isEdited = !currentPrompt.isDefault;

  function handleReset() {
    $promptStore.resetPrompt($promptStore.currentIndex);
    isEdited = false;
  }

  function handleSave() {
    $promptStore.updatePrompt(currentPrompt);
    $promptStore.setActivePrompt(currentPrompt.id);
    isEdited = false;
  }

  function selectIndex(index: number) {
    $promptStore.setIndex(index);
    isEdited = false;
  }

  function handleInput() {
    isEdited = true;
    currentPrompt.isDefault = false;
  }

  $: numberButtonClass = (idx: number) => cn(
    "h-6 w-6 rounded-full p-0 text-xs",
    $promptStore.currentIndex === idx && "bg-primary text-primary-foreground"
  );
</script>

<div class="space-y-1.5">
  <input
    type="text"
    bind:value={currentPrompt.title}
    class="w-full px-2 py-1 text-sm font-medium bg-transparent focus:outline-none"
    placeholder="Prompt title..."
    {disabled}
    on:input={handleInput}
  />
  
  <ScrollArea class="w-full rounded-md border">
    <textarea
      bind:value={currentPrompt.content}
      class="w-full h-[100px] p-2 text-sm bg-transparent resize-none focus:outline-none"
      placeholder="Enter your prompt..."
      {disabled}
      on:input={handleInput}
    />
  </ScrollArea>

  <div class="flex items-center justify-between pt-1">
    <div class="flex gap-1">
      {#each $promptStore.prompts.slice(0, 3) as _, i}
        <Button
          variant="ghost"
          size="sm"
          class={numberButtonClass(i)}
          on:click={() => selectIndex(i)}
          {disabled}
        >
          {i + 1}
        </Button>
      {/each}
    </div>

    <div class="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        class="h-6"
        on:click={handleSave}
        disabled={disabled || !isEdited}
      >
        Save
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        class="h-6 w-6"
        on:click={handleReset}
        disabled={disabled || currentPrompt.isDefault}
      >
        <RotateCw class="h-3.5 w-3.5" />
      </Button>
    </div>
  </div>
</div>