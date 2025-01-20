<!-- src/lib/(space)/components/chute/ChuteScene.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import FlyingObjects from './FlyingObjects.svelte';
  
  export let startAnimation: () => void;
  let parachutist: HTMLImageElement;
  let ticker: gsap.core.Tween;

  function startSwing() {
    if (ticker) ticker.kill();
    
    ticker = gsap.to(parachutist, {
      rotation: 2,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  onMount(() => {
    startAnimation = startSwing;
    startSwing();
  });

  onDestroy(() => {
    if (ticker) ticker.kill();
  });
</script>

<div class="relative h-screen w-full overflow-hidden">
  <!-- Background with Flying Objects -->
  <div class="absolute inset-0">
    <FlyingObjects />
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