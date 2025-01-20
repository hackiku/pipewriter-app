<!-- src/lib/(space)/components/chute/ChuteScene.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { chuteStore } from '../../stores/chuteStore';
  import Controls from './Controls.svelte';

  let container: HTMLDivElement;
  let parachutist: HTMLImageElement;
  const CLOUD_COUNT = 4;
  let clouds: HTMLImageElement[] = Array(CLOUD_COUNT).fill(null);

  // Constants for physics simulation
  const PHYSICS = {
    INITIAL_ALTITUDE: 95935.8, // X-15 record (m)
    FINAL_ALTITUDE: 300,      // Landing altitude (m)
    DURATION: 30000,          // 30 seconds in ms
  };

  function updatePhysics() {
    const progress = Date.now() % PHYSICS.DURATION / PHYSICS.DURATION;
    const altitude = PHYSICS.INITIAL_ALTITUDE + 
      (PHYSICS.FINAL_ALTITUDE - PHYSICS.INITIAL_ALTITUDE) * progress;
    const velocity = 20 * Math.sin(progress * Math.PI);
    chuteStore.updateStats(altitude, velocity);
  }

  function animateParachutist() {
    gsap.to(parachutist, {
      y: '+=10',
      rotation: 2,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });

    // Update physics values
    gsap.to({}, {
      duration: 0.1,
      repeat: -1,
      onRepeat: updatePhysics
    });
  }

  function animateClouds() {
    clouds.forEach((cloud, i) => {
      if (!cloud) return;
      
      gsap.fromTo(cloud,
        { 
          y: '120%',
          opacity: 0.15,
          scale: 0.2 + (i * 0.1)
        },
        {
          y: '-50%',
          opacity: 0,
          duration: 8,
          delay: i * 2,
          repeat: -1,
          ease: 'none'
        }
      );
    });
  }

  function startAnimation() {
    gsap.killTweensOf([parachutist, ...clouds]);
    animateParachutist();
    animateClouds();
  }

  onMount(() => {
    startAnimation();
  });
</script>

<div 
  bind:this={container} 
  class="relative h-full overflow-hidden
         lg:absolute lg:right-0 lg:w-1/2 xl:w-2/5"
>
  <!-- Planet-specific background -->
  <div 
    class="absolute inset-0 opacity-10 transition-colors duration-500"
    style="background: radial-gradient(circle at 50% 150%, 
           {$chuteStore.planet === 'earth' ? '#4299E1' : '#ED8936'} 0%, 
           transparent 70%)"
  />

  <!-- Clouds Container -->
  {#each Array(CLOUD_COUNT) as _, i}
    <img 
      bind:this={clouds[i]}
      src="/space/assets/cloud.svg"
      alt="Cloud"
      class="absolute w-24 h-24 pointer-events-none"
      style="left: {20 + i * 20}%"
    />
  {/each}

  <!-- Parachutist -->
  <div class="relative w-full h-full flex items-center justify-center">
    <img
      bind:this={parachutist}
      src="/space/assets/paraglider.svg"
      alt="Paraglider"
      class="w-32 md:w-40 lg:w-48 pointer-events-none transform-gpu"
    />
  </div>

  <!-- Controls -->
  <div class="absolute right-4 lg:right-8 top-[45%] z-10">
    <div class="backdrop-blur-[2px] bg-black/10 
                rounded-lg border border-white/10
                shadow-lg">
      <Controls {startAnimation} />
    </div>
  </div>
</div>

<style>
  img {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
</style>