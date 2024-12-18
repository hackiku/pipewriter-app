<!-- src/lib/pages/DemoDropper.svelte -->
<script lang="ts">
  import DemoElementCard from "./DemoElementCard.svelte";
  import { elements } from "$lib/iframe/elements";

  export let columns = 3;
  export let rows = 3;
  export let maxWidth = "500px";

  const clickableElements = [
    'hero',
    'zz-left',
    'zz-right',
    'blurbs-3',
    'button-left',
    'cards-2'
  ];

  const demoElements = Object.values(elements)
    .filter(element => !element.id.startsWith('container-') && !element.id.startsWith('background-'))
    .slice(0, columns * rows * 2);

  $: gridClass = `grid-cols-${columns}`;

  function handleElementSelect(elementId: string) {
    if (clickableElements.includes(elementId)) {
      console.log(`Element ${elementId} clicked`);
      // Add your logic here for handling clickable elements
    }
  }
</script>

<div class="relative w-full h-full" style="max-width: {maxWidth};">
  <div 
    class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-10"
  />
  
  <div class="space-y-2 pb-10 overflow-hidden" style="max-height: calc({rows} * 120px);">
    <div class={`grid ${gridClass} gap-2 pr-4`}>
      {#each demoElements as element (element.id)}
        <DemoElementCard 
          {element} 
          onSelect={handleElementSelect}
          disabled={!clickableElements.includes(element.id)}
        />
      {/each}
    </div>
  </div>
</div>