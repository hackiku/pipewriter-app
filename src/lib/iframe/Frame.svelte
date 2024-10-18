<!-- $lib/iframe/Frame.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import ColorPicker from '$lib/iframe/ColorPicker.svelte';	
  import Dropper from '$lib/iframe/Dropper.svelte';
  import TopBar from '$lib/iframe/TopBar.svelte';	
  import Tabs from '$lib/iframe/Tabs.svelte';	
  // import BottomBar from '$lib/iframe/BottomBar.svelte';
  import { elements } from '$lib/iframe/elements.ts';

  function callGAS(action: string, payload: Record<string, any> = {}) {
    const message = { action, payload };
    window.parent.postMessage(JSON.stringify(message), '*');
  }

  function handleMessage(event: MessageEvent) {
    // Handle messages from Google Apps Script here
    console.log('Received message:', event.data);
    // You may want to parse the event.data and update your Svelte stores or component state here
  }

  onMount(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  });

  // You might want to add more functions here to handle various actions
  function handleColorChange(color: string) {
    callGAS('changeBg', { color });
  }

  function handleElementDrop(elementId: string) {
    callGAS('getElement', { elementId });
  }
</script>

<!-- --------------------- TOP BAR --------------------------------- -->

<main class="flex flex-col gap-2">
	
	<section>
		<TopBar />
	</section>
	
	<!-- <hr> -->
	
	<section class="h-[50vh] overflow-hidden overflow-y-auto custom-scrollbar mb-6">
		<Dropper {elements} {callGAS} on:elementDropped={e => handleElementDrop(e.detail.elementId)} />
	</section>
		
	<hr>
	
	<section class="">
		<Tabs />
		</section>
		

	<section class="mt-6">
		<ColorPicker on:colorChange={e => handleColorChange(e.detail.color)} />
	</section>

	<section>
		<p class="text-xs opacity-30">
			styles
		</p>
	</section>

	<hr class="border-1 border-gray-500 opacity-20 mt-4" />
</main>

<style>
	.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 1px solid transparent; 
    background-clip: content-box;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
</style>