<!-- $lib/iframe/layout/dropper/DropperGrid.svelte -->
<script lang="ts">
  import { showInfo } from "../../stores";
  import type { ElementObject } from "../../elements";
  import { gridClass } from "../../stores/gridStore";
  import ElementCard from "../../components/ElementCard.svelte";
	import { groupByCategory, type ThemeType } from './elements/elements';

  // export let elements: ElementObject[] = [];
  // export let category: string = "";
  // export let onElementSelect: (elementId: string) => Promise<void>;

	// NEW ELEMENTS
	export let theme: ThemeType;
	$: categories = groupByCategory(theme);


  let isProcessing = false;

  function handleProcessingStart() {
    isProcessing = true;
  }

  function handleProcessingEnd() {
    isProcessing = false;
  }
</script>

<div class="category-section mb-2">
  <!-- {#if $showInfo}
    <h3 class="text-xs font-normal text-gray-400 mb-1">
      {category.replace("-", " ")}
    </h3>
  {/if} -->
  
  <div class="grid {$gridClass.grid} {$gridClass.gap} {$gridClass.padding}">
		{#each Object.entries(categories) as [category, elements]}
			<section>
				<h3>{category}</h3>
				<div class="grid">
					{#each elements as element}
						<ElementCard {element} />
					{/each}
				</div>
			</section>
		{/each}
  </div>
</div>