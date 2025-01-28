<!-- src/lib/(space)/components/chute/FlyingObjects.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { chuteStore } from '../../stores/chuteStore';
  
  export let targetX: string;
  export let targetY: string;
  export let velocity = 5;

  const OBJECTS = [
    { path: '/space/assets/cloud.svg', scale: 0.6 },
    { path: '/space/assets/ingenuity.svg', scale: 0.4 },
    { path: '/space/assets/investor.svg', scale: 0.4 },
    { path: '/space/assets/starman.png', scale: 0.35 },
    { path: '/space/assets/cloud.svg', scale: 0.5 },
    { path: '/space/assets/ingenuity.svg', scale: 0.35 }
  ] as const;

  // Generate random positions for each object
  const positions = OBJECTS.map(() => ({
    x: (Math.random() - 0.5) * 40,  // ±20vw from target
    delay: Math.random() * 3        // Stagger the animations
  }));

  $: animationDuration = Math.max(5, 15 / Math.max(velocity, 1));
</script>

<div class="fixed inset-0 h-screen overflow-hidden pointer-events-none">
  <div class="relative h-full">
    {#each OBJECTS.map((obj, i) => ({ ...obj, ...positions[i] })) as { path, scale, x, delay }, i}
      <img
        src={path}
        alt={`Flying object ${i + 1}`}
        class="absolute transform-gpu drop-shadow-xl animate-float"
        style="
          height: {8 * scale}vh;
          width: auto;
          left: calc({targetX} + {x}vw);
          animation-duration: {animationDuration}s;
          animation-delay: {delay}s;
          z-index: {10 + i};
        "
      />
    {/each}
  </div>
</div>

<style>
  @keyframes float {
    from { 
      transform: translateY(120vh);
      opacity: 0;
    }
    10% {
      opacity: 0.8;
    }
    90% {
      opacity: 0.8;
    }
    to { 
      transform: translateY(-20vh);
      opacity: 0;
    }
  }

  .animate-float {
    animation: float linear infinite;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform;
  }
</style>