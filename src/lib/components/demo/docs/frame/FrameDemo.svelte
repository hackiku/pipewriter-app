<!-- src/lib/components/demo/docs/frame/FrameDemo.svelte -->
<script lang="ts">
  import { fade } from "svelte/transition";
	import { X } from "lucide-svelte"
  import { writable } from "svelte/store";
  import Dropper from '$lib/iframe/layout/Dropper.svelte';
  import TabsDemo from './TabsDemo.svelte';
  
  // Simplified stores just for demo
  const activeTab = writable<string | null>(null);
  const showInfo = writable(true);

  // Stub for handling element selection
  function handleElementSelect(event: CustomEvent<{ elementId: string }>) {
    console.log('Selected element:', event.detail.elementId);
  }
</script>

<div class="flex flex-col h-full bg-gray-100 dark:bg-gray-950 relative">
  <!-- Main Content with Original Dropper -->
    <div class="h-[34px] bg-[#616161] dark:bg-[#424242] flex items-center justify-between px-4">
    <span class="text-white font-semibold text-xs">Pipewriter</span>
    <button class="text-white/60 hover:text-white">
      <X class="w-4 h-4" />
    </button>
  </div>

	<div class="flex-1 overflow-y-auto">
    <div class="h-full relative">
      <Dropper />
    </div>
  </div>

  <!-- Demo Tabs at Bottom -->
  <div class="absolute bottom-0 inset-x-0 px-4 py-2 bg-white/50 dark:bg-black/50 
              backdrop-blur-sm border-t border-zinc-200 dark:border-zinc-800">
    <TabsDemo {activeTab} {showInfo} />
  </div>
</div>

<style>
  /* Hide the original bottom bar from Dropper if needed */
  :global(.dropper-bottom-bar) {
    display: none !important;
  }
</style>