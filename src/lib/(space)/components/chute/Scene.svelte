<!-- src/lib/(space)/components/chute/Scene.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import ChuteScene from './ChuteScene.svelte';
  import PlanetGrid from './PlanetGrid.svelte';
  import { chuteStore } from '../../stores/chuteStore';
  
  export let startAnimation: () => void;
  
  let mounted = false;
  let progress = 0;
  let viewportWidth: number;
  
  function updateProgress(scrollY: number) {
    const vh = window.innerHeight;
    progress = Math.max(0, Math.min(0.8, scrollY / (vh * 1.2)));
  }
  
  onMount(() => {
    mounted = true;
    viewportWidth = window.innerWidth;
    
    const handleScroll = () => updateProgress(window.scrollY);
    const handleResize = () => viewportWidth = window.innerWidth;
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });

  $: isDesktop = viewportWidth >= 1024;
  $: centeringProgress = mounted ? Math.max(0, (1024 - viewportWidth) / 1024) : 0;
  $: horizontalOffset = isDesktop ? 0 : centeringProgress * 40;
  $: translateY = `${progress * 10}vh`;
</script>

<div class="fixed inset-0 isolate">
  <!-- Planet Grid (Background Layer) -->
  <div class="absolute inset-0 z-0">
    <PlanetGrid {progress} />
  </div>

  <!-- Scene Content Container (establishes stacking context) -->
  <div class="absolute inset-0 z-10">
    <!-- Chute Container with proper positioning -->
    <div 
      class="absolute transition-all duration-300
             w-full lg:w-[65vw] h-[50vh] lg:h-[60vh]"
      style="
        top: {20 - progress * 10}vh;
        right: {isDesktop ? '5vw' : '0'};
        transform: translate(
          {horizontalOffset ? `-${horizontalOffset}%` : '0'},
          {translateY}
        );
      "
    >
      <div class="relative h-full px-4 sm:px-6 md:px-16 lg:px-24">
        <ChuteScene {startAnimation} />
      </div>
    </div>
  </div>
</div>

<style>
  /* Ensure proper stacking context */
  :global(.scene-layer) {
    transform-style: preserve-3d;
    backface-visibility: hidden;
    will-change: transform;
  }
</style>