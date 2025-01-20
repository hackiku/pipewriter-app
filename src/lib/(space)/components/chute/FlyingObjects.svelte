<!-- src/lib/(space)/components/chute/FlyingObjects.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { fade } from 'svelte/transition';
  import { chuteStore } from '../../stores/chuteStore';

  // Types for our flying objects
  type ObjectType = 'cloud' | 'ingenuity' | 'investor' | 'starman';
  
  interface FlyingObject {
    type: ObjectType;
    x: number;
    y: number;
    scale: number;
    speed: number;
    delay: number;
    opacity: number;
  }

  // Configuration for different object types
  const OBJECT_CONFIGS = {
    cloud: { 
      path: '/space/assets/cloud.svg',
      minScale: 0.5,
      maxScale: 2,
      count: 6,
      baseOpacity: 0.4
    },
    ingenuity: {
      path: '/space/assets/ingenuity.svg',
      minScale: 0.3,
      maxScale: 0.6,
      count: 2,
      baseOpacity: 0.8
    },
    investor: {
      path: '/space/assets/investor.svg',
      minScale: 0.4,
      maxScale: 0.7,
      count: 1,
      baseOpacity: 0.6
    },
    starman: {
      path: '/space/assets/starman.svg',
      minScale: 0.3,
      maxScale: 0.5,
      count: 2,
      baseOpacity: 0.7
    }
  };

  // Generate random objects with better distribution
  function generateObjects(): FlyingObject[] {
    const objects: FlyingObject[] = [];
    
    Object.entries(OBJECT_CONFIGS).forEach(([type, config]) => {
      for (let i = 0; i < config.count; i++) {
        // Distribute X positions more evenly across viewport
        const segment = 100 / config.count;
        const x = (segment * i) + (Math.random() * segment * 0.8);
        
        objects.push({
          type: type as ObjectType,
          x,
          y: 120 + Math.random() * 30, // Start below viewport
          scale: config.minScale + Math.random() * (config.maxScale - config.minScale),
          speed: 15 + Math.random() * 10, // Seconds to cross viewport
          delay: Math.random() * 5,
          opacity: config.baseOpacity
        });
      }
    });
    
    return objects;
  }

  let objects = generateObjects();
  let objectRefs: HTMLImageElement[] = [];

  function animateObject(element: HTMLImageElement, object: FlyingObject) {
    // Reset position if animation stopped
    gsap.set(element, {
      yPercent: 120,
      opacity: 0,
      scale: object.scale,
      rotation: -5 + Math.random() * 10
    });

    // Main animation
    gsap.to(element, {
      yPercent: -120,
      duration: object.speed,
      delay: object.delay,
      repeat: -1,
      ease: 'none',
      onRepeat: () => {
        // Randomize X position on repeat
        gsap.set(element, { 
          xPercent: -20 + Math.random() * 40,
          rotation: -5 + Math.random() * 10
        });
      }
    });

    // Independent opacity animation for smooth fade in/out
    gsap.to(element, {
      opacity: object.opacity,
      duration: object.speed * 0.2,
      delay: object.delay,
      repeat: -1,
      yoyo: true,
      repeatDelay: object.speed * 0.6,
      ease: 'power1.inOut'
    });
  }

  onMount(() => {
    // Initialize all animations
    objectRefs.forEach((el, i) => {
      if (el) animateObject(el, objects[i]);
    });

    // Restart animations on planet change
    return chuteStore.subscribe(() => {
      objectRefs.forEach((el, i) => {
        if (el) animateObject(el, objects[i]);
      });
    });
  });
</script>

<!-- Main container with expanded boundaries -->
<div class="fixed inset-0 overflow-hidden pointer-events-none">
  <!-- Gradient overlays for smooth edges -->
  <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
  <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
  
  <!-- Flying objects container -->
  <div class="relative w-full h-full">
    {#each objects as object, i}
      <img
        bind:this={objectRefs[i]}
        src={OBJECT_CONFIGS[object.type].path}
        alt={`Flying ${object.type}`}
        class="absolute w-24 opacity-0"
        style="left: {object.x}%;"
        transition:fade={{ duration: 1000 }}
      />
    {/each}
  </div>
</div>

<style>
  img {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }
</style>