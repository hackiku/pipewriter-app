<!-- features/dropper/DropperGrid.svelte -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ElementCard from "../../components/ElementCard.svelte";
  import { showInfo } from "../../stores";
  import { gridStore } from "../../stores/gridStore";
  import { groupByCategory, type ThemeType } from "./elements/elements";

  export let theme: ThemeType;
  export let isProcessing = false;

  const dispatch = createEventDispatcher();

  $: categories = groupByCategory(theme);

  function handleElementClick(elementId: string) {
    if (!isProcessing) {
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
      
      <div class="grid {$gridStore.grid} {$gridStore.gap}">
        {#each elements as element}
          <ElementCard
            {element}
            onSelect={handleElementClick}
            theme={theme}
            disabled={isProcessing}
          />
        {/each}
      </div>
    </section>
  {/each}
</div>