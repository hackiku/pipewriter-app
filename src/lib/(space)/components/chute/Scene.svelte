<!-- src/lib/(space)/components/chute/Scene.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import ChuteScene from './ChuteScene.svelte';
  import PlanetGrid from './PlanetGrid.svelte';
  import FlyingObjects from './FlyingObjects.svelte';
  import { chuteStore } from '../../stores/chuteStore';
  
  let mounted = false;
  let progress = 0;
  let viewportWidth: number;
  
  function updateProgress(scrollY: number) {
    const vh = window.innerHeight;
    progress = Math.max(0, Math.min(1, scrollY / (vh * 0.8)));
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

  function startAnimation() {
    // Passed down to ChuteScene
  }

  $: isDesktop = viewportWidth >= 1024;
  $: centeringProgress = mounted ? Math.max(0, (1024 - viewportWidth) / 1024) : 0;
  $: horizontalOffset = centeringProgress * 50;
  
  $: planetScale = mounted ? 1 + progress * 0.3 : 1;
  $: translateY = mounted ? `${progress * 20}vh` : '0vh';
  $: opacity = mounted ? 1 - progress * 0.5 : 1;
</script>

<!-- Scene Container - Now Interactive -->
<div class="fixed inset-0 isolate">
  <!-- Background & Grid (no pointer events) -->
  <div class="absolute inset-0 pointer-events-none">
    <!-- Flying objects layer -->
    <div class="absolute inset-0 h-[200vh] z-0">
      <FlyingObjects />
    </div>

    <!-- Planet Grid layer -->
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
  </div>

  <!-- Interactive Layer (Chute & Controls) -->
  <div class="relative z-20 h-full pointer-events-auto">
    <!-- Chute Container with Responsive Positioning -->
    <div 
      class="absolute transition-all duration-300
             w-full lg:w-[65vw] h-[50vh] lg:h-[60vh]"
      style="
        top: {20 - progress * 15}vh;
        right: {isDesktop ? '5vw' : '0'};
        opacity: {opacity};
        transform: translate(
          calc({progress * -5}vw + {horizontalOffset ? `-${horizontalOffset}%` : '0'}),
          {progress * 15}vh
        );
      "
    >

      <!-- Chute Scene -->
      <div class="h-full px-4 sm:px-6 md:px-16 lg:px-24">
        <ChuteScene {startAnimation} />
      </div>
    </div>
  </div>

  <!-- Gradient Overlays (no pointer events) -->
  <div class="absolute inset-0 pointer-events-none z-30">
    <div class="absolute inset-x-0 top-0 h-32
                bg-gradient-to-b from-background to-transparent" />
    <div class="absolute inset-x-0 bottom-0 h-32
                bg-gradient-to-t from-background to-transparent" />
    <div class="absolute inset-y-0 left-0 w-32
                bg-gradient-to-r from-background to-transparent" />
  </div>
</div>

<style>
  div {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
</style>