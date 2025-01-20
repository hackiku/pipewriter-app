<!-- src/lib/(space)/components/chute/FlyingObjects.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  
  // Animation Config
  const VELOCITY = 5;              // Base movement speed multiplier
  const BASE_DURATION = 15;        // Base duration in seconds
  const SPACING = 1.2;            // Vertical spacing multiplier (> 1 = more space)
  const STAGGER_OFFSET = 0.8;     // Delay between objects (0-1)

  // Object Definitions
  const OBJECTS = [
    { path: '/space/assets/cloud.svg', scale: 0.6, x: 20, speed: 1.2 },
    { path: '/space/assets/ingenuity.svg', scale: 0.4, x: 70, speed: 1 },
    { path: '/space/assets/investor.svg', scale: 0.4, x: 40, speed: 0.9 },
    { path: '/space/assets/starman.png', scale: 0.35, x: 80, speed: 0.8 },
    { path: '/space/assets/cloud.svg', scale: 0.5, x: 30, speed: 1.1 },
    { path: '/space/assets/ingenuity.svg', scale: 0.35, x: 60, speed: 1 }
  ] as const;

  // Visual Config
  const VISUAL = {
    baseOpacity: 0.8,
    brightness: 105,
    shadowSize: 'lg'
  } as const;

  let container: HTMLDivElement;
  let mainTl: gsap.core.Timeline;

  function startMarquee() {
    if (mainTl) mainTl.kill();
    mainTl = gsap.timeline();
    
    // Initial positions
    gsap.set(container.children, {
      y: (i) => window.innerHeight + (i * (window.innerHeight * SPACING / OBJECTS.length)),
      opacity: VISUAL.baseOpacity,
      scale: (i) => OBJECTS[i].scale
    });

    // Continuous motion
    OBJECTS.forEach((obj, i) => {
      const element = container.children[i];
      gsap.to(element, {
        y: -100,
        duration: BASE_DURATION / (obj.speed * VELOCITY),
        repeat: -1,
        ease: 'none',
        delay: i * (BASE_DURATION * STAGGER_OFFSET / OBJECTS.length)
      });
    });
  }

  onMount(() => {
    startMarquee();
  });

  onDestroy(() => {
    if (mainTl) mainTl.kill();
  });
</script>

<div class="absolute inset-0 h-screen">
  <div bind:this={container} class="relative h-full">
    {#each OBJECTS as object}
      <img
        src={object.path}
        alt="Flying object"
        class="absolute w-16 md:w-20 lg:w-24 transform-gpu 
               drop-shadow-{VISUAL.shadowSize}"
        style="
          left: {object.x}%;
          filter: brightness({VISUAL.brightness}%);
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