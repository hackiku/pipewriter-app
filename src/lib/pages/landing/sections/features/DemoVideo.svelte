<!-- src/lib/pages/landing/sections/features/DemoVideo.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Play, Pause } from 'lucide-svelte';

  let video: HTMLVideoElement;
  let isPlaying = false;
  let progress = 0;

  onMount(() => {
    if (video) {
      video.addEventListener('timeupdate', () => {
        progress = (video.currentTime / video.duration) * 100;
      });
    }
  });

  function togglePlay() {
    if (video.paused) {
      video.play();
      isPlaying = true;
    } else {
      video.pause();
      isPlaying = false;
    }
  }
</script>

<div class="relative w-full h-full rounded-xl overflow-hidden border bg-zinc-950">
  <!-- Video Player -->
  <video
    bind:this={video}
    class="w-full h-full object-cover"
    src="/demo/videos/wireframing-demo.webp"
    loop
    muted
    playsinline
  />

  <!-- Overlay Controls -->
  <div class="absolute inset-0 flex items-center justify-center 
              bg-gradient-to-t from-black/40 to-transparent
              opacity-0 hover:opacity-100 transition-opacity">
    <button
      on:click={togglePlay}
      class="p-4 rounded-full bg-white/10 backdrop-blur-sm
             hover:bg-white/20 transition-colors"
    >
      {#if isPlaying}
        <Pause class="w-8 h-8 text-white" />
      {:else}
        <Play class="w-8 h-8 text-white" />
      {/if}
    </button>
  </div>

  <!-- Progress Bar -->
  <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
    <div 
      class="h-full bg-primary transition-all duration-300"
      style="width: {progress}%"
    />
  </div>
</div>