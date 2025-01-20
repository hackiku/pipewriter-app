<!-- src/lib/(space)/components/chute/Scene.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import ChuteScene from './ChuteScene.svelte';
  import PlanetGrid from './PlanetGrid.svelte';
  
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
</script>

<div class="fixed inset-0">
  <!-- Planet Grid Background -->
  <div class="absolute inset-0 z-0">
    <PlanetGrid {progress} />
  </div>

  <!-- Scene Layer with Chute -->
  <div class="absolute inset-0 z-10">
    <div class="w-full lg:w-[65vw] h-screen ml-auto
                transition-transform duration-300"
      style="transform: translateY({progress * -10}vh)"
    >
      <ChuteScene {startAnimation} />
    </div>
  </div>
</div>