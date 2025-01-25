<!-- src/lib/(space)/components/chute/Parachutist.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { chuteStore } from '../../stores/chuteStore';
  import { PHYSICS } from './physics';
  
  export let startAnimation: () => void;
  let parachutist: HTMLImageElement;
  let ticker: gsap.core.Tween;
  
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

    // More natural parachute sway
    gsap.to(parachutist, {
      rotation: "random(-3,3)",
      duration: "random(2,4)",
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  }

  onMount(() => {
    startAnimation = startPhysics;
    startPhysics();
  });

  onDestroy(() => {
    if (ticker) ticker.kill();
  });
</script>

<div class="relative w-full">
  <!-- Parachutist -->
  <div class="relative z-20 flex justify-center">
    <img
      bind:this={parachutist}
      src="/space/assets/paraglider.svg"
      alt="Paraglider"
      class="w-24 md:w-32 lg:w-40 transform-gpu drop-shadow-xl
             transition-transform duration-300"
    />
  </div>
</div>