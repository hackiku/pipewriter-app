<!-- $lib/pages/demo/Dropper.svelte -->
<script lang="ts">
  import ElementCard from "./ElementCard.svelte";
  import { elements } from "$lib/iframe/elements";
  import { Save } from "lucide-svelte";
  import FreeForm from "$lib/components/free/FreeForm.svelte";
  import ExportButton from "$lib/components/free/ExportButton.svelte";
  
  export let onSelect: (elementId: string) => void;

  const gridElements = Object.values(elements)
    .filter(el => !el.id.startsWith('container-') && !el.id.startsWith('background-'))
    .filter(el => !el.id.includes('-dark'))
    .filter((el, index, arr) => index === arr.findIndex(x => x.id === el.id))
    .slice(0, 12);
</script>

<div class="w-[24em] h-[40vh] md:h-[40vh] pb-2 backdrop-blur-xl rounded-xl">
  <div class="relative">
    <div class="grid grid-cols-3 gap-2">
      {#each gridElements as element (element.id)}
        <ElementCard 
          {element}
          onSelect={() => onSelect(element.id)}
        />
      {/each}
    </div>

    <!-- Fade gradient -->
    <div 
      class="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-auto bg-gradient-to-b from-transparent via-background/80 to-background"
    />
    
    <!-- Export and Reset buttons -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-4 pb-4">
      <ExportButton 
        text="Export"
        icon={Save}
        showReset={true}
      />
    </div>
  </div>
</div>