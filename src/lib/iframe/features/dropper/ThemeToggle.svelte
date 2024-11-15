<!-- $lib/iframe/features/dropper/ThemeToggle.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import { createEventDispatcher } from 'svelte';

  export let theme: 'light' | 'dark' = 'light';
  export let disabled = false;

  const dispatch = createEventDispatcher();

  $: buttonClass = cn(
    // Base styles
    "h-8 w-8 transition-all duration-150",
    "border rounded-full",
    "hover:shadow-sm active:scale-95",

    // Theme-specific styles
    theme === 'light' 
      ? "bg-transparent border-dashed border-gray-400 hover:border-primary/60 hover:bg-gray-50/50"
      : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:border-primary",

    // States
    disabled && "opacity-50 cursor-not-allowed pointer-events-none"
  );

  const nextTheme = theme === 'light' ? 'dark' : 'light';
</script>

<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <Button
      variant="ghost"
      class={buttonClass}
      {disabled}
      on:click={() => dispatch('click')}
    >
      {#if theme === 'light'}
        <div class="w-3 h-3 border border-dashed border-gray-400 rounded"></div>
      {:else}
        <div class="w-3 h-3 bg-gray-900 dark:bg-white rounded border border-gray-300 dark:border-gray-600"></div>
      {/if}
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Content>
    <p>Switch to {nextTheme} theme</p>
  </Tooltip.Content>
</Tooltip.Root>