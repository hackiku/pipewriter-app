<!-- $lib/iframe/TextStyles.svelte -->
<script lang="ts">
  import { getElement } from './elements';
  import ElementCard from "./components/ElementCard.svelte";
  import OutlineButton from "./components/OutlineButton.svelte";
  import { Type, Heading } from 'lucide-svelte';

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

<div class="grid grid-cols-2 gap-4">
  <div>
    {#if element}
      <ElementCard element={element} onSelect={selectElement}/>
    {:else}
      <div class="w-full h-full bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">Element not found</span>
      </div>
    {/if}
  </div>
  <div class="flex flex-col gap-2">
    <OutlineButton
      icon={Type}
      label="Style Guide"
      onClick={() => callGAS("getElement", { elementId: "styleguide" })}
    />
    <OutlineButton
      icon={Heading}
      label="Update Heading"
      onClick={() => callGAS("updateHeading", {})}
    />
  </div>
</div>