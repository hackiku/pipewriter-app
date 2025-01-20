<!-- src/lib/(space)/components/chute/FlyingObjects.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { fade } from 'svelte/transition';

  // Types for our flying objects
  type ObjectType = 'cloud' | 'ingenuity' | 'investor' | 'starman';
  
  interface FlyingObject {
    type: ObjectType;
    x: number;
    y: number;
    scale: number;
    speed: number;
    delay: number;
  }

  // Configuration for different object types
  const OBJECT_CONFIGS = {
    cloud: { 
      path: '/space/assets/cloud.svg',
      minScale: 0.5,
      maxScale: 2,
      count: 6
    },
    ingenuity: {
      path: '/space/assets/ingenuity.svg',
      minScale: 0.3,
      maxScale: 0.6,
      count: 2
    },
    investor: {
      path: '/space/assets/investor.svg',
      minScale: 0.4,
      maxScale: 0.7,
      count: 1
    },
    starman: {
      path: '/space/assets/starman.svg',
      minScale: 0.3,
      maxScale: 0.5,
      count: 2
    }
  };

  // Generate random objects
  function generateObjects(): FlyingObject[] {
    const objects: FlyingObject[] = [];
    
    Object.entries(OBJECT_CONFIGS).forEach(([type, config]) => {
      for (let i = 0; i < config.count; i++) {
        objects.push({
          type: type as ObjectType,
          x: Math.random() * 100, // Random X position (%)
          y: Math.random() * 100, // Random Y position (%)
          scale: config.minScale + Math.random() * (config.maxScale - config.minScale),
          speed: 15 + Math.random() * 10, // Random speed (seconds)
          delay: Math.random() * 5 // Random delay (seconds)
        });
      }
    });
    
    return objects;
  }

  let objects = generateObjects();
  let objectRefs: HTMLImageElement[] = [];

  function animateObject(element: HTMLImageElement, object: FlyingObject) {
    gsap.fromTo(element,
      { 
        yPercent: 120,
        opacity: 0,
        scale: object.scale
      },
      {
        yPercent: -120,
        opacity: el => {
          // Fade in/out at edges
          gsap.to(el, {
            opacity: 0,
            duration: 1,
            ease: 'power1.in',
            scrollTrigger: {
              trigger: el,
              start: 'top center',
              end: 'bottom center',
              scrub: true
            }
          });
          return 0.8;
        },
        duration: object.speed,
        delay: object.delay,
        repeat: -1,
        ease: 'none'
      }
    );
  }

  onMount(() => {
    objectRefs.forEach((el, i) => {
      if (el) animateObject(el, objects[i]);
    });
  });
</script>

<div class="absolute inset-0 overflow-hidden pointer-events-none">
  <!-- Gradient overlays -->
  <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
  <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
  
  <!-- Flying objects -->
  {#each objects as object, i}
    <img
      bind:this={objectRefs[i]}
      src={OBJECT_CONFIGS[object.type].path}
      alt={`Flying ${object.type}`}
      class="absolute w-24 opacity-0"
      style="left: {object.x}%;"
      transition:fade
    />
  {/each}
</div>

<style>
  img {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
</style>