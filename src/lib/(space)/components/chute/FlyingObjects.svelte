<!-- src/lib/(space)/components/chute/FlyingObjects.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  
  const OBJECTS = [
    { path: '/space/assets/cloud.svg', scale: 0.6, x: 20 },
    { path: '/space/assets/ingenuity.svg', scale: 0.4, x: 70 },
    { path: '/space/assets/investor.svg', scale: 0.4, x: 40 },
    { path: '/space/assets/starman.png', scale: 0.35, x: 80 },
    { path: '/space/assets/cloud.svg', scale: 0.5, x: 30 },
    { path: '/space/assets/ingenuity.svg', scale: 0.35, x: 60 }
  ];

  let container: HTMLDivElement;
  let mainTl: gsap.core.Timeline;

  function startMarquee() {
    if (mainTl) mainTl.kill();
    
    mainTl = gsap.timeline();
    
    // Set initial positions (staggered vertically)
    gsap.set(container.children, {
      y: (i) => window.innerHeight + (i * (window.innerHeight / OBJECTS.length)),
      opacity: 0.8,
      scale: (i) => OBJECTS[i].scale
    });

    // Create continuous upward motion
    OBJECTS.forEach((_, i) => {
      const element = container.children[i];
      gsap.to(element, {
        y: -100,
        duration: 30,
        repeat: -1,
        ease: 'none',
        delay: i * (30 / OBJECTS.length)
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

<div class="absolute h-screen inset-0 bg-red-800/10">
  <div bind:this={container} class="relative ">
    {#each OBJECTS as object}
      <img
        src={object.path}
        alt="Flying object"
        class="absolute w-16 md:w-20 lg:w-24 transform-gpu drop-shadow-lg"
        style="left: {object.x}%"
      />
    {/each}
  </div>
</div>