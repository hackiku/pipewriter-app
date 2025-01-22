<!-- src/lib/(space)/components/nav/SpaceButton.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { spaceDrawerStore } from '$lib/stores/spaceDrawerStore';

  let glowRef: HTMLDivElement;
  
  onMount(() => {
    const animate = () => {
      const x = Math.sin(Date.now() / 1000) * 8;
      const y = Math.cos(Date.now() / 1500) * 8;
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
  <!-- Animated glow effect -->
  <div 
    bind:this={glowRef}
    class="absolute inset-0 rounded-full blur-xl opacity-50
           bg-gradient-to-r from-indigo-600/30 to-purple-600/30
           transition-all duration-300 group-hover:opacity-75"
  />
  
  <!-- Button content -->
  <div class="relative flex items-center justify-center gap-2 
              px-4 py-2 rounded-full
              bg-gradient-to-r from-indigo-600 to-purple-600 
              hover:from-purple-600 hover:to-indigo-600
              transition-all duration-300
              shadow-lg shadow-indigo-500/20">
    <img 
      src="/space/icons/parachute.svg" 
      alt="Parachute" 
      class="w-4 h-4 filter invert"
    />
  </div>
</button>

<style>
  @keyframes glow {
    0% { transform: translate(0, 0); }
    25% { transform: translate(8px, 8px); }
    50% { transform: translate(0, 16px); }
    75% { transform: translate(-8px, 8px); }
    100% { transform: translate(0, 0); }
  }
</style>