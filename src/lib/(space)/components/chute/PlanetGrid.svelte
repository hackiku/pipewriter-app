<!-- src/lib/(space)/components/chute/PlanetGrid.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { chuteStore } from '../../stores/chuteStore';

  let container: HTMLDivElement;
  let progress = 0;

  // Update grid perspective based on scroll
  function updateProgress(scrollY: number) {
    const start = window.innerHeight * 0.2; // Start transform at 20% down
    const end = window.innerHeight * 0.8;   // End transform at 80% down
    progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
  }

  onMount(() => {
    const handleScroll = () => updateProgress(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  $: gridColor = $chuteStore.planet === 'earth' ? '#4299E1' : '#ED8936';
</script>

<div 
  bind:this={container}
  class="fixed inset-x-0 bottom-0 z-0 h-[66vh] overflow-hidden"
  style="transform: perspective(1000px) rotateX({75 - progress * 45}deg)"
>
  <!-- Grid Background -->
  <div 
    class="absolute inset-0 transition-colors duration-500"
    style="background: linear-gradient(to bottom,
             transparent,
             {gridColor}10 10%,
             {gridColor}20)"
  >
    <!-- Horizontal Lines -->
    {#each Array(20) as _, i}
      <div
        class="absolute w-full h-px"
        style="
          top: {(i + 1) * 5}%;
          background: linear-gradient(
            90deg,
            transparent,
            {gridColor}40 20%,
            {gridColor}40 80%,
            transparent
          );
          opacity: {1 - i * 0.04};
        "
      />
    {/each}

    <!-- Vertical Lines -->
    {#each Array(20) as _, i}
      <div
        class="absolute top-0 bottom-0 w-px"
        style="
          left: {(i + 1) * 5}%;
          background: linear-gradient(
            0deg,
            transparent,
            {gridColor}40 20%,
            {gridColor}40 80%,
            transparent
          );
          opacity: {1 - i * 0.04};
        "
      />
    {/each}
  </div>

  <!-- Gradient Overlays -->
  <div 
    class="absolute inset-0 bg-gradient-to-b 
           from-background via-transparent to-transparent"
  />
  <div 
    class="absolute inset-0 bg-gradient-to-t 
           from-background via-transparent to-transparent 
           opacity-50"
  />
</div>