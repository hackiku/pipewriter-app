<!-- src/lib/pages/demo/Dropper.svelte -->
<script lang="ts">
  import ElementCard from "./ElementCard.svelte";
  import { elements } from "$lib/iframe/elements";
  
  export let onSelect: (elementId: string) => void;

  const clickableElements = [
    'blurbs-3',
    'zz-left',
    'zz-right',
    'hero',
    'button-left',
    'cards-2'
  ];

  // Get unique elements for the grid
  const uniqueElements = [...new Set(Object.values(elements))]
    .filter(el => !el.id.startsWith('container-') && !el.id.startsWith('background-'))
    .slice(0, 12);
  
  $: activeElements = uniqueElements.slice(0, 6);  // First 2 rows
  $: previewElements = uniqueElements.slice(6);    // Last 2 rows
</script>

<div class="w-[28em] h-[50vh] p-4">
  <!-- Active elements (first 2 rows) -->
  <div class="grid grid-cols-3 gap-2">
    {#each activeElements as element (element.id)}
      <ElementCard 
        {element}
        {onSelect}
        disabled={!clickableElements.includes(element.id)}
      />
    {/each}
  </div>

  <!-- Preview elements with gradient -->
  <div class="relative mt-2">
    <div class="grid grid-cols-3 gap-2">
      {#each previewElements as element (element.id)}
        <ElementCard 
          {element}
          {onSelect}
          disabled={true}
        />
      {/each}
    </div>
    
    <!-- Gradient overlay -->
    <div 
      class="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none"
      style="top: -60px;"
    />
  </div>
</div>