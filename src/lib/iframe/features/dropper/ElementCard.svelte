<!-- $lib/iframe/features/dropper/ElementCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import type { ElementObject } from "../features/dropper/elements/elements";
  import type { ElementsTheme } from "../features/dropper/elements/elements";
  import { onMount, createEventDispatcher } from 'svelte';
  import { X } from 'lucide-svelte';

  export let element: ElementObject;
  export let onSelect: (id: string) => void;
  export let theme: ElementsTheme;
  export let disabled = false;
  export let isSelected = false;

  const dispatch = createEventDispatcher();
  let mounted = false;
  let isProcessing = false;

  onMount(() => {
    mounted = true;
  });

  async function handleClick() {
    if (disabled || isProcessing) return;
    isProcessing = true;
    dispatch('processingStart');
    
    try {
      await onSelect(element.id);
    } finally {
      isProcessing = false;
      dispatch('processingEnd');
    }
  }

  // Theme-specific styles including container (commented for later)
  const themeStyles = {
    light: "bg-white dark:bg-black border border-gray-300 dark:border-gray-700/80",
    dark: "bg-slate-950 dark:bg-white border border-gray-300",
    // container: "bg-white border-[0.16em] border-dashed border-gray-500",
  };

  // Base button styles including neo-brutalist hover effects
  const baseButtonClasses = cn(
    "group relative w-full h-full p-0 rounded-lg overflow-hidden",
    "transition-all duration-200 ease-out cursor-pointer",
    "hover:-translate-y-1 hover:-translate-x-1 hover:rotate-[-2deg]",
    "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.7)]",
    "active:translate-y-0 active:translate-x-0 active:shadow-none"
  );

  // Dynamic classes
  $: buttonClass = cn(
    baseButtonClasses,
    themeClass,
    isSelected && "ring-2 ring-primary ring-offset-2",
    (disabled || isProcessing) && "opacity-90 cursor-not-allowed pointer-events-none",
  );

  $: themeClass = mounted ? cn(themeStyles[theme]) : themeStyles[theme];
  
  // $: imgSrc = theme === 'dark' && element.id.includes('-dark')
  // $: imgSrc = element.id.includes('-dark')
  $: imgSrc = theme === 'dark'
    ? `elements/${element.id}.svg`
    : `elements/${element.id}.svg`;
  // $: shouldInvert = theme === 'dark' && !element.id.includes('-dark');

	// $: imgSrc = theme === 'dark' && element.id.includes('-dark')
  //   ? `elements/${element.id}.svg`
  //   : `elements/${element.id.replace('-dark', '')}.svg`;
  // $: shouldInvert = theme === 'dark' && !element.id.includes('-dark');
</script>

<div class="relative">
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <Button
        variant="ghost"
        class={buttonClass}
        on:click={handleClick}
        {disabled}
      >
            <!-- class={cn(
              "w-full h-full object-cover transition-opacity duration-200", 
              shouldInvert && "opacity-40",
              "group-hover:opacity-80"
            )} -->
        <!-- Image container -->
        <div class="relative w-full h-full">
          <img
            src={imgSrc}
            alt={element.alt}
						class="
              w-full h-full object-cover transition-opacity duration-200, 
              dark:opacity-80 group-hover:opacity-40
            "

          />
          
          <!-- blinking cursor -->
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity">
            <div class="w-2 h-8 bg-black/80 dark:bg-white/80 animate-cursor" />
          </div>

          <!-- Processing overlay -->
          {#if isProcessing}
            <div class="absolute inset-0 flex items-center justify-center bg-black/50">
              <X class="text-white animate-spin" size={24} />
            </div>
          {/if}
        </div>
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>{element.description}</p>
    </Tooltip.Content>
  </Tooltip.Root>
</div>

<style>
  /* Prevent image dragging */
  img {
    -webkit-user-drag: none;
    user-select: none;
  }

  /* Custom blinking cursor animation */
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .animate-cursor {
    animation: blink 1s step-end infinite;
  }

  /* Dark theme adjustments */
  :global(.dark) .animate-cursor {
    animation: blink 1s step-end infinite;
  }
</style>