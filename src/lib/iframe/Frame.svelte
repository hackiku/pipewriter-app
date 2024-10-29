<!-- $lib/iframe/Frame.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import * as Resizable from "$lib/components/ui/resizable";
  
	import Dropper from './layout/Dropper.svelte';
  import TopBar from './layout/TopBar.svelte';	
  import BottomBar from './layout/BottomBar.svelte';	
  import Tabs from './layout/Tabs.svelte';	
  
	import { elements } from './elements';
  import { showInfo } from './stores';

  function callGAS(action: string, payload: Record<string, any> = {}) {
    const message = { action, payload };
    window.parent.postMessage(JSON.stringify(message), '*');
  }

  function handleMessage(event: MessageEvent) {
    console.log('Received message:', event.data);
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

<main class="flex flex-col h-[90vh]">
  <!-- Top Section -->
  <section class="flex-none">
    <TopBar />
    <hr />
  </section>
  
  <!-- Middle Section with Resizable -->
  <div class="flex-1 overflow-hidden">
    <Resizable.PaneGroup direction="vertical" class="h-full">
      <Resizable.Pane defaultSize={70} minSize={30} maxSize={80}>
        <section class="h-full overflow-hidden overflow-y-auto custom-scrollbar">
          <Dropper {elements} {callGAS} on:elementDropped={handleElementDrop} />
        </section>
      </Resizable.Pane>
      
      <Resizable.Handle withHandle />
      
      <Resizable.Pane defaultSize={30}>
        <section class="h-full flex flex-col">
          <div class="flex-1 py-2">
            <!-- <Tabs /> -->
						 
          </div>
        </section>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </div>


  <section class="flex-none mt-auto py-3">
		<Tabs />
  </section>
  <!-- Bottom Section -->
  <section class="fixed bottom-0 flex-none border-t border-gray-200 dark:border-gray-700">
    <BottomBar />
  </section>
</main>

<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 18px;
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