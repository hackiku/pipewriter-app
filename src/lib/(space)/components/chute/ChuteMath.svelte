<!-- src/lib/pages/space/components/chute/ChuteMath.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { RotateCcw } from 'lucide-svelte';
  import { PHYSICS, CLOUD_CONFIG, HELI_CONFIG, calculateState } from './physics';
  import { fly } from 'svelte/transition';
  
  // Animation states
  let isVisible = false;
  let showIngenuity = false;
  let clouds: { id: number; x: number; y: number; scale: number; opacity: number; }[] = [];
  let animationStartTime: number;
  let animationFrame: number;
  
  function addCloud() {
    const id = Date.now();
    const x = Math.random() * 20 + 80;  // 80-100% of width
    const y = Math.random() * 80 + 10;  // 10-90% of height
    const scale = CLOUD_CONFIG.MIN_SCALE + 
      Math.random() * (CLOUD_CONFIG.MAX_SCALE - CLOUD_CONFIG.MIN_SCALE);
    const opacity = CLOUD_CONFIG.MIN_OPACITY + 
      Math.random() * (CLOUD_CONFIG.MAX_OPACITY - CLOUD_CONFIG.MIN_OPACITY);
    
    clouds = [...clouds, { id, x, y, scale, opacity }];
    
    // Remove cloud after animation
    setTimeout(() => {
      clouds = clouds.filter(cloud => cloud.id !== id);
    }, CLOUD_CONFIG.TRAVEL_DURATION);
  }

  function updateAnimation() {
    const elapsed = Date.now() - animationStartTime;
    const state = calculateState(elapsed);
    
    // Update stats
    altitude = state.altitude;
    velocity = state.velocity;
    
    // Continue animation if not complete
    if (state.progress < 1) {
      animationFrame = requestAnimationFrame(updateAnimation);
    }
  }

  function startAnimation() {
    // Reset states
    clouds = [];
    showIngenuity = false;
    animationStartTime = Date.now();
    isVisible = true;

    // Start main animation loop
    updateAnimation();
    
    // Start cloud spawning
    cloudInterval = setInterval(addCloud, CLOUD_CONFIG.SPAWN_INTERVAL);
    
    // Show Ingenuity after delay
    setTimeout(() => {
      showIngenuity = true;
    }, HELI_CONFIG.APPEAR_AFTER);
  }

  function reset() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    if (cloudInterval) clearInterval(cloudInterval);
    startAnimation();
  }
  
  let altitude = PHYSICS.INITIAL_ALTITUDE;
  let velocity = 0;
  let cloudInterval: number;

  onMount(() => {
    startAnimation();
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (cloudInterval) clearInterval(cloudInterval);
    };
  });
</script>

<div 
  class="relative w-full h-full 
         lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/3
         -z-10 lg:z-0"
>
  <!-- Main Container -->
  <div 
    class="relative w-full h-full min-h-[400px] lg:min-h-0"
    style:opacity={isVisible ? 1 : 0}
    style:transition="opacity 1s ease-out"
  >
    <!-- Paraglider -->
    <div 
      class="absolute w-1/2 h-1/2 left-1/2 top-1/4 -translate-x-1/2
             transition-transform duration-1000 animate-float"
    >
      <img 
        src="/space/assets/paraglider.svg" 
        alt="Paraglider"
        class="w-full h-full object-contain"
      />
    </div>
    
    <!-- Animated Clouds -->
    {#each clouds as cloud (cloud.id)}
      <div
        class="absolute w-16 h-16"
        in:fly={{ y: 200, duration: CLOUD_CONFIG.TRAVEL_DURATION }}
        style:left="{cloud.x}%"
        style:top="{cloud.y}%"
        style:transform="scale({cloud.scale})"
        style:opacity={cloud.opacity}
      >
        <img 
          src="/space/assets/cloud.svg" 
          alt="Cloud"
          class="w-full h-full object-contain"
        />
      </div>
    {/each}

    <!-- Ingenuity Helicopter -->
    {#if showIngenuity}
      <div
        class="absolute right-8 w-12 h-12
               animate-hover"
        in:fly={{ x: 100, y: -50, duration: 1000 }}
      >
        <img 
          src="/space/assets/ingenuity.svg" 
          alt="Ingenuity Helicopter"
          class="w-full h-full object-contain animate-rotor"
        />
      </div>
    {/if}
    
    <!-- Stats Overlay -->
    <div class="absolute inset-x-4 bottom-8 space-y-2 font-mono text-xs">
      <div class="flex items-center justify-between text-muted-foreground">
        <span>alt(t) =</span>
        <span>{altitude.toFixed(1)}m</span>
      </div>
      <div class="flex items-center justify-between text-muted-foreground">
        <span>v(t) =</span>
        <span>{velocity.toFixed(1)}m/s</span>
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
  @keyframes float {
    0%, 100% { transform: translate(-50%, 0); }
    50% { transform: translate(-50%, -10px); }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  @keyframes hover {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-5px, -5px); }
  }
  
  @keyframes rotor {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-hover {
    animation: hover 4s ease-in-out infinite;
  }
  
  .animate-rotor {
    animation: rotor 0.5s linear infinite;
  }
  
  :global(.dark) .cloud-gradient {
    filter: brightness(0.8) saturate(1.2);
  }
</style>