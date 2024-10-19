<!-- $lib/iframe/TextStyles.svelte -->
<script lang="ts">
  import { getElement } from './elements';
  import ElementCard from "./components/ElementCard.svelte";
  import OutlineButton from "./components/OutlineButton.svelte";
  import { Type, Heading , X } from 'lucide-svelte';

  const elementId = "styleguide";
  const element = getElement(elementId);

  function callGAS(action: string, params: Record<string, any>) {
    const message = { action, params };
    window.parent.postMessage(JSON.stringify(message), '*');
  }

  function selectElement(id: string) {
    callGAS("getElement", { elementId: id });
  }
</script>


<div class="flex gap-4 h-full items-center">
	<div class="w-2/5">
    {#if element}
      <ElementCard 
        element={element} 
        onSelect={selectElement}
        bgColor="bg-white"
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
      onClick={() => callGAS("getElement", { elementId: "styleguide" })}
    />
    <OutlineButton
      icon={Heading}
      label="Update Heading"
      onClick={() => callGAS("asd", {})}
    />
  </div>
</div>