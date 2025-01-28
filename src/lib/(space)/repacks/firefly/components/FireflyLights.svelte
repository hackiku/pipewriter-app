<!-- $lib/components/FireflyLights.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  export let count = 50;
  
  type Light = {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    glowSize: number;
    direction: number; // Angle in degrees
    speed: number;
  };
  
  let lights: Light[] = [];
  
  onMount(() => {
    lights = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 200,
      size: Math.random() * 2 + 1, // Bigger size variation (1-3px)
      duration: (Math.random() * 4 + 3).toFixed(2),
      delay: (Math.random() * 10).toFixed(2),
      glowSize: Math.random() * 4 + 2, // Bigger glow variation
      direction: Math.random() * 360, // Random angle
      speed: Math.random() * 20 + 10 // Random speed 10-30
    }));
  });
</script>

<div class="fixed inset-0 bg-zinc-950">
  {#each lights as light (light.id)}
    <div
      class="absolute rounded-full firefly"
      style="
        left: {light.x}%;
        top: {light.y}%;
        width: {light.size}px;
        height: {light.size}px;
        --duration: {light.duration}s;
        --delay: {light.delay}s;
        --direction: {light.direction}deg;
        --speed: {light.speed};
        animation-delay: {light.delay}s;
        box-shadow: 0 0 {light.glowSize}px {light.glowSize}px rgba(245, 255, 0, 0.15);
        background: #F5FF00;
      "
    />
  {/each}
</div>

<style>
  .firefly {
    opacity: 0;
    will-change: transform, opacity;
    animation: 
      glow var(--duration) infinite ease-in-out,
      float calc(var(--duration) * 2) infinite linear;
  }

  @keyframes glow {
    0%, 100% { 
      opacity: 0;
      scale: 0.3;
    }
    35% { 
      opacity: 0.8;
      scale: 1;
    }
    70% { 
      opacity: 0;
      scale: 0.3;
    }
  }

  @keyframes float {
    from {
      transform: translate(0, 0) rotate(var(--direction));
    }
    to {
      transform: translate(calc(var(--speed) * 1vw), 0) rotate(var(--direction));
    }
  }
</style>