<!-- $lib/iframe/features/ai/PromptDropdown.svelte -->
<script lang="ts">
  import { slide } from "svelte/transition";
  import { Button } from "$lib/components/ui/button";
  import * as Checkbox from "$lib/components/ui/checkbox";
  import { cn } from "$lib/utils";
  import { ChevronDown, X, Trash2 } from 'lucide-svelte';
  import PromptEditor from './PromptEditor.svelte';

  let showDropdown = false;
  let currentIndex = 0;
  let isProcessing = false;
  let useMasterPrompt = true;
  
  // Active prompt state
  let activePrompt: { title: string; content: string } | null = null;

  function handlePromptUpdate({ detail }: CustomEvent<{ title: string; content: string }>) {
    if (activePrompt) {
      activePrompt.title = detail.title;
      activePrompt.content = detail.content;
    }
  }

  function handlePromptSelect({ detail: index }: CustomEvent<number>) {
    currentIndex = index;
    // Could initialize activePrompt here if none selected
  }

  function clearPrompt() {
    activePrompt = null;
    showDropdown = false;
  }

  $: buttonClass = cn(
    "w-full justify-between px-3 h-9 font-normal",
    activePrompt && "border-2 border-primary bg-primary/5 hover:bg-primary/10"
  );
</script>

<div class="space-y-2">
  <Button
    variant="outline"
    class={buttonClass}
    on:click={() => showDropdown = !showDropdown}
    disabled={isProcessing}
  >
    {#if activePrompt}
      <div class="flex items-center gap-2 opacity-50">
        <Trash2 class="h-4 w-4" />
        <span>Clear prompt</span>
      </div>
      <X class="h-4 w-4" />
    {:else}
      <span class="text-muted-foreground">Select prompt...</span>
      <ChevronDown class={cn(
        "h-4 w-4 transition-transform duration-200",
        showDropdown && "rotate-180"
      )} />
    {/if}
  </Button>

  {#if showDropdown}
    <div
      class="p-3 bg-white dark:bg-gray-800 rounded-lg border"
      transition:slide={{ duration: 150 }}
    >
      <PromptEditor
        title={activePrompt?.title ?? ''}
        content={activePrompt?.content ?? ''}
        {currentIndex}
        disabled={isProcessing}
        on:update={handlePromptUpdate}
        on:select={handlePromptSelect}
      />

      <div class="flex items-center space-x-2 border-t mt-3 pt-2">
        <Checkbox.Root
          checked={useMasterPrompt}
          onCheckedChange={(checked) => useMasterPrompt = checked}
          disabled={isProcessing}
          class="h-4 w-4"
        >
          <Checkbox.Indicator>
            <div class="h-4 w-4 bg-primary"></div>
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label class="text-sm">
          Include layout context
        </label>
      </div>
    </div>
  {/if}
</div>