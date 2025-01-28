<!-- src/lib/(space)/components/chute/Parachutist.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { chuteStore } from '../../stores/chuteStore';
  import { PHYSICS } from './physics';
  import { VIEWPORT } from './coordinates';
  
  export let startAnimation: () => void;
  
  let parachutist: HTMLImageElement;
  let ticker: gsap.core.Tween;
  let viewportWidth = 0;
  
  $: size = viewportWidth < 768 
    ? VIEWPORT.parachutist.size * 0.8  // Smaller on mobile
    : VIEWPORT.parachutist.size;       // Base size in vh
  
  let currentState = {
    time: 0,
    velocity: 0,
    altitude: PHYSICS.INITIAL_ALTITUDE
  };

  function updatePhysics() {
    currentState.time = (currentState.time + 0.1) % 1;
    const state = PHYSICS.calculateState(
      currentState.time * PHYSICS.ANIMATION_DURATION, 
      $chuteStore.planet
    );
    
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

    // Subtle sway animation using viewport units
    gsap.to(parachutist, {
      rotation: "random(-2,2)",
      duration: "random(3,5)",
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  }

  onMount(() => {
    startAnimation = startPhysics;
    startPhysics();
    viewportWidth = window.innerWidth;
    
    const handleResize = () => {
      viewportWidth = window.innerWidth;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  onDestroy(() => {
    if (ticker) ticker.kill();
  });
</script>

<div class="relative transform-gpu">
  <div class="relative z-20 flex justify-center">
    <img
      bind:this={parachutist}
      src="/space/assets/paraglider.svg"
      alt="Paraglider"
      class="transform-gpu will-change-transform transition-transform duration-300
             drop-shadow-xl filter brightness-110"
      style="height: {size}vh; width: auto; transform-origin: center center;"
    />
  </div>
</div>

<style>
  img {
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }
</style>