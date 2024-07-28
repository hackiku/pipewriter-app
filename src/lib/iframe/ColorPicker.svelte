<!-- $lib/iframe/ColorPicker.svelte -->
<script lang="ts">
  import { getElement } from '$lib/iframe/elements.ts'; 
  import { createEventDispatcher } from 'svelte';
  import { showLabels } from '$lib/iframe/stores';
  // import { Eyedropper } from 'lucide-svelte';
  import { Eye } from 'lucide-svelte';
  import type { ElementObject } from '$lib/iframe/elements.ts'; 

  // Mock data for elements
  const mockElements: Record<string, ElementObject> = {
    element1: { id: 'element1', category: 'category1', theme: 'theme1', src: 'src1', alt: 'alt1', description: 'description1' },
    element2: { id: 'element2', category: 'category2', theme: 'theme2', src: 'src2', alt: 'alt2', description: 'description2' },
  };

  // Mock function for callGAS
  function mockCallGAS(action: string, params: Record<string, any>) {
    console.log(`Action: ${action}`, params);
  }

  export let elements: Record<string, ElementObject> = mockElements;
  export let callGAS: (action: string, params: Record<string, any>) => void = mockCallGAS;

  const dispatch = createEventDispatcher();

  $: groupedByCategory = elements ? Object.values(elements).reduce((acc, el) => {
    if (!acc[el.category]) acc[el.category] = [];
    acc[el.category].push(el);
    return acc;
  }, {} as Record<string, ElementObject[]>) : {};

  function selectElement(elementId: string) {
    const element = getElement(elementId);
    if (element) {
      callGAS('getElement', { elementId: element.id });
      dispatch('elementSelected', { elementId: element.id });
    }
  }
</script>

<!-- ------------------------- STYLE ------------------------ -->
<section class="flex-shrink relative">
  {#if $showLabels}
    <div class="title-row">
      <h2>Style</h2>
      <img src="app/chevron-right-solid.svg" alt="" class="h-3 ml-auto">
    </div>
  {/if}

  <!-- Style guide row -->
  <div class="flex justify-between items-center w-full mb-4">
    <div class="flex gap-2">
      <button
        on:click={() => callGAS('getElement', { elementId: 'styleguide' })}
        class="w-7 h-7 bg-gray-200 rounded-full border border-gray-300
        shadow-md hover:shadow-blue-300 hover:border-brandBlue transition-all"
        title="Style Guide"
      >
        <Eye class="h-4 w-4 text-gray-700 mx-auto" />
      </button>
    </div>
  </div>

  <!-- Color picker row -->
  <div class="flex justify-center items-center w-full gap-2">
    <button
      on:click={() => callGAS('changeBg', { color: '#ffffff' })}
      class="w-8 h-8 bg-white rounded-full border-2 border-gray-300 hover:border-brandBlue transition-all"
      title="White"
    ></button>
    <button
      on:click={() => callGAS('changeBg', { color: '#f3f3f3' })}
      class="w-8 h-8 bg-[#f3f3f3] rounded-full border-2 border-gray-300 hover:border-brandBlue transition-all"
      title="Light Gray"
    ></button>
    <button
      on:click={() => callGAS('changeBg', { color: '#cccccc' })}
      class="w-8 h-8 bg-[#cccccc] rounded-full border-2 border-gray-300 hover:border-brandBlue transition-all"
      title="Gray"
    ></button>
    <button
      on:click={() => callGAS('changeBg', { color: '#0a0a0a' })}
      class="w-8 h-8 bg-[#0a0a0a] rounded-full border-2 border-gray-300 hover:border-brandBlue transition-all"
      title="Dark Gray"
    ></button>
    <button
      class="w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-300 hover:border-brandBlue transition-all"
      title="Color Picker Placeholder"
    ></button>
  </div>

  <hr class="border-1 border-gray-500 opacity-20 mt-4" />
</section>

<style>
  .title-row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .title-row h2 {
    margin: 0;
  }

  .title-row img {
    margin-left: auto;
  }
</style>
