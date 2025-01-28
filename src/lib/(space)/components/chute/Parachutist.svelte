<!-- src/lib/(space)/components/chute/Parachutist.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { chuteStore } from '../../stores/chuteStore';
  import { PHYSICS } from './physics';
  import { VIEWPORT } from './coordinates';
  
  export let startAnimation: () => void;
  export let pauseAnimation: () => void;
  
  let parachutist: HTMLImageElement;
  let animationFrame: number;
  let viewportWidth = 0;
  let lastTime = 0;
  let elapsedTime = 0;
  
  // Increase base size and add more dramatic mobile scaling
  $: size = viewportWidth < 768 
    ? VIEWPORT.parachutist.size * 1.2  // 20% larger on mobile
    : VIEWPORT.parachutist.size * 1.5;  // 50% larger on desktop

  function updatePhysics(timestamp: number) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if (!$chuteStore.isPlaying) return;
    
    elapsedTime += deltaTime;
    if (elapsedTime >= PHYSICS.ANIMATION_DURATION) {
      elapsedTime = 0;
    }
    
    const state = PHYSICS.calculateState(elapsedTime, $chuteStore.planet);
    chuteStore.updateStats(state.altitude, state.velocity);

    if ($chuteStore.isPlaying) {
      animationFrame = requestAnimationFrame(updatePhysics);
    }
  }

  function startPhysics() {
    lastTime = 0;
    chuteStore.setPlaying(true);
    animationFrame = requestAnimationFrame(updatePhysics);
  }

  function pausePhysics() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = undefined;
    }
    chuteStore.setPlaying(false);
  }

  onMount(() => {
    startAnimation = startPhysics;
    pauseAnimation = pausePhysics;
    viewportWidth = window.innerWidth;
    
    const handleResize = () => {
      viewportWidth = window.innerWidth;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  onDestroy(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });
</script>

<div class="relative transform-gpu">
  <div class="relative z-20 flex justify-center">
    <img
      bind:this={parachutist}
      src="/space/assets/paraglider.svg"
      alt="Paraglider"
      class="transform-gpu will-change-transform transition-transform duration-300
             drop-shadow-xl filter brightness-110 animate-float"
      style="height: {size}vh; width: auto; transform-origin: center center;"
    />
  </div>
</div>

<style>
  @keyframes float {
    0% { 
      transform: rotate(-3deg) translateX(-8px) translateY(-4px);
    }
    50% {
      transform: rotate(0deg) translateX(0px) translateY(4px);
    }
    100% { 
      transform: rotate(3deg) translateX(8px) translateY(-4px);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  img {
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }
</style>