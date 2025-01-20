<!-- src/lib/(space)/components/chute/ChuteScene.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { chuteStore } from '../../stores/chuteStore';
  import { PHYSICS } from './physics';

  export let startAnimation: () => void;

  let container: HTMLDivElement;
  let parachutist: HTMLImageElement;

  function updatePhysics() {
    const progress = Date.now() % PHYSICS.ANIMATION_DURATION / PHYSICS.ANIMATION_DURATION;
    const altitude = PHYSICS.INITIAL_ALTITUDE + 
      (PHYSICS.FINAL_ALTITUDE - PHYSICS.INITIAL_ALTITUDE) * 
      (1 - Math.pow(1 - progress, 3)); // Cubic easing
    
    const velocity = 20 * Math.sin(progress * Math.PI);
    chuteStore.updateStats(altitude, velocity);
  }

  function animateParachutist() {
    if (!parachutist) return;

    gsap.killTweensOf(parachutist);

    // Gentle swaying motion
    gsap.to(parachutist, {
      y: '+=10',
      rotation: 2,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });

    // Physics updates
    gsap.to({}, {
      duration: 0.1,
      repeat: -1,
      onRepeat: updatePhysics
    });
  }

  onMount(() => {
    startAnimation = animateParachutist;
    animateParachutist();
  });
</script>

<div 
  bind:this={container} 
  class="relative h-full overflow-hidden"
>
  <!-- Planet-specific background gradient -->
  <div 
    class="absolute inset-0 opacity-10 transition-colors duration-500"
    style="background: radial-gradient(circle at 50% 150%, 
           {$chuteStore.planet === 'earth' ? '#4299E1' : '#ED8936'} 0%, 
           transparent 70%)"
  />

  <!-- Parachutist -->
  <div class="relative w-full h-full flex items-center justify-center">
    <img
      bind:this={parachutist}
      src="/space/assets/paraglider.svg"
      alt="Paraglider"
      class="w-32 md:w-40 lg:w-48 pointer-events-none transform-gpu
             transition-all duration-300"
    />
  </div>
</div>

<style>
  img {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
</style>