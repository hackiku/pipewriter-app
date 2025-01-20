<!-- src/lib/(space)/components/chute/Scene.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import ChuteScene from './ChuteScene.svelte';
  import PlanetGrid from './PlanetGrid.svelte';
  import FlyingObjects from './FlyingObjects.svelte';
  import { chuteStore } from '../../stores/chuteStore';
  
  let mounted = false;
  let progress = 0;
  
  // Update scene based on scroll
  function updateProgress(scrollY: number) {
    const vh = window.innerHeight;
    // Start transforming as soon as we start scrolling
    progress = Math.max(0, Math.min(1, scrollY / (vh * 0.8)));
  }
  
  onMount(() => {
    mounted = true;
    const handleScroll = () => updateProgress(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  });

  // Reactive values for animations
  $: planetScale = mounted ? 1 + progress * 0.3 : 1;
  $: translateY = mounted ? `${progress * 20}vh` : '0vh';
  $: opacity = mounted ? 1 - progress * 0.5 : 1;
</script>

<!-- Master scene container -->
<div class="fixed inset-0 pointer-events-none">
  <!-- Background elements -->
  <div class="absolute inset-0 z-0">
    <!-- Flying objects -->
    <FlyingObjects />
  </div>

  <!-- Planet Grid - now properly anchored to bottom -->
  <div 
    class="absolute inset-x-0 bottom-0 z-10
           transition-transform duration-300 ease-out"
    style="
      height: {60 + progress * 40}vh;
      transform: scale({planetScale});
    "
  >
    <PlanetGrid />
  </div>

  <!-- Chute Scene Container -->
	<!-- w-full lg:w-[75vw] xl:w-[40vw] -->
  <div 
    class="absolute z-20 transition-all duration-300
           w-[65vw]
					 h-[50vh] lg:h-[60vh]
           right-12 lg:right-[5vw]"
    style="
      top: {20 - progress * 15}vh;
      opacity: {opacity};
      transform: translate(
        {progress * -5}vw,
        {progress * 15}vh
      );
    "
  >
    <!-- Nav-aligned padding for chute -->
    <div class="h-full px-4 sm:px-6 md:px-16 lg:px-24">
      <ChuteScene />
    </div>
  </div>

  <!-- Smooth gradient overlays -->
  <div class="absolute inset-x-0 top-0 h-32 z-30
              bg-gradient-to-b from-background to-transparent" />
  <div class="absolute inset-x-0 bottom-0 h-32 z-30
              bg-gradient-to-t from-background to-transparent" />
  <div class="absolute inset-y-0 left-0 w-32 z-30
              bg-gradient-to-r from-background to-transparent" />
</div>

<style>
  /* Performance optimizations */
  div {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
</style>