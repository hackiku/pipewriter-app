<!-- $lib/app/ElementsDropper.svelte -->

<script>
  import { zenMode , darkMode , showLabels } from '$lib/stores';
  import { userStore } from '$lib/stores/auth.js';
  import { isSubscribed } from '$lib/stores/subscriptionStore.js';
  import { getElement } from '$lib/app/elements.js';
  import { createEventDispatcher } from 'svelte';

  // FIXME: what is this variable for?
  export let darkModeSidebar;

  export let elements;
  export let callGAS;

  const dispatch = createEventDispatcher();

  $: groupedByCategory = Object.values(elements).reduce((acc, el) => {
    // Initialize the category array if it doesn't exist
    if (!acc[el.category]) acc[el.category] = [];
    if ((darkModeSidebar && el.theme === 'dark') || (!darkModeSidebar && el.theme === 'light')) {
      acc[el.category].push(el);
    }
    return acc;
  }, {});

  function selectElement(elementId) {
    const element = getElement(elementId);
    callGAS('getElement', { elementId: element.id, pro: element.pro });
    dispatch('elementSelected', { elementId: element.id, pro: element.pro });
  }
</script>

<!-- ----------------------------------------------------------------- -->
<!-- --------------------- wireframe --------------------------------- -->
<!-- ----------------------------------------------------------------- -->

<!-- <div class="space-y-20"> -->

{#each Object.entries(groupedByCategory) as [category, elements]}
  <div class="category-section">
    {#if $showLabels}
      <h3 class="text-xs font-normal text-gray-400 mb-1">{category.replace('-', ' ')}</h3>
    {/if}
    <div class="grid grid-cols-3 gap-2">
      {#each elements as { id, src, alt, description, pro } (id)}
        <!-- TODO elements navigation with keyboard -->
        <button
          class="element image relative cursor-copy"
          on:click={() => selectElement(id)}
          title={description}
        >
          {#if pro}
            <div
              class="
                absolute top-0 right-0 z-30 text-white
                text-xs px-1 rounded-bl-md rounded-tr-md"
            >
              <img src="app/star.svg" alt="" />
              <!-- TODO add effect if isSubscribed == false -->
              <div class="bg-brandBlue w-full h-full hover:absolute"></div>
            </div>
          {/if}
          <img class="" {src} {alt} />
          </button>
      {/each}
    </div>
  </div>
{/each}




<!-- -------------- <style> --------------  -->

<style>
  :root {
    --bg-color-light: #877171;
    --bg-color-dark: #1a202c;
  }

  .image {
    transition: transform 0.2s ease-in-out;
  }
  .image:hover {
    transform: translateX(-8%) rotate(-10deg);
    transform-origin: bottom left;
  }
</style>
