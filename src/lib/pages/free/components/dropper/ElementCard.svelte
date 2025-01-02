<!-- components/dropper/ElementCard.svelte -->
<script lang="ts">
  import type { ElementConfig } from '../../types';
  import { fade } from 'svelte/transition';
  
  export let element: ElementConfig;
  export let onSelect: (() => void) | undefined = undefined;
  export let isActive = false;
  export let disabled = false;

  const baseClasses = "relative group p-3 rounded-lg border transition-all duration-200";
  const activeClasses = "border-primary/50 bg-primary/5";
  const hoverClasses = "hover:border-primary/30 hover:bg-primary/5";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  $: classes = [
    baseClasses,
    isActive ? activeClasses : !disabled ? hoverClasses : '',
    disabled ? disabledClasses : 'cursor-pointer'
  ].join(' ');
</script>

<div 
  class={classes}
  on:click={!disabled ? onSelect : undefined}
  in:fade={{ duration: 200 }}
>
  <div class="flex flex-col gap-1.5">
    <!-- Icon -->
    <div class="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
      <svelte:component 
        this={element.icon} 
        class="w-4 h-4 text-primary" 
      />
    </div>
    
    <!-- Label -->
    <span class="text-xs font-medium">
      {element.label}
    </span>
  </div>

  {#if !disabled}
    <div class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
    </div>
  {/if}
</div>