<!-- src/lib/(space)/components/chute/FlyingObjects.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { chuteStore } from '../../stores/chuteStore';
  import { fade, fly } from 'svelte/transition';
  
  export let targetX: string;
  export let targetY: string;
  
  const OBJECTS = [
    { path: '/space/assets/cloud.svg', scale: 0.6, speed: 1.2, offset: 15 },
    { path: '/space/assets/ingenuity.svg', scale: 0.4, speed: 1, offset: -20 },
    { path: '/space/assets/investor.svg', scale: 0.4, speed: 0.9, offset: 25 },
    { path: '/space/assets/starman.png', scale: 0.35, speed: 0.8, offset: -15 },
    { path: '/space/assets/cloud.svg', scale: 0.5, speed: 1.1, offset: 20 }
  ] as const;

  let activeObjects: Array<{ 
    id: number;
    x: number;
    path: string;
    scale: number;
    speed: number;
  }> = [];

  function createObject(index: number) {
    const obj = OBJECTS[index % OBJECTS.length];
    const randomOffset = (Math.random() - 0.5) * 30; // ±15vw
    
    return {
      id: Date.now() + Math.random(),
      x: parseFloat(targetX) + obj.offset + randomOffset,
      path: obj.path,
      scale: obj.scale,
      speed: obj.speed
    };
  }

  function addObject() {
    if (!$chuteStore.isPlaying) return;
    
    const index = Math.floor(Math.random() * OBJECTS.length);
    activeObjects = [...activeObjects, createObject(index)];
    
    // Remove old objects to prevent memory issues
    if (activeObjects.length > 8) {
      activeObjects = activeObjects.slice(-8);
    }
  }

  let interval: ReturnType<typeof setInterval>;

  $: if ($chuteStore.isPlaying) {
    interval = setInterval(addObject, 2000);
  } else {
    clearInterval(interval);
  }

  onMount(() => {
    // Initialize with a few objects
    for (let i = 0; i < 3; i++) {
      addObject();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  });
</script>

<div class="fixed inset-0 h-screen overflow-hidden pointer-events-none">
  {#each activeObjects as object (object.id)}
    <img
      src={object.path}
      alt="Flying object"
      class="absolute transform-gpu drop-shadow-xl"
      style="
        height: {8 * object.scale}vh;
        width: auto;
        left: {object.x}vw;
      "
      in:fade={{ duration: 500 }}
      out:fly={{ y: -1000, duration: 15000 / object.speed }}
    />
  {/each}
</div>

<style>
  img {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform;
  }
</style>