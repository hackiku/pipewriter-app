<!-- src/lib/(space)/components/nav/SpaceButton.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { spaceDrawerStore } from '$lib/stores/spaceDrawerStore';

  export let size: "xs" | "sm" | "md" | "lg" = "md";

  // Size mappings
  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14"
  };

  let glowRef: HTMLDivElement;
  
  onMount(() => {
    const animate = () => {
      const x = Math.sin(Date.now() / 800) * 12;
      const y = Math.cos(Date.now() / 1200) * 12;
      if (glowRef) {
        glowRef.style.transform = `translate(${x}px, ${y}px)`;
      }
      requestAnimationFrame(animate);
    };
    
    animate();
  });
</script>

<button
  on:click={() => spaceDrawerStore.open('nav')}
  class="relative group"
>
  <!-- Enhanced glow effect -->
  <div 
    bind:this={glowRef}
    class="absolute inset-0 blur-xl opacity-70
           bg-gradient-to-r from-indigo-600/50 to-purple-600/50
           transition-all duration-300 group-hover:opacity-90
           group-hover:scale-110"
  />
  
  <!-- Button content -->
  <div class="relative flex items-center justify-center
              {sizeClasses[size]} rounded-full
              bg-gradient-to-r from-indigo-600 to-purple-600 
              hover:from-purple-600 hover:to-indigo-600
              transition-all duration-300
              shadow-lg shadow-indigo-500/20">
    <img 
      src="/space/icons/parachute.svg" 
      alt="Parachute"
      class={size === "xs" ? "w-3 h-3" : 
             size === "sm" ? "w-4 h-4" :
             size === "md" ? "w-5 h-5" :
             "w-6 h-6"}
    />
		<!-- class="filter invert" -->
  </div>
</button>

<style>
  /* Ensure smooth animation performance */
  .blur-xl {
    will-change: transform;
  }
</style>