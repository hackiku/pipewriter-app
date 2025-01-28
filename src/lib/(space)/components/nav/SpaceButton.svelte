<!-- src/lib/(space)/components/nav/SpaceButton.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { spaceDrawerStore } from '$lib/stores/spaceDrawerStore';

  export let size: "xs" | "sm" | "md" | "lg" | "xl" = "md";
  export let text: string | undefined = undefined;

  // Size mappings
  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };

  let buttonRef: HTMLDivElement;
  let parachuteRef: HTMLImageElement;
  let animationFrame: number;
  
  // Parachute physics simulation
  let time = 0;
  const CENTER_OF_PRESSURE = { x: 0, y: 0 };
  const DAMPING = 0.98; // Reduces oscillation over time
  let velocity = { x: 0, y: 0 };
  
  function updateParachutePhysics() {
    time += 0.016; // Assumes 60fps

    // Simulate wind effect
    const windForceX = Math.sin(time * 0.8) * 0.2;
    const windForceY = Math.cos(time * 1.2) * 0.15;

    // Apply forces with damping
    velocity.x = (velocity.x + windForceX) * DAMPING;
    velocity.y = (velocity.y + windForceY) * DAMPING;

    // Update position relative to center of pressure
    const dx = CENTER_OF_PRESSURE.x + velocity.x * 3;
    const dy = CENTER_OF_PRESSURE.y + velocity.y * 3;

    if (parachuteRef) {
      parachuteRef.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 2}deg)`;
    }

    animationFrame = requestAnimationFrame(updateParachutePhysics);
  }

  onMount(() => {
    updateParachutePhysics();
  });

  onDestroy(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });
</script>

<button
  on:click={() => spaceDrawerStore.open('nav')}
  class="relative group"
>
  <!-- Background with lower initial opacity -->
  <div 
    bind:this={buttonRef}
    class="absolute inset-0 rounded-full blur-xl opacity-40
           bg-gradient-to-r from-indigo-600/30 to-purple-600/30
           transition-all duration-500 
           group-hover:opacity-90 group-hover:scale-110"
  />
  
  <!-- Button content -->
  <div class="relative flex items-center justify-center gap-2
              {sizeClasses[size]} rounded-full
              bg-gradient-to-r from-indigo-600/80 to-purple-600/80
              hover:from-purple-600 hover:to-indigo-600
              hover:bg-opacity-100
              transition-all duration-300
              shadow-lg shadow-indigo-500/20">
    
    <!-- Parachute icon with physics animation -->
    <div class="relative {iconSizes[size]} transition-transform duration-200">
      <img 
        bind:this={parachuteRef}
        src="/space/assets/paraglider.svg"
        alt="Parachute"
        class="w-full h-full will-change-transform"
      />
    </div>

    <!-- Optional text label -->
    {#if text}
      <span class="text-white font-medium
                   {size === 'xs' ? 'text-xs' :
                    size === 'sm' ? 'text-sm' :
                    size === 'md' ? 'text-base' :
                    size === 'lg' ? 'text-lg' :
                    'text-xl'}">
        {text}
      </span>
    {/if}
  </div>
</button>

<style>
  /* Optimize animation performance */
  .will-change-transform {
    will-change: transform;
    backface-visibility: hidden;
  }
</style>