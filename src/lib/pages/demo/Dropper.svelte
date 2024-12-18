<!-- src/lib/pages/demo/Dropper.svelte -->
<script lang="ts">
  import ElementCard from "./ElementCard.svelte";
  import { elements } from "$lib/iframe/elements";
  import { Save } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  
  export let onSelect: (elementId: string) => void;

  // Filter unique elements first and avoid duplicates
  const uniqueElements = Object.values(elements)
    .filter(el => !el.id.startsWith('container-') && !el.id.startsWith('background-'))
    .reduce((acc, current) => {
      const exists = acc.find(item => item.id === current.id);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, [])
    .slice(0, 12);
  
  $: activeElements = uniqueElements.slice(0, 6);
  $: previewElements = uniqueElements.slice(6);
</script>

<div class="w-[25em] h-[50vh] p-4">
  <!-- Active elements (first 2 rows) -->
  <div class="grid grid-cols-3 gap-2">
    {#each activeElements as element (element.id)}
      <ElementCard 
        {element}
        {onSelect}
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
    
    <!-- True transparency gradient -->
    <div 
      class="absolute inset-0 pointer-events-none"
      style="top: -60px; -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 100%);"
    />

    <!-- Save button -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 pb-4">
      <Button variant="outline" size="sm">
        <Save class="w-4 h-4 mr-2" />
        Save
      </Button>
    </div>
  </div>
</div>