<!-- src/lib/(space)/components/chute/ChuteScene.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { chuteStore } from '../../stores/chuteStore';
  import { PHYSICS } from './physics';

  export let startAnimation: () => void;

  let container: HTMLDivElement;
  let parachutist: HTMLImageElement;
  let viewportWidth: number;
  let backgroundY = 0;
  
  onMount(() => {
    viewportWidth = window.innerWidth;
    const handleResize = () => viewportWidth = window.innerWidth;
    window.addEventListener('resize', handleResize);
    
    startAnimation = animateParachutist;
    animateParachutist();
    
    return () => window.removeEventListener('resize', handleResize);
  });

  function updatePhysics() {
    const progress = Date.now() % PHYSICS.ANIMATION_DURATION / PHYSICS.ANIMATION_DURATION;
    const altitude = PHYSICS.INITIAL_ALTITUDE + 
      (PHYSICS.FINAL_ALTITUDE - PHYSICS.INITIAL_ALTITUDE) * 
      (1 - Math.pow(1 - progress, 3));
    
    const velocity = 20 * Math.sin(progress * Math.PI);
    chuteStore.updateStats(altitude, velocity);
    
    // Update background position based on velocity
    backgroundY += velocity * 0.1;
    if (container) {
      container.style.setProperty('--bg-y', `${backgroundY}px`);
    }
  }

  function animateParachutist() {
    if (!parachutist) return;

    gsap.killTweensOf(parachutist);

    // Gentle swaying only
    gsap.to(parachutist, {
      rotation: 2,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });

    // More frequent physics updates
    gsap.to({}, {
      duration: 0.05,
      repeat: -1,
      onRepeat: updatePhysics
    });
  }
  
  $: isSmallViewport = viewportWidth < 768;
  $: chuteSize = isSmallViewport ? 'w-24 md:w-32' : 'w-32 md:w-40 lg:w-48';
</script>

<div 
  bind:this={container} 
  class="relative h-full overflow-hidden"
>
  <!-- Parallax Background -->
  <div 
    class="absolute inset-0 transition-colors duration-500"
    style="
      background: repeating-linear-gradient(
        0deg,
        {$chuteStore.planet === 'earth' ? '#4299E1' : '#ED8936'}10 0px,
        transparent 100px
      );
      transform: translateY(var(--bg-y, 0));
    "
  />

  <!-- Fixed Parachutist -->
  <div class="absolute inset-0 flex items-center justify-center">
    <img
      bind:this={parachutist}
      src="/space/assets/paraglider.svg"
      alt="Paraglider"
      class="{chuteSize} pointer-events-none transform-gpu
             transition-all duration-300 drop-shadow-xl"
    />
  </div>

  <!-- Enhanced Edge Gradients -->
  <div class="absolute inset-x-0 top-0 h-32 
              bg-gradient-to-b from-background to-transparent" />
  <div class="absolute inset-x-0 bottom-0 h-32
              bg-gradient-to-t from-background to-transparent" />
  <div class="absolute inset-y-0 left-0 w-32
              bg-gradient-to-r from-background to-transparent" />
  <div class="absolute inset-y-0 right-0 w-32
              bg-gradient-to-l from-background to-transparent" />
</div>

<style>
  img {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform;
    filter: brightness(1.1);
  }
</style>