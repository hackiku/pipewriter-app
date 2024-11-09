<!-- $lib/iframe/components/ElementCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import type { ElementObject } from "../elements";
  import type { ElementsTheme } from "../stores/elementsThemeStore";
  import { onMount, createEventDispatcher } from 'svelte';
  import HoverCursor from './HoverCursor.svelte';
  import { X } from 'lucide-svelte';

  export let element: ElementObject;
  export let onSelect: (id: string) => void;
  export let theme: ElementsTheme;  // Updated type

  const dispatch = createEventDispatcher();
  let mounted = false;
  let isProcessing = false;
  let showHoverCursor = false;

  onMount(() => {
    mounted = true;
  });

  async function handleClick() {
    showHoverCursor = false;
    isProcessing = true;
    dispatch('processingStart');
    
    try {
      await onSelect(element.id);
    } finally {
      isProcessing = false;
      dispatch('processingEnd');
    }
  }

  const themeStyles = {
    white: "bg-white border-solid border-gray-200",
    gray: "bg-gray-100 border-gray-200",
    dark: "bg-gray-900 border-gray-700"
  };

  $: themeClass = mounted ? cn(themeStyles[theme]) : themeStyles[theme];
  $: imgSrc = theme === 'dark' && element.id.includes('-dark')
    ? `elements/${element.id}.svg`
    : `elements/${element.id.replace('-dark', '')}.svg`;
  $: shouldInvert = theme === 'dark' && !element.id.includes('-dark');

  const baseButtonClasses = "group relative w-full h-full p-0 rounded-lg overflow-hidden border transition-all duration-200 ease-in-out hover:translate-x-[-8%] hover:rotate-[-10deg] hover:shadow-md origin-bottom-left";
</script>

<div class="relative">
  <div 
    class="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 pointer-events-none
           group-hover:opacity-100 border-2 border-dashed
           dark:border-gray-700 border-gray-300"
  />
  
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <Button
        variant="ghost"
        class={mounted ? cn(
          baseButtonClasses, 
          themeClass,
          "dark:bg-white dark:hover:bg-white"
        ) : `${baseButtonClasses} ${themeClass}`}
        on:click={handleClick}
        on:mouseenter={() => showHoverCursor = true}
        on:mouseleave={() => showHoverCursor = false}
        disabled={isProcessing}
      >
        <img
          src={imgSrc}
          alt={element.alt}
          class={mounted 
            ? cn(
                "w-full h-full object-cover", 
                shouldInvert && "opacity-50 invert",
                "dark:bg-white"
              )
            : `w-full h-full object-cover ${shouldInvert ? 'opacity-50 invert' : ''}`}
        />
        <HoverCursor visible={showHoverCursor && !isProcessing} />
        {#if isProcessing}
          <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <X class="text-white animate-spin" size={24} />
          </div>
        {/if}
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>{element.description}</p>
    </Tooltip.Content>
  </Tooltip.Root>
</div>

<style>
  :global(button:focus) {
    outline: none;
  }
  
  :global(.group) {
    z-index: 1;
  }
  
  :global(.group:hover) {
    z-index: 2;
  }
</style>