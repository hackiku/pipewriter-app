<!-- src/lib/(space)/components/scene/Scene.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import ChuteScene from '../chute/ChuteScene.svelte';
  import PlanetGrid from '../chute/PlanetGrid.svelte';
  import FlyingObjects from '../chute/FlyingObjects.svelte';
  import { chuteStore } from '../../stores/chuteStore';
  
  // Track viewport dimensions
  let windowHeight: number;
  let windowWidth: number;
  
  // Track scroll position for parallax effects
  let scrollY: number;
  
  onMount(() => {
    // Update dimensions on resize
    const handleResize = () => {
      windowHeight = window.innerHeight;
      windowWidth = window.innerWidth;
    };
    
    // Update scroll position
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<!-- Master scene container -->
<div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
  <!-- Background elements (planet grid) -->
  <div class="absolute inset-0 z-0">
    <PlanetGrid />
  </div>
  
  <!-- Flying objects layer -->
  <div class="absolute inset-0 z-10">
    <FlyingObjects />
  </div>
  
  <!-- Chute animation layer -->
  <div class="absolute inset-0 z-20">
    <div class="relative h-full lg:w-1/2 lg:ml-auto">
      <ChuteScene />
    </div>
  </div>
  
  <!-- Gradient overlays for smooth transitions -->
  <div class="absolute inset-x-0 top-0 h-32 z-30
              bg-gradient-to-b from-background to-transparent" />
  <div class="absolute inset-x-0 bottom-0 h-32 z-30
              bg-gradient-to-t from-background to-transparent" />
  
  <!-- Side fade on desktop -->
  <div class="hidden lg:block absolute inset-y-0 left-0 w-32 z-30
              bg-gradient-to-r from-background to-transparent" />
</div>

<style>
  /* For performance, hint to browser about transform layers */
  div {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform;
  }
</style>