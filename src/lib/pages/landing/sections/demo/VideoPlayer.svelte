<!-- src/lib/pages/landing/sections/demo/VideoPlayer.svelte -->
<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { X } from 'lucide-svelte';
  
  export let onClose: () => void;
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Overlay -->
<div
  class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
  transition:fade={{ duration: 200 }}
  on:click={onClose}
/>

<!-- Video Container -->
<div
  class="fixed inset-4 z-50 m-auto max-w-4xl h-fit rounded-xl overflow-hidden
         bg-background shadow-2xl"
  transition:scale={{ duration: 300, start: 0.95 }}
>
  <!-- Close Button -->
  <button
    class="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 
           backdrop-blur-sm hover:bg-background transition-colors"
    on:click={onClose}
  >
    <X class="w-5 h-5" />
  </button>

  <!-- Video Embed -->
  <div class="relative pb-[56.25%] h-0 bg-muted">
    <iframe
      src="https://www.loom.com/embed/2dd12f155c834c83bdaa3f9e2cb1e011?autoplay=1"
      frameborder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen
      class="absolute top-0 left-0 w-full h-full"
    />
  </div>
</div>