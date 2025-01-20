<!-- src/lib/(space)/components/chute/FlyingObjects.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { fade } from 'svelte/transition';
  
  export let velocity: number = 0;
  
  const OBJECT_CONFIGS = {
    cloud: { 
      path: '/space/assets/cloud.svg',
      minScale: 0.8,
      maxScale: 1.8,
      count: 4,
      baseOpacity: 0.7
    },
    ingenuity: {
      path: '/space/assets/ingenuity.svg',
      minScale: 0.4,
      maxScale: 0.7,
      count: 2,
      baseOpacity: 0.9
    },
    investor: {
      path: '/space/assets/investor.svg',
      minScale: 0.5,
      maxScale: 0.8,
      count: 1,
      baseOpacity: 0.85
    },
    starman: {
      path: '/space/assets/starman.png',
      minScale: 0.4,
      maxScale: 0.6,
      count: 1,
      baseOpacity: 0.9
    }
  } as const;

  type ObjectType = keyof typeof OBJECT_CONFIGS;
  
  interface FlyingObject {
    type: ObjectType;
    x: number;
    y: number;
    scale: number;
    baseSpeed: number;
    delay: number;
    opacity: number;
  }

  function generateObjects(): FlyingObject[] {
    const objects: FlyingObject[] = [];
    
    Object.entries(OBJECT_CONFIGS).forEach(([type, config]) => {
      for (let i = 0; i < config.count; i++) {
        const segment = 100 / (config.count + 1);
        const x = (segment * (i + 1)) + (Math.random() * segment * 0.5 - segment * 0.25);
        
        objects.push({
          type: type as ObjectType,
          x,
          y: 110 + Math.random() * 20,
          scale: config.minScale + Math.random() * (config.maxScale - config.minScale),
          baseSpeed: 15 + Math.random() * 10,
          delay: Math.random() * 2,
          opacity: config.baseOpacity
        });
      }
    });
    
    return objects;
  }

  let objects = generateObjects();
  let objectRefs: HTMLImageElement[] = [];
  let animations: gsap.core.Tween[] = [];

  function updateAnimationSpeeds() {
    const speedMultiplier = Math.max(0.2, Math.abs(velocity) / 10);
    
    animations.forEach((tween, i) => {
      const object = objects[i];
      if (tween && object) {
        tween.timeScale(speedMultiplier);
      }
    });
  }

  function animateObject(element: HTMLImageElement, object: FlyingObject, index: number) {
    // Clear existing animation if any
    if (animations[index]) animations[index].kill();

    gsap.set(element, {
      yPercent: 120,
      opacity: 0,
      scale: object.scale,
      rotation: -5 + Math.random() * 10
    });

    // Main movement animation
    animations[index] = gsap.to(element, {
      yPercent: -120,
      duration: object.baseSpeed,
      delay: object.delay,
      repeat: -1,
      ease: 'none',
      onRepeat: () => {
        gsap.set(element, { 
          xPercent: -10 + Math.random() * 20,
          rotation: -5 + Math.random() * 10,
          scale: object.scale * (0.95 + Math.random() * 0.1)
        });
      }
    });

    // Separate opacity animation
    gsap.to(element, {
      opacity: object.opacity,
      duration: object.baseSpeed * 0.15,
      delay: object.delay,
      repeat: -1,
      yoyo: true,
      repeatDelay: object.baseSpeed * 0.7,
      ease: 'power2.inOut'
    });
  }

  $: {
    if (velocity !== undefined) {
      updateAnimationSpeeds();
    }
  }

  onMount(() => {
    objectRefs.forEach((el, i) => {
      if (el) animateObject(el, objects[i], i);
    });
  });

  onDestroy(() => {
    animations.forEach(tween => tween?.kill());
  });
</script>

<!-- <div class="relative w-full h-[200vh] -translate-y-[100vh]"> -->
<div class="relative w-full ">
  {#each objects as object, i}
    <img
      bind:this={objectRefs[i]}
      src={OBJECT_CONFIGS[object.type].path}
      alt={`Flying ${object.type}`}
      class="absolute w-24 md:w-32 lg:w-40 opacity-0 
             drop-shadow-xl brightness-110"
      style="
        left: {object.x}%;
        transform-origin: center center;
        z-index: {Math.floor(object.y)};
      "
      transition:fade={{ duration: 1000 }}
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