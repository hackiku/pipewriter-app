<!-- src/lib/pages/space/components/chute/ChuteMath.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { RotateCcw } from 'lucide-svelte';
  
  // Configuration
  const CONFIG = {
    INITIAL_ALTITUDE: 95935.8, // X-15 record
    FINAL_ALTITUDE: 300,
    INITIAL_VELOCITY: 0,
    FINAL_VELOCITY: 12,
    BRAND_FILTER: true,
    INGENUITY_DELAY: 5000,
    CLOUD_INTERVAL: 1000, // Time between cloud spawns
  };

  // Animation states
  let isVisible = false;
  let showIngenuity = false;
  
  // Stats animation
  const altitude = tweened(CONFIG.INITIAL_ALTITUDE, {
    duration: CONFIG.ANIMATION_DURATION,
    easing: cubicOut
  });
  
  const velocity = tweened(CONFIG.INITIAL_VELOCITY, {
    duration: CONFIG.ANIMATION_DURATION,
    easing: cubicOut
  });
  
  // Cloud generation
  let clouds: { id: number; x: number; y: number; scale: number; opacity: number; }[] = [];
  let cloudInterval: number;
  let animationStartTime: number;
  
  function addCloud() {
    const id = Date.now();
    const y = Math.random() * 80 + 10; // Keep away from very top and bottom
    const scale = 0.5 + Math.random() * 1.5;
    const opacity = 0.1 + Math.random() * 0.2;
    clouds = [...clouds, { id, x: 120, y, scale, opacity }];
    
    // Remove cloud when it exits viewport
    setTimeout(() => {
      clouds = clouds.filter(cloud => cloud.id !== id);
    }, 3000);
  }
  
  // Wiggle animation
  let wiggleOffset = 0;
  let wiggleInterval: number;

  function startAnimation() {
    animationStartTime = Date.now();
    isVisible = true;
    
    // Continuous stats animation
    function updateStats() {
      const elapsed = (Date.now() - animationStartTime) / 1000; // seconds
      const currentAltitude = CONFIG.INITIAL_ALTITUDE * Math.exp(-elapsed/30) + CONFIG.FINAL_ALTITUDE;
      const currentVelocity = 20 * (1 - Math.exp(-elapsed/10));
      
      altitude.set(currentAltitude, { duration: 0 });
      velocity.set(currentVelocity, { duration: 0 });
      
      if (currentAltitude > CONFIG.FINAL_ALTITUDE) {
        requestAnimationFrame(updateStats);
      }
    }
    
    updateStats();
    
    // Cloud animation
    if (cloudInterval) clearInterval(cloudInterval);
    cloudInterval = setInterval(addCloud, CONFIG.CLOUD_INTERVAL);
    
    // Subtle wiggle
    if (wiggleInterval) clearInterval(wiggleInterval);
    wiggleInterval = setInterval(() => {
      wiggleOffset = Math.sin(Date.now() / 1000) * 3;
    }, 50);

    // Show Ingenuity after delay
    setTimeout(() => {
      showIngenuity = true;
    }, CONFIG.INGENUITY_DELAY);
  }

  function reset() {
    clouds = [];
    showIngenuity = false;
    startAnimation();
  }

  onMount(() => {
    startAnimation();
    return () => {
      clearInterval(cloudInterval);
      clearInterval(wiggleInterval);
    };
  });

  $: brandFilter = CONFIG.BRAND_FILTER ? 'hue-rotate(220deg) saturate(1.5)' : 'none';
</script>

<div class="relative w-full h-full p-4 bg-black/5">
  <!-- Main Container -->
  <div 
    class="relative w-full h-full"
    style:opacity={isVisible ? 1 : 0}
    style:transition="opacity 1s ease-out"
  >
    <!-- Paraglider with brand filter -->
    <div 
      class="absolute w-1/2 h-1/2 left-1/2 top-1/4 -translate-x-1/2"
      style:transform="translate(-50%, {wiggleOffset}px) rotate({wiggleOffset/2}deg)"
    >
      <img 
        src="/space/assets/paraglider.svg" 
        alt="Paraglider"
        class="w-full h-full object-contain"
        style:filter={brandFilter}
      />
    </div>
    
    <!-- Animated Clouds -->
    {#each clouds as cloud (cloud.id)}
      <div
        class="absolute transition-transform duration-3000 ease-linear"
        style:transform="translate({cloud.x}%, {cloud.y}%) scale({cloud.scale})"
        style:left="-20%"
        style:opacity={cloud.opacity}
        animate:fade
      >
        <img 
          src="/space/assets/cloud.svg" 
          alt="Cloud"
          class="w-16 h-16 object-contain"
        />
      </div>
    {/each}

    <!-- Ingenuity Helicopter Easter Egg -->
    {#if showIngenuity}
      <div
        class="absolute right-8 top-1/4 w-12 h-12"
        in:fade
      >
        <img 
          src="/space/assets/ingenuity.svg" 
          alt="Ingenuity Helicopter"
          class="w-full h-full object-contain"
          style:filter={brandFilter}
        />
      </div>
    {/if}
    
    <!-- Stats Overlay -->
    <div class="absolute inset-x-4 bottom-8 space-y-2 font-mono text-xs">
      <div class="flex items-center justify-between text-muted-foreground">
        <span>alt(t) =</span>
        <span>{$altitude.toFixed(1)}m</span>
      </div>
      <div class="flex items-center justify-between text-muted-foreground">
        <span>v(t) =</span>
        <span>{$velocity.toFixed(1)}m/s</span>
      </div>
    </div>

    <!-- Reset Button -->
    <button
      class="absolute bottom-0 right-0 p-2 text-muted-foreground 
             hover:text-primary transition-colors"
      on:click={reset}
    >
      <RotateCcw class="w-5 h-5" />
    </button>
  </div>
</div>

<style>
  .duration-3000 {
    transition-duration: 3000ms;
  }

  @keyframes fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>