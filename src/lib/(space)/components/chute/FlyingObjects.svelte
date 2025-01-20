<!-- src/lib/(space)/components/chute/FlyingObjects.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { fade } from 'svelte/transition';
  import { chuteStore } from '../../stores/chuteStore';
  
  // Increased base opacities and adjusted scales
  const OBJECT_CONFIGS = {
    cloud: { 
      path: '/space/assets/cloud.svg',
      minScale: 0.8,
      maxScale: 2.5,
      count: 6,
      baseOpacity: 0.6  // Increased from 0.4
    },
    ingenuity: {
      path: '/space/assets/ingenuity.svg',
      minScale: 0.4,
      maxScale: 0.8,
      count: 2,
      baseOpacity: 0.9  // Increased from 0.8
    },
    investor: {
      path: '/space/assets/investor.svg',
      minScale: 0.5,
      maxScale: 0.9,
      count: 1,
      baseOpacity: 0.8  // Increased from 0.6
    },
    starman: {
      path: '/space/assets/starman.svg',
      minScale: 0.4,
      maxScale: 0.7,
      count: 2,
      baseOpacity: 0.85  // Increased from 0.7
    }
  };

  function generateObjects(): FlyingObject[] {
    const objects: FlyingObject[] = [];
    
    Object.entries(OBJECT_CONFIGS).forEach(([type, config]) => {
      for (let i = 0; i < config.count; i++) {
        // Better distribution with offset
        const segment = 100 / (config.count + 1);
        const x = (segment * (i + 1)) + (Math.random() * segment * 0.5 - segment * 0.25);
        
        objects.push({
          type: type as ObjectType,
          x,
          y: 120 + Math.random() * 30,
          scale: config.minScale + Math.random() * (config.maxScale - config.minScale),
          speed: 20 + Math.random() * 15, // Increased speed range
          delay: Math.random() * 3, // Reduced initial delay
          opacity: config.baseOpacity
        });
      }
    });
    
    return objects;
  }

  let objects = generateObjects();
  let objectRefs: HTMLImageElement[] = [];

  function animateObject(element: HTMLImageElement, object: FlyingObject) {
    gsap.set(element, {
      yPercent: 120,
      opacity: 0,
      scale: object.scale,
      rotation: -5 + Math.random() * 10
    });

    // Smoother animation with better easing
    gsap.to(element, {
      yPercent: -120,
      duration: object.speed,
      delay: object.delay,
      repeat: -1,
      ease: 'none',
      onRepeat: () => {
        gsap.set(element, { 
          xPercent: -20 + Math.random() * 40,
          rotation: -5 + Math.random() * 10,
          scale: object.scale * (0.9 + Math.random() * 0.2) // Slight scale variation
        });
      }
    });

    // Enhanced opacity animation
    gsap.to(element, {
      opacity: object.opacity,
      duration: object.speed * 0.15, // Faster fade
      delay: object.delay,
      repeat: -1,
      yoyo: true,
      repeatDelay: object.speed * 0.7,
      ease: 'power2.inOut'
    });
  }

  onMount(() => {
    objectRefs.forEach((el, i) => {
      if (el) animateObject(el, objects[i]);
    });

    return chuteStore.subscribe(() => {
      objectRefs.forEach((el, i) => {
        if (el) animateObject(el, objects[i]);
      });
    });
  });
</script>

<div class="fixed inset-0 overflow-hidden pointer-events-none">
  <!-- Enhanced gradient overlays -->
  <div class="absolute inset-x-0 top-0 h-48 
              bg-gradient-to-b from-background via-background/90 to-transparent z-10" />
  <div class="absolute inset-x-0 bottom-0 h-48 
              bg-gradient-to-t from-background via-background/90 to-transparent z-10" />
              
  <!-- Side gradients - confine objects to chute width -->
  <div class="absolute inset-y-0 left-0 w-48
              bg-gradient-to-r from-background via-background/90 to-transparent z-10" />
  <div class="absolute inset-y-0 right-0 w-48
              bg-gradient-to-l from-background via-background/90 to-transparent z-10" />
  
  <!-- Flying objects container -->
  <div class="relative w-full h-[200vh] -translate-y-[100vh]">
    {#each objects as object, i}
      <img
        bind:this={objectRefs[i]}
        src={OBJECT_CONFIGS[object.type].path}
        alt={`Flying ${object.type}`}
        class="absolute w-24 md:w-32 lg:w-40 opacity-0 
               drop-shadow-2xl brightness-125"
        style="
          left: {object.x}%;
          filter: contrast(1.2) brightness(1.3);
          transform-origin: center center;
        "
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
