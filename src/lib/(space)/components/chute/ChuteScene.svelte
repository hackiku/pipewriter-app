<!-- src/lib/(space)/components/chute/ChuteScene.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { chuteStore } from '../../stores/chuteStore';
  import { PHYSICS } from './physics';
  import FlyingObjects from './FlyingObjects.svelte';

  export let startAnimation: () => void;

  let container: HTMLDivElement;
  let parachutist: HTMLImageElement;
  let viewportWidth: number;
  let ticker: gsap.core.Tween;
  
  let currentState = {
    time: 0,
    velocity: 0,
    altitude: PHYSICS.INITIAL_ALTITUDE
  };

  function updatePhysics() {
    currentState.time = (currentState.time + 0.1) % 1;
    const state = PHYSICS.calculateState(currentState.time * PHYSICS.ANIMATION_DURATION, $chuteStore.planet);
    
    currentState.velocity = state.velocity;
    currentState.altitude = state.altitude;
    
    chuteStore.updateStats(state.altitude, state.velocity);
  }

  function startPhysics() {
    if (ticker) ticker.kill();
    
    ticker = gsap.to({}, {
      duration: 0.1,
      repeat: -1,
      onRepeat: updatePhysics
    });

    gsap.to(parachutist, {
      rotation: 2,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  onMount(() => {
    viewportWidth = window.innerWidth;
    const handleResize = () => viewportWidth = window.innerWidth;
    window.addEventListener('resize', handleResize);
    
    startAnimation = startPhysics;
    startPhysics();
    
    return () => window.removeEventListener('resize', handleResize);
  });

  onDestroy(() => {
    if (ticker) ticker.kill();
  });
  
  $: isSmallViewport = viewportWidth < 768;
  $: chuteSize = isSmallViewport ? 'w-24 md:w-32' : 'w-32 md:w-40 lg:w-48';
</script>

<div 
  bind:this={container} 
  class="relative h-full overflow-hidden scene-layer"
>
  <!-- Background with Flying Objects -->
  <div class="absolute inset-0 overflow-hidden">
    <FlyingObjects velocity={currentState.velocity} />
  </div>

  <!-- Centered Parachute -->
  <div class="absolute inset-0 flex items-center justify-center z-20">
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
  /* Establish proper 3D context */
  div {
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
  
  img {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform;
  }
</style>