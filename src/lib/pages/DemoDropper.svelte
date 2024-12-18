<script lang="ts">
  import DemoElementCard from "./DemoElementCard.svelte";
  import { elements } from "$lib/iframe/elements";

  export let columns = 3;
  export let rows = 3;
  export let maxWidth = "500px";

  // Select a subset of elements for the demo
  const demoElements = Object.values(elements).slice(0, columns * rows * 2);

  $: gridClass = `grid-cols-${columns}`;
</script>

<div class="relative w-full h-full" style="max-width: {maxWidth};">
  <!-- Bottom Fade Gradient -->
  <div 
    class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-10"
  />
  
  <!-- Grid Container -->
  <div class="space-y-2 pb-10 overflow-hidden" style="max-height: calc({rows} * 120px);">
    <div class={`grid ${gridClass} gap-2 pr-4`}>
      {#each demoElements as element (element.id)}
        <DemoElementCard {element} />
      {/each}
    </div>
  </div>
</div>

<style>
  /* Add any additional styles here */
</style>