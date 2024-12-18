<!-- src/lib/pages/demo/Dropper.svelte -->
<script lang="ts">
  import ElementCard from "./ElementCard.svelte";
  import { elements } from "$lib/iframe/elements";
  import { Save } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  
  export let onSelect: (elementId: string) => void;

  // Get exactly 12 unique elements for our grid
  const gridElements = Object.values(elements)
    .filter(el => !el.id.startsWith('container-') && !el.id.startsWith('background-'))
    // Filter out elements with -dark in their IDs
    .filter(el => !el.id.includes('-dark'))
    // Ensure we just get one variant of each element
    .filter((el, index, arr) => index === arr.findIndex(x => x.id === el.id))
    .slice(0, 12);
</script>

<div class="w-[24em] h-[40vh] md:h-[40vh] pb-2 backdrop-blur-xl rounded-xl">
  <!-- All elements in one grid -->
  <div class="relative">
    <div class="grid grid-cols-3 gap-2">
      {#each gridElements as element (element.id)}
        <ElementCard 
          {element}
          onSelect={() => onSelect(element.id)}
        />
      {/each}
    </div>

    <!-- Strong fade gradient -->
    <div 
      class="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-auto bg-gradient-to-b from-transparent via-background/80 to-background"
    />
    <!-- Save button -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 pb-4">
      <Button variant="outline" size="sm">
        <Save class="w-4 h-4 mr-2" />
        Save to Doc
      </Button>
    </div>
  </div>
</div>