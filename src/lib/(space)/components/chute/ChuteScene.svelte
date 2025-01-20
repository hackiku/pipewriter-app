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
    
    // Velocity affects animation speed
    const velocity = 20 * Math.sin(progress * Math.PI);
    chuteStore.updateStats(altitude, velocity);
    
    // Update parachutist animation based on velocity
    if (parachutist) {
      gsap.to(parachutist, {
        y: '+=10',
        duration: 2 / (Math.abs(velocity) / 10 + 0.5), // Speed varies with velocity
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      });
    }
  }

  function animateParachutist() {
    if (!parachutist) return;

    gsap.killTweensOf(parachutist);

    // Enhanced swaying motion
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
  
  // Responsive sizing
  $: isSmallViewport = viewportWidth < 768;
  $: chuteSize = isSmallViewport ? 'w-24 md:w-32' : 'w-32 md:w-40 lg:w-48';
</script>

<div 
  bind:this={container} 
  class="relative h-full overflow-hidden"
>
  <!-- Enhanced background gradient -->
  <div 
    class="absolute inset-0 opacity-20 transition-colors duration-500"
    style="background: radial-gradient(circle at 50% 150%, 
           {$chuteStore.planet === 'earth' ? '#4299E1' : '#ED8936'} 0%, 
           transparent 80%)"
  />

  <!-- Parachutist with dynamic positioning -->
  <div class="relative w-full h-full flex items-center justify-center
              {isSmallViewport ? '-translate-y-12' : 'translate-y-0'}
              transition-transform duration-300">
    <img
      bind:this={parachutist}
      src="/space/assets/paraglider.svg"
      alt="Paraglider"
      class="{chuteSize} pointer-events-none transform-gpu
             transition-all duration-300 drop-shadow-xl"
    />
  </div>
</div>

<style>
  img {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform, opacity;
    filter: brightness(1.1);
  }
</style>