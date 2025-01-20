<!-- src/lib/(space)/components/chute/Scene.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import ChuteScene from './ChuteScene.svelte';
  import PlanetGrid from './PlanetGrid.svelte';
  import FlyingObjects from './FlyingObjects.svelte';
  import { chuteStore } from '../../stores/chuteStore';
  
  // Track viewport dimensions
  let windowHeight: number;
  let windowWidth: number;
  let sceneProgress = 0;
  
  // Update dimensions and progress
  function updateMetrics() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    sceneProgress = Math.min(1, window.scrollY / (windowHeight * 0.8));
  }
  
  onMount(() => {
    const handleUpdate = () => updateMetrics();
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, { passive: true });
    handleUpdate();
    
    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);
    };
  });

  // Reactive planet position based on progress
  $: planetScale = 1 + sceneProgress * 0.5;
  $: planetRotation = 75 - sceneProgress * 45;
</script>

<!-- Master scene container -->
<div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
  <!-- Planet Grid with enhanced perspective -->
  <div 
    class="absolute inset-x-0 bottom-0 z-0"
    style="
      height: {66 + sceneProgress * 20}vh;
      transform: perspective(1000px) 
                rotateX({planetRotation}deg)
                scale({planetScale});
    "
  >
    <PlanetGrid />
  </div>
  
  <!-- Flying objects layer -->
  <div class="absolute inset-0 z-10">
    <FlyingObjects />
  </div>
  
  <!-- Chute animation container with proper spacing -->
  <div 
    class="absolute right-0 z-20 
           w-full lg:w-[45vw] xl:w-[40vw]
           h-[50vh] lg:h-[60vh]
           pr-4 sm:pr-6 md:pr-16 lg:pr-24"
    style="top: {20 + sceneProgress * 10}vh"
  >
    <ChuteScene />
  </div>
  
  <!-- Gradient overlays -->
  <div class="absolute inset-x-0 top-0 h-32 z-30
              bg-gradient-to-b from-background to-transparent" />
  <div class="absolute inset-x-0 bottom-0 h-32 z-30
              bg-gradient-to-t from-background to-transparent" />
  <div class="hidden lg:block absolute inset-y-0 left-0 w-32 z-30
              bg-gradient-to-r from-background to-transparent" />
</div>

<style>
  /* Performance optimizations */
  div {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform;
  }
</style>