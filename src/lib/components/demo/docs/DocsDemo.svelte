<!-- src/lib/components/demo/docs/DocsDemo.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Frame from '$lib/iframe/Frame.svelte';
  import DocsHeader from './DocsHeader.svelte';
  import DocsBody from './DocsBody.svelte';
  import { writable } from 'svelte/store';

  // Local store for managing demo state
  const docsState = writable({
    activeSection: null as string | null,
    isFrameOpen: false
  });

  // Handle layout selection from Frame
  function handleLayoutSelect(event: CustomEvent<{ id: string }>) {
    docsState.update(state => ({
      ...state,
      activeSection: event.detail.id,
      isFrameOpen: true
    }));
  }

  onMount(() => {
    // Initialize with sample content
    return () => {
      docsState.set({ activeSection: null, isFrameOpen: false });
    };
  });
</script>

<div class="flex flex-col h-full bg-white text-zinc-900">
  <DocsHeader />
  
  <div class="flex-1 relative">
    <DocsBody />
    
    {#if $docsState.isFrameOpen}
      <div class="absolute inset-y-0 right-0 w-80 border-l">
        <Frame on:layoutSelect={handleLayoutSelect} />
      </div>
    {/if}
  </div>
</div>