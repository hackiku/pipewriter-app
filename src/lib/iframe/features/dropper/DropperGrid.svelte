<!-- $lib/iframe/features/dropper/DropperGrid.svelte -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ElementCard from "../../components/ElementCard.svelte";
  import { showInfo } from "../../stores";
  import { dropperStore, dropperStatus } from "../../stores/dropperStore";
  import { gridStore, gridClass } from "../../stores/gridStore";
  import { elementsThemeStore } from "../../stores/elementsThemeStore";
  import { groupByCategory } from "./elements/elements";

  export let isProcessing = false;
  
  const dispatch = createEventDispatcher();

  $: categories = groupByCategory($elementsThemeStore);

  async function handleElementSelect(elementId: string) {
    if (!isProcessing && !$dropperStatus.isProcessing) {
      dispatch("elementSelect", { elementId });
    }
  }
</script>

<div class="space-y-4">
  {#each Object.entries(categories) as [category, elements]}
    <section>
      {#if $showInfo}
        <h3 class="text-xs font-normal text-gray-400 mb-2">
          {category.replace("-", " ")}
        </h3>
      {/if}
      
      <div class="grid {$gridClass.grid} {$gridClass.gap} {$gridClass.padding}">
        {#each elements as element}
          <ElementCard
            {element}
            onSelect={handleElementSelect}
            theme={$elementsThemeStore}
            disabled={isProcessing || $dropperStatus.isProcessing}
          />
        {/each}
      </div>
    </section>
  {/each}
</div>