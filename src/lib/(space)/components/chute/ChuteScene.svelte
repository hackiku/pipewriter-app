<!-- src/lib/(space)/components/chute/ChuteScene.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { chuteStore } from '../../stores/chuteStore';
  import { PHYSICS } from './physics';
  import FlyingObjects from './FlyingObjects.svelte';
  
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
    
    // Physics update ticker
    ticker = gsap.to({}, {
      duration: 0.1,
      repeat: -1,
      onRepeat: updatePhysics
    });

    // Gentle parachute sway
    gsap.to(parachutist, {
      rotation: 2,
      duration: 2,
      ease: 'power1.inOut',
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

<div class="relative h-screen w-full overflow-hidden">
  <!-- Background with Flying Objects -->
  <div class="absolute inset-0">
    <FlyingObjects velocity={currentState.velocity} />
  </div>

  <!-- Centered Parachute -->
  <div class="absolute inset-x-0 top-[35%] lg:top-[30%] 
              flex justify-center z-20 transition-all duration-300">
    <img
      bind:this={parachutist}
      src="/space/assets/paraglider.svg"
      alt="Paraglider"
      class="w-24 md:w-32 lg:w-40 transform-gpu drop-shadow-xl
             transition-transform duration-300"
    />
  </div>
</div>