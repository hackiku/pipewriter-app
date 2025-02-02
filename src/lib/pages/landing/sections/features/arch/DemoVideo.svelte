<!-- src/lib/pages/landing/sections/features/DemoVideo.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Play, Pause } from 'lucide-svelte';

  let container: HTMLDivElement;
  let img: HTMLImageElement;
  let isPlaying = false;
  let isLoaded = false;

  onMount(() => {
    if (img) {
      img.addEventListener('load', () => {
        isLoaded = true;
      });
    }
  });

  function togglePlay() {
    // For WebP, we can't actually pause the animation
    // But we can keep the play/pause UI for consistency
    isPlaying = !isPlaying;
  }
</script>

<div 
  bind:this={container}
  class="relative w-full aspect-[16/10] rounded-xl overflow-hidden border bg-zinc-950"
>
  <!-- Animated WebP -->
  <img
    bind:this={img}
    class="w-full h-full object-cover"
    src="/demo/videos/wireframing-demo.webp"
    alt="Wireframing Demo"
  />

  <!-- Loading State -->
  {#if !isLoaded}
    <div class="absolute inset-0 flex items-center justify-center bg-zinc-950">
      <div class="text-white/50">Loading...</div>
    </div>
  {/if}

  <!-- Overlay Controls -->
  <div class="absolute inset-0 flex items-center justify-center 
              bg-gradient-to-t from-black/40 to-transparent
              opacity-0 hover:opacity-100 transition-opacity">
    <button
      on:click={togglePlay}
      class="p-4 rounded-full bg-white/10 backdrop-blur-sm
             hover:bg-white/20 transition-colors
             {!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}"
    >
      {#if isPlaying}
        <Pause class="w-8 h-8 text-white" />
      {:else}
        <Play class="w-8 h-8 text-white" />
      {/if}
    </button>
  </div>

  <!-- "Progress" Bar - optional since we can't actually track WebP progress -->
  <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
    <div 
      class="h-full bg-primary transition-all duration-300"
      style="width: {isPlaying ? '100' : '0'}%"
    />
  </div>
</div>

<style>
  img {
    opacity: 0;
    transition: opacity 0.3s;
  }
  img.loaded {
    opacity: 1;
  }
</style>