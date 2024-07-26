<!-- lib/controls/ElementsDropper.svelte -->

<script>
  import { createEventDispatcher } from 'svelte';

  export let elements = [];

  const dispatch = createEventDispatcher();

  // Get the first 6 elements
  $: limitedElements = elements.slice(0, 6);

  // Handle element selection
  function selectElement(elementId) {
    const element = elements.find(el => el.id === elementId);
    dispatch('elementSelected', { elementId: element.id });
  }
</script>

<div class="grid grid-cols-2 gap-2">
  {#each limitedElements as { id, src, alt, description } (id)}
    <button
      class="element image relative cursor-copy"
      on:click={() => selectElement(id)}
      title={description}
    >
      <img src={src} alt={alt} />
    </button>
  {/each}
</div>

<style>
  .image {
    transition: transform 0.2s ease-in-out;
  }
  .image:hover {
    transform: translateX(-8%) rotate(-10deg);
    transform-origin: bottom left;
  }
</style>
