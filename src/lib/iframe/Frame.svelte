<!-- $lib/iframe/Frame.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import Dropper from './Dropper.svelte';
  import TopBar from './TopBar.svelte';	
  import Tabs from './Tabs.svelte';	
  import { elements } from './elements';
  import { showInfo } from './stores';

  function callGAS(action: string, payload: Record<string, any> = {}) {
    const message = { action, payload };
    window.parent.postMessage(JSON.stringify(message), '*');
  }

  function handleMessage(event: MessageEvent) {
    console.log('Received message:', event.data);
    // Handle messages from Google Apps Script here
  }

  onMount(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  });

  function handleElementDrop(event: CustomEvent<{elementId: string}>) {
    callGAS('getElement', { elementId: event.detail.elementId });
  }
</script>

<main class="flex flex-col gap-2">
  <section>
    <TopBar />
  </section>
  
  <hr>
  
  <section class="h-[50vh] overflow-hidden overflow-y-auto custom-scrollbar mb-6s">
    <Dropper {elements} {callGAS} on:elementDropped={handleElementDrop} />
  </section>
    
  <hr>
  
  <section class="flex justify-between items-center py-2">
    <Tabs />
		{#if $showInfo}
			<p class="text-sm opacity-30">
				Styles
			</p>
		{/if}
  </section>

  <!-- <hr /> -->


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