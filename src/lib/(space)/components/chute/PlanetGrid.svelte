<!-- src/lib/(space)/components/chute/PlanetGrid.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { chuteStore } from '../../stores/chuteStore';

  let container: HTMLDivElement;
  let progress = 0;
  let viewportWidth: number;

  function updateProgress(scrollY: number) {
    const start = window.innerHeight * 0.2;
    const end = window.innerHeight * 0.8;
    progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
  }

  onMount(() => {
    viewportWidth = window.innerWidth;
    const handleScroll = () => updateProgress(window.scrollY);
    const handleResize = () => viewportWidth = window.innerWidth;
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });

  $: gridColor = $chuteStore.planet === 'earth' ? '#4299E1' : '#ED8936';
  $: isDesktop = viewportWidth >= 1024;
  
  // Calculate dynamic grid properties based on progress
  $: planetScale = 1 + progress * 1.5;  // Grows 2.5x
  $: curvature = 75 - progress * 65;    // From 75° to 10°
  $: translateY = progress * -15;        // Move up as we descend
  $: initialWidth = isDesktop ? 65 : 90; // Match chute scene width
  $: width = initialWidth + (progress * (100 - initialWidth)); // Expand to full width
</script>

<div 
  bind:this={container}
  class="fixed bottom-0 overflow-hidden pointer-events-none"
  style="
    left: {50 - width/2}%;
    width: {width}%;
    height: 100vh;
    transform: perspective(1000px) 
               rotateX({curvature}deg)
               translateY({translateY}vh)
               scale({planetScale});
  "
>
  <!-- Curved Grid Container -->
  <div 
    class="absolute inset-0 transition-colors duration-500 rounded-t-full"
    style="background: radial-gradient(
      ellipse at 50% 100%,
      {gridColor}20 0%,
      {gridColor}10 50%,
      transparent 100%
    )"
  >
    <!-- Horizontal Arc Lines -->
    {#each Array(20) as _, i}
      <div
        class="absolute w-full h-px origin-bottom"
        style="
          bottom: {i * 5}%;
          transform: perspective(1000px) rotateX({i * 2}deg);
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

    <!-- Vertical Lines (curved) -->
    {#each Array(20) as _, i}
      <div
        class="absolute bottom-0 w-px origin-bottom"
        style="
          left: {(i + 1) * 5}%;
          height: 100%;
          transform: perspective(1000px) rotateY({-45 + i * 4.5}deg);
          background: linear-gradient(
            0deg,
            {gridColor}40,
            {gridColor}20 50%,
            transparent
          );
          opacity: {1 - Math.abs(10 - i) * 0.08};
        "
      />
    {/each}
  </div>

  <!-- Enhanced Gradient Overlays -->
  <div 
    class="absolute inset-0 bg-gradient-to-b 
           from-background via-transparent to-transparent"
  />
  <div 
    class="absolute inset-0 bg-gradient-to-t 
           from-background via-transparent to-transparent 
           opacity-50"
  />
  <div 
    class="absolute inset-y-0 left-0 w-32
           bg-gradient-to-r from-background to-transparent"
  />
  <div 
    class="absolute inset-y-0 right-0 w-32
           bg-gradient-to-l from-background to-transparent"
  />
</div>