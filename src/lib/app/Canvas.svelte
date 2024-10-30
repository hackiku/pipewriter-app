<!-- lib/app/Canvas.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { elements, canvasElements } from './stores/elements';
  import { editorMode } from './stores/editor';
  import Hero from './elements/sections/Hero.svelte';
  import Blurbs from './elements/sections/Blurbs.svelte';
  import ZigZag from './elements/sections/ZigZag.svelte';
  import { cn } from '$lib/utils';

  // Element type to component mapping
  const elementComponents = {
    hero: Hero,
    blurbs: Blurbs,
    zigzag: ZigZag,
  };

  function handleDragOver(event: DragEvent) {
    if (!event.dataTransfer) return;
    
    // Only accept our custom type
    if (Array.from(event.dataTransfer.types).includes('application/pipewriter')) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    if (!event.dataTransfer) return;

    const elementId = event.dataTransfer.getData('application/pipewriter');
    if (!elementId) return;

    elements.addInstance(elementId);
  }
</script>

<div 
  class={cn(
    "flex-1 min-h-screen p-4",
    $editorMode === 'preview' && "bg-background"
  )}
  on:dragover={handleDragOver}
  on:drop={handleDrop}
>
  {#if $canvasElements.length === 0}
    <div 
      class="h-32 border-2 border-dashed border-muted-foreground/20 rounded-lg
             flex items-center justify-center text-muted-foreground"
    >
      Drag elements here
    </div>
  {:else}
    {#each $canvasElements as element (element.id)}
      <div class="my-8" transition:fade>
        <svelte:component 
          this={elementComponents[element.type]} 
          {element}
        />
      </div>
    {/each}
  {/if}
</div>