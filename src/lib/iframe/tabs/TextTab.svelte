<!-- $lib/iframe/components/TextTab.svelte -->

<script lang="ts">
  import { getElement } from '../elements';
  import ElementCard from "../components/ElementCard.svelte";
  import OutlineButton from "../components/OutlineButton.svelte";
  import { Type, Heading } from 'lucide-svelte';
  import { callGAS } from '../utils';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const elementId = "styleguide";
  const element = getElement(elementId);

  async function selectElement(id: string) {
    dispatch('processingStart');
    try {
      await callGAS("getElement", { elementId: id });
    } catch (error) {
      console.error("Error selecting element:", error);
    } finally {
      dispatch('processingEnd');
    }
  }
</script>

<div class="flex gap-4 h-full items-center">
  <div class="w-2/5">
    {#if element}
      <ElementCard 
        element={element} 
        onSelect={selectElement}
        borderColor="border-gray-200"
        borderWidth="border"
      />
    {:else}
      <div class="w-full h-full bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">Element not found</span>
      </div>
    {/if}
  </div>
  
  <div class="flex flex-col h-full w-3/5 gap-2 justify-center">
    <OutlineButton
      icon={Type}
      label="Style Guide"
      onClick={() => selectElement("styleguide")}
    />
    <OutlineButton
      icon={Heading}
      label="Update Heading"
      onClick={() => callGAS("updateHeading", {})}
    />
  </div>
</div>