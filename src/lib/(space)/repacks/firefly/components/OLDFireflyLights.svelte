<!-- src/lib/(space)/repacks/firefly/components/FireflyLights.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  // Number of lights to generate
  export let count = 50;
  
  type Light = {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  };
  
  let lights: Light[] = [];
  
  onMount(() => {
    // Generate random lights
    lights = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 2 + 1, // 1-3px
      duration: Math.random() * 3 + 2, // 2-5s
      delay: Math.random() * 10 // 0-10s initial delay
    }));
  });
</script>

<div class="fixed inset-0 pointer-events-none z-0">
  {#each lights as light (light.id)}
    <div
      class="absolute w-1 h-1 bg-[#F5FF00] rounded-full opacity-0"
      style="
        left: {light.x}%;
        top: {light.y}%;
        width: {light.size}px;
        height: {light.size}px;
        animation: flicker {light.duration}s infinite {light.delay}s;
      "
    />
  {/each}
</div>

<style>
  @keyframes flicker {
    0%, 100% { 
      opacity: 0;
      filter: blur(0px);
    }
    25% { 
      opacity: 0.1;
      filter: blur(0px);
    }
    50% { 
      opacity: 0.5;
      filter: blur(1px);
    }
    75% { 
      opacity: 0.1;
      filter: blur(0px);
    }
  }
</style>