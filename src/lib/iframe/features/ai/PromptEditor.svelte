<!-- $lib/iframe/features/ai/PromptEditor.svelte -->
<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { Button } from "$lib/components/ui/button";
  import { RotateCw } from 'lucide-svelte';
  import { cn } from "$lib/utils";
  import { createEventDispatcher } from 'svelte';

  export let title: string;
  export let content: string;
  export let currentIndex: number = 0;
  export let disabled: boolean = false;

  const dispatch = createEventDispatcher();

  // Hardcoded default prompts
  const defaultPrompts = [
    {
      title: "Landing Page",
      content: "Transform this content into a landing page layout with a hero section, feature cards, and clear call-to-action."
    },
    {
      title: "Feature Grid",
      content: "Create a feature comparison grid with clear headings, consistent formatting, and highlighted key points."
    },
    {
      title: "Blog Post",
      content: "Format this as a blog post with clear article structure, section breaks, and proper heading hierarchy."
    }
  ];

  function handleReset() {
    const defaultPrompt = defaultPrompts[currentIndex];
    dispatch('update', { title: defaultPrompt.title, content: defaultPrompt.content });
  }

  function handleSave() {
    dispatch('save');
  }

  function selectIndex(index: number) {
    dispatch('select', index);
  }

  $: numberButtonClass = (idx: number) => cn(
    "h-6 w-6 rounded-full p-0 text-xs",
    currentIndex === idx && "bg-primary text-primary-foreground"
  );
</script>

<div class="space-y-1.5">
  <input
    type="text"
    bind:value={title}
    class="w-full px-2 py-1 text-sm font-medium bg-transparent focus:outline-none"
    placeholder="Prompt title..."
    {disabled}
  />
  
  <ScrollArea class="w-full rounded-md border">
    <textarea
      bind:value={content}
      class="w-full h-[100px] p-2 text-sm bg-transparent resize-none focus:outline-none"
      placeholder="Enter your prompt..."
      {disabled}
    />
  </ScrollArea>

  <div class="flex items-center justify-between pt-1">
    <div class="flex gap-1">
      {#each Array(3) as _, i}
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
        {disabled}
      >
        Save
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        class="h-6 w-6"
        on:click={handleReset}
        {disabled}
      >
        <RotateCw class="h-3.5 w-3.5" />
      </Button>
    </div>
  </div>
</div>