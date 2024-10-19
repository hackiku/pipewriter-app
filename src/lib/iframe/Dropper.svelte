<!-- $lib/iframe/Dropper.svelte -->

<script lang="ts">
  import { getElement } from './elements.ts';
  import type { ElementObject } from './elements.ts';
  import { createEventDispatcher } from 'svelte';
  import ElementCard from './components/ElementCard.svelte';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "$lib/components/ui/select";
  import { showInfo } from './stores';

  export let elements: Record<string, ElementObject>;
  export let callGAS: (action: string, params: Record<string, any>) => void;

  const dispatch = createEventDispatcher();

  let selectedTheme = 'light';

  $: filteredElements = Object.values(elements).filter(el => el.theme === selectedTheme);

  $: groupedByCategory = filteredElements.reduce((acc, el) => {
    if (!acc[el.category]) acc[el.category] = [];
    acc[el.category].push(el);
    return acc;
  }, {} as Record<string, ElementObject[]>);

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
  }
</script>

<div class="mb-4">
  <Select bind:value={selectedTheme}>
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select theme" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
    </SelectContent>
  </Select>
</div>

{#if Object.entries(groupedByCategory).length > 0}
  {#each Object.entries(groupedByCategory) as [category, categoryElements]}
    <div class="category-section mb-4">
      {#if $showInfo}
        <h3 class="text-xs font-normal text-gray-400 mb-1">{category.replace('-', ' ')}</h3>
      {/if}
      <div class="grid grid-cols-3 gap-2">
        {#each categoryElements as element (element.id)}
          <ElementCard {element} onSelect={selectElement} />
        {/each}
      </div>
    </div>
  {/each}
{:else}
  <p>No elements available for the current theme.</p>
{/if}