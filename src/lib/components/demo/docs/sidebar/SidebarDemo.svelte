<!-- src/lib/components/demo/docs/sidebar/SidebarDemo.svelte -->

<script lang="ts">
	import { fade } from "svelte/transition";
  import { X } from "lucide-svelte";
  import { writable } from "svelte/store";
  // import Dropper from './Dropper.svelte';
  import TopBar from "$lib/iframe/layout/TopBar.svelte";
	import Dropper from '$lib/iframe/layout/Dropper.svelte';
  
  // Simplified stores just for demo
  const activeTab = writable<string | null>(null);
  const showInfo = writable(true);

  function handleElementSelect(event: CustomEvent<{ elementId: string }>) {
    console.log('Selected element:', event.detail.elementId);
  }
</script>

<div class="flex flex-col h-full relative">
  <!-- Header -->
  <div class="h-[34px] bg-[#616161] dark:bg-[#424242] flex items-center justify-between px-4">
    <span class="text-white font-semibold text-xs">Pipewriter</span>
    <button class="text-white/60 hover:text-white">
      <X class="w-4 h-4" />
    </button>
  </div>


	<section class="flex-none px-2 border-b bg-white dark:bg-background h-11">
    <TopBar />
  </section>

  <!-- Main Content Area -->
  <div class="flex-1 relative overflow-clip">
		<div class="absolute inset-0 -mr-3 sh-3/5">
      <!-- <div class="p-4"> -->
        <Dropper on:elementSelect={handleElementSelect} />
			</div>
		</div>
		<!-- <div 
			class="absolute bottom-0 w-full h-[100%]
						 bg-gradient-to-t from-gray-100 dark:from-background to-transparent 
						 pointer-events-none"
		/> -->
    
    <!-- Bottom Fade -->
</div>
