<!-- src/lib/iframe/components/AiCodeBlock.svelte -->
<script lang="ts">
  import { slide } from "svelte/transition";
  import { ChevronDown, Copy, Check, X } from 'lucide-svelte';
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";

  export let code: string = "";
  export let title: string = "Generated Code";
  export let onClose: () => void;

  let isExpanded = true;
  let isCopied = false;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(code);
      isCopied = true;
      setTimeout(() => isCopied = false, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
</script>

<div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
  <!-- Header -->
  <div class="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
    <button
      class="flex items-center gap-2 hover:text-primary transition-colors"
      on:click={() => isExpanded = !isExpanded}
    >
      <ChevronDown
        class={cn(
          "h-4 w-4 transition-transform duration-200",
          isExpanded && "rotate-180"
        )}
      />
      <span class="text-sm font-medium">{title}</span>
    </button>

    <div class="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        class="h-8 w-8"
        on:click={copyToClipboard}
      >
        {#if isCopied}
          <Check class="h-4 w-4 text-green-500" />
        {:else}
          <Copy class="h-4 w-4" />
        {/if}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        class="h-8 w-8"
        on:click={onClose}
      >
        <X class="h-4 w-4" />
      </Button>
    </div>
  </div>

  <!-- Content -->
  {#if isExpanded}
    <div 
      class="p-4"
      transition:slide={{ duration: 150 }}
    >
      <pre class="text-sm font-mono whitespace-pre-wrap break-words text-muted-foreground">{code}</pre>
    </div>
  {/if}
</div>