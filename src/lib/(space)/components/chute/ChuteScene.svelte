<!-- src/lib/(space)/components/chute/ChuteScene.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { chuteStore } from '../../stores/chuteStore';
  import Controls from './Controls.svelte';

  let container: HTMLDivElement;
  let parachutist: HTMLImageElement;
  let timeline: gsap.core.Timeline;
  
  // Cloud setup
  const CLOUD_COUNT = 6;
  let clouds: HTMLImageElement[] = Array(CLOUD_COUNT).fill(null);

  function animateParachutist() {
    // Create float animation
    gsap.to(parachutist, {
      y: '+=15',
      rotation: 2,
      duration: 2.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });

    // Update store with mock physics for now
    let elapsed = 0;
    const INITIAL_ALTITUDE = 95935.8; // X-15 record (m)
    
    gsap.to({}, {
      duration: 30,
      repeat: -1,
      onUpdate: () => {
        elapsed += gsap.ticker.deltaRatio();
        const progress = Math.min(elapsed / 30, 1);
        
        // Smooth easing for altitude drop
        const altitude = INITIAL_ALTITUDE * (1 - Math.pow(progress, 2));
        
        // Velocity follows a bell curve
        const velocity = 20 * Math.sin(progress * Math.PI);
        
        chuteStore.updateStats(altitude, velocity);
      }
    });
  }

  function animateClouds() {
    clouds.forEach((cloud, i) => {
      if (!cloud) return;
      
      // Randomize cloud properties
      const scale = 0.2 + (i * 0.15);
      const delay = i * 1.5;
      const duration = 8 + Math.random() * 4;
      
      gsap.fromTo(cloud,
        { 
          y: '120%',
          opacity: 0.15 * scale,
          scale
        },
        {
          y: '-50%',
          opacity: 0,
          duration,
          delay,
          repeat: -1,
          ease: 'none'
        }
      );
    });
  }

  function startAnimation() {
    // Kill existing animations
    gsap.killTweensOf([parachutist, ...clouds]);
    
    // Reset positions
    gsap.set(parachutist, { y: 0, rotation: 0 });
    clouds.forEach(cloud => cloud && gsap.set(cloud, { y: '120%' }));
    
    // Start new animations
    animateParachutist();
    animateClouds();
  }

  onMount(() => {
    startAnimation();
  });

  onDestroy(() => {
    gsap.killTweensOf([parachutist, ...clouds]);
  });

  // Watch for planet changes
  $: if ($chuteStore.planet) {
    startAnimation();
  }
</script>

<div 
  bind:this={container} 
  class="relative w-full h-full overflow-hidden"
>
  <!-- Background gradient based on planet -->
  <div 
    class="absolute inset-0 opacity-10 transition-colors duration-500"
    style="background: radial-gradient(circle at 50% 150%, 
           {$chuteStore.planet === 'earth' ? '#4299E1' : '#ED8936'} 0%, 
           transparent 70%)"
  />

  <!-- Clouds Container -->
  <div class="absolute inset-0 pointer-events-none">
    {#each Array(CLOUD_COUNT) as _, i}
      <img 
        bind:this={clouds[i]}
        src="/space/assets/cloud.svg"
        alt="Cloud"
        class="absolute w-24 h-24"
        style="left: {15 + i * 15}%"
      />
    {/each}
  </div>

  <!-- Parachutist Container -->
  <div class="absolute left-1/2 top-1/3 -translate-x-1/2 pointer-events-none">
    <img
      bind:this={parachutist}
      src="/space/assets/paraglider.svg"
      alt="Paraglider"
      class="w-32 md:w-40 lg:w-48 transform-gpu"
    />
  </div>

  <!-- Controls Panel - Now should be clickable -->
  <div class="absolute right-8 top-[45%] z-10">
    <div class="backdrop-blur-[2px] bg-black/10 
                rounded-lg border border-white/10
                shadow-lg">
      <Controls {startAnimation} />
    </div>
  </div>
</div>

<style>
  /* Performance optimizations */
  img {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
</style>