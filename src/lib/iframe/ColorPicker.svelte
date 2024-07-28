<!-- $lib/iframe/ColorPicker.svelte -->
<script lang="ts">
  import { getElement } from '$lib/iframe/elements.ts'; 
  import { createEventDispatcher } from 'svelte';
  import { showLabels } from '$lib/iframe/stores';
  import { Type } from 'lucide-svelte';
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

  const colors = [
    { color: '#ffffff', title: 'White' },
    { color: '#f3f3f3', title: 'Light Gray' },
    { color: '#cccccc', title: 'Gray' },
    { color: '#0a0a0a', title: 'Dark Gray' },
  ];
</script>

<!-- ------------------------- STYLE ------------------------ -->
<section class="flex-shrink relative">
  {#if $showLabels}
    <div class="title-row">
      <h2>Style</h2>
      <img src="app/chevron-right-solid.svg" alt="" class="h-3 ml-auto">
    </div>
  {/if}


  <!-- Color picker row -->
  <div class="flex justify-center items-center w-full gap-2">
     {#each colors as { color, title }}
      <button
        on:click={() => callGAS('changeBg', { color })}
        class="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-brandBlue transition-all"
        title={title}
        style="background-color: {color};"
      ></button>
    {/each}
    <button
      class="w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-300 hover:border-brandBlue transition-all"
      title="Color Picker Placeholder"
    ></button>
  </div>

  <!-- Style guide row -->
  <div class="flex justify-between items-center w-full mb-4">
    <div class="flex gap-2">
      <button
        on:click={() => callGAS('getElement', { elementId: 'styleguide' })}
        class="w-7 h-7 bg-gray-500 rounded-full border border-gray-400
        shadow-md hover:shadow-blue-300 hover:border-brandBlue transition-all"
        title="Style Guide"
      >
        <Type class="h-4 w-4 text-gray-700 mx-auto" />
      </button>
    </div>
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
