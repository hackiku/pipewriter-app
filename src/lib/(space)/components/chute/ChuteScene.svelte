<!-- src/lib/pages/space/components/chute/ChuteScene.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { chuteStore } from '../../stores/chuteStore';
  import Controls from './Controls.svelte';

  let container: HTMLDivElement;
  let parachutist: HTMLImageElement;
  const CLOUD_COUNT = 4;
  let clouds: HTMLImageElement[] = Array(CLOUD_COUNT).fill(null);

  function animateParachutist() {
    gsap.to(parachutist, {
      y: '+=10',
      rotation: 2,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  function animateClouds() {
    clouds.forEach((cloud, i) => {
      if (!cloud) return;
      
      gsap.fromTo(cloud,
        { 
          y: '120%', // Start below viewport
          opacity: 0.15,
          scale: 0.2 + (i * 0.1)
        },
        {
          y: '-50%', // End above viewport
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
    animateParachutist();
    animateClouds();
  }

  onMount(() => {
    startAnimation();
  });
</script>

<div 
  bind:this={container} 
  class="relative w-full h-full overflow-hidden"
>
  <!-- Clouds Container - positioned behind parachutist -->
  {#each Array(CLOUD_COUNT) as _, i}
    <img 
      bind:this={clouds[i]}
      src="/space/assets/cloud.svg"
      alt="Cloud"
      class="absolute w-24 h-24 pointer-events-none"
      style="left: {20 + i * 20}%"
    />
  {/each}

  <!-- Parachutist Container - centered with padding -->
  <img
    bind:this={parachutist}
    src="/space/assets/paraglider.svg"
    alt="Paraglider"
    class="absolute 
           left-1/2 top-1/3 -translate-x-1/2 
           w-32 md:w-40 lg:w-48
           pointer-events-none"
  />

  <!-- Controls - positioned to the right of parachutist -->
  <div class="absolute right-8 top-[45%] z-10">
    <div class="backdrop-blur-[2px] bg-black/10 
                rounded-lg border border-white/10
                shadow-lg">
      <Controls {startAnimation} />
    </div>
  </div>
</div>

<style>
  img {
    /* Ensure smooth animations */
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
</style>