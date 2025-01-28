<!-- src/lib/(space)/components/chute/FlyingObjects.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { VIEWPORT } from './coordinates';
  
  export let targetX: string;
  export let targetY: string;
  export let velocity = 5;

  const OBJECTS = [
    { path: '/space/assets/cloud.svg', scale: 0.6, speed: 1.2 },
    { path: '/space/assets/ingenuity.svg', scale: 0.4, speed: 1 },
    { path: '/space/assets/investor.svg', scale: 0.4, speed: 0.9 },
    { path: '/space/assets/starman.png', scale: 0.35, speed: 0.8 },
    { path: '/space/assets/cloud.svg', scale: 0.5, speed: 1.1 },
    { path: '/space/assets/ingenuity.svg', scale: 0.35, speed: 1 }
  ] as const;

  let container: HTMLDivElement;
  let mainTl: gsap.core.Timeline;

  function animateObject(element: HTMLElement, index: number) {
    const obj = OBJECTS[index];
    // Calculate lateral offset from target
    const lateralOffset = (Math.random() - 0.5) * 30; // ±15vw from target
    
    // Parse target position to numbers for calculations
    const targetXNum = parseFloat(targetX);
    const startX = targetXNum + lateralOffset;
    
    gsap.fromTo(element,
      {
        x: `${startX}vw`,
        y: '120vh', // Start below viewport
        scale: obj.scale,
        opacity: 0
      },
      {
        x: `${startX}vw`, // Maintain X position
        y: '-20vh',      // End above viewport
        opacity: 0.8,
        duration: 15 / (velocity * obj.speed),
        ease: 'none',
        repeat: -1,
        delay: index * (2 / OBJECTS.length)
      }
    );
  }

  function startAnimations() {
    if (mainTl) mainTl.kill();
    mainTl = gsap.timeline();
    
    const elements = container?.children;
    if (elements) {
      Array.from(elements).forEach((el, i) => {
        animateObject(el as HTMLElement, i);
      });
    }
  }

  onMount(() => {
    startAnimations();
  });

  onDestroy(() => {
    if (mainTl) mainTl.kill();
  });
</script>

<div class="fixed inset-0 h-screen overflow-hidden pointer-events-none">
  <div bind:this={container} class="relative h-full">
    {#each OBJECTS as object, i}
      <img
        src={object.path}
        alt={`Flying object ${i + 1}`}
        class="absolute transform-gpu drop-shadow-xl"
        style="
          height: {8 * object.scale}vh;
          width: auto;
          z-index: {10 + i};
          opacity: 0.8;
        "
      />
    {/each}
  </div>
</div>

<style>
  img {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform;
  }
</style>