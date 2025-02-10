<!-- src/lib/components/demo/docs/sidebar/SidebarDemo.svelte -->
<script lang="ts">
  import { fade } from "svelte/transition";
  import { X } from "lucide-svelte";
  import { writable } from "svelte/store";
  import TopBar from "$lib/iframe/layout/TopBar.svelte";
  import Dropper from '$lib/iframe/layout/Dropper.svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  const activeTab = writable<string | null>(null);
  const showInfo = writable(true);

  // Intercept Dropper events and transform them
  function handleElementSelect(event: CustomEvent<{ elementId: string }>) {
    // Map the original element IDs to our section types
    const sectionMap = {
      'layout-1': 'zigzag-left',
      'layout-2': 'zigzag-right',
      'layout-3': 'horizontal-blurbs',
      // Add more mappings as needed
    };

    const sectionType = sectionMap[event.detail.elementId] || event.detail.elementId;
    
    // Forward the transformed event to parent
    dispatch('addSection', {
      id: crypto.randomUUID(),
      type: sectionType,
      // Add any default content as needed
    });
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
    <div class="absolute inset-0 -mr-3">
      <Dropper on:elementSelect={handleElementSelect} />
    </div>
  </div>
</div>