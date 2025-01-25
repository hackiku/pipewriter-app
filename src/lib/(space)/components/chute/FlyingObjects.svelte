<!-- FlyingObjects.svelte - Simplified version that works -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  
  export let velocity = 5;  // Base speed for animations
  export let targetX = '65vw';  // Chute position
  export let targetY = '35vh';

  // Object Definitions - Keep same objects
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
    const angle = (index / OBJECTS.length) * Math.PI * 2;
    
    // Start from planet's circumference
    const radius = Math.min(window.innerWidth, window.innerHeight);
    const startX = Math.cos(angle) * radius;
    const startY = Math.sin(angle) * radius + radius; // Offset to place planet below

    gsap.fromTo(element,
      {
        x: startX,
        y: startY,
        scale: obj.scale,
        opacity: 0
      },
      {
        x: targetX,
        y: targetY,
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

<div class="absolute inset-0 h-screen overflow-hidden pointer-events-none">
  <div bind:this={container} class="relative h-full">
    {#each OBJECTS as object}
      <img
        src={object.path}
        alt="Flying object"
        class="absolute w-16 md:w-20 lg:w-24 transform-gpu 
               drop-shadow-lg"
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