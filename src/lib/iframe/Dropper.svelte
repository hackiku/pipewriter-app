<!-- $lib/iframe/ElementCard.svelte -->

<script lang="ts">
  import { getElement } from '$lib/iframe/elements.ts'; 
  import { createEventDispatcher } from 'svelte';
  import type { ElementObject } from '$lib/iframe/elements.ts'; 

  export let elements: Record<string, ElementObject>;
  export let callGAS: (action: string, params: Record<string, any>) => void;

  const dispatch = createEventDispatcher();

  $: groupedByCategory = elements ? Object.values(elements).reduce((acc, el) => {
    if (!acc[el.category]) acc[el.category] = [];
    acc[el.category].push(el);
    return acc;
  }, {} as Record<string, ElementObject[]>) : {};

async function selectElement(elementId: string) {
  console.log(`Selecting element: ${elementId}`);
  const element = getElement(elementId);
  if (element) {
    try {
      const result = await callGAS('getElement', { elementId: element.id });
      console.log(`Element fetched successfully: ${elementId}`, result);
      dispatch('elementSelected', { elementId: element.id, result });
    } catch (error) {
      console.error(`Failed to fetch element: ${elementId}`, error);
      if (error.message.includes("Action not allowed")) {
        console.warn("This may be due to a permission issue in Google Apps Script.");
      }
      dispatch('elementError', { elementId: element.id, error: error.message });
    }
  } else {
    console.error(`Element not found: ${elementId}`);
  }
}</script>

{#if Object.entries(groupedByCategory).length > 0}
  {#each Object.entries(groupedByCategory) as [category, categoryElements]}
    <div class="category-section">
      <h3 class="text-xs font-normal text-gray-400 mb-1">{category.replace('-', ' ')}</h3>
      <div class="grid grid-cols-3 gap-2">
        {#each categoryElements as { id, src, alt, description } (id)}
          <button
            class="element image relative cursor-copy"
            on:click={() => selectElement(id)}
            title={description}
          >
            <img {src} {alt} />
          </button>
        {/each}
      </div>
    </div>
  {/each}
{:else}
  <p>No elements available.</p>
{/if}

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