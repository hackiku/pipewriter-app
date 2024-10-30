<!-- lib/app/elements/base/Element.svelte -->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { selectedElement } from '../../stores/editor';
  import { fade } from 'svelte/transition';
  import { cn } from '$lib/utils';
  
  export let element: {
    id: string;
    type: string;
    props: Record<string, any>;
  };
  
  const dispatch = createEventDispatcher();
  
  $: isSelected = $selectedElement === element.id;
  
  function handleSelect() {
    dispatch('select', element);
  }
</script>

<div
  class={cn(
    "relative group transition-all duration-200",
    "hover:ring-2 hover:ring-primary/50",
    isSelected && "ring-2 ring-primary"
  )}
  on:click|stopPropagation={handleSelect}
  transition:fade
>
  <!-- Element Controls -->
  {#if isSelected}
    <div class="absolute top-2 right-2 flex gap-1 z-10" transition:fade>
      <slot name="controls" />
    </div>
  {/if}
  
  <!-- Element Content -->
  <div class="element-content">
    <slot {isSelected} />
  </div>
</div>

<style>
  .element-content {
    position: relative;
  }
  
  .element-content::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: background-color 0.2s;
  }
  
  :global(.preview) .element-content::after {
    display: none;
  }
</style>