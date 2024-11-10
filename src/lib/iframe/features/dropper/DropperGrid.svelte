<!-- $lib/iframe/layout/dropper/DropperGrid.svelte -->
<script lang="ts">
  import { showInfo } from "../../stores";
  import type { ElementObject } from "../../elements";
  import { gridClass } from "../../stores/gridStore";
  import ElementCard from "../../components/ElementCard.svelte";

  export let elements: ElementObject[] = [];
  export let category: string = "";
  export let onElementSelect: (elementId: string) => Promise<void>;
  
  let isProcessing = false;

  function handleProcessingStart() {
    isProcessing = true;
  }

  function handleProcessingEnd() {
    isProcessing = false;
  }
</script>

<div class="category-section mb-2">
  {#if $showInfo}
    <h3 class="text-xs font-normal text-gray-400 mb-1">
      {category.replace("-", " ")}
    </h3>
  {/if}
  
  <div class="grid {$gridClass.grid} {$gridClass.gap} {$gridClass.padding}">
    {#each elements as element (element.id)}
      <ElementCard
        {element}
        onSelect={onElementSelect}
        on:processingStart={handleProcessingStart}
        on:processingEnd={handleProcessingEnd}
      />
    {/each}
  </div>
</div>