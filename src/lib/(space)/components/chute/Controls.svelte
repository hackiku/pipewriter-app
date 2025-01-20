<!-- src/lib/(space)/components/chute/Controls.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { RotateCcw, ChevronUp } from 'lucide-svelte';
  import { chuteStore } from '../../stores/chuteStore';
  import { fade, slide } from 'svelte/transition';

  export let startAnimation: () => void;
  
  let isOpen = true;
  let viewportWidth: number;

  onMount(() => {
    viewportWidth = window.innerWidth;
    const handleResize = () => viewportWidth = window.innerWidth;
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const PLANETS = {
    earth: {
      icon: '/space/assets/earth.svg',
      emoji: '🌍',
      gravity: 9.81
    },
    mars: {
      icon: '/space/assets/mars.svg',
      emoji: '🟠',
      gravity: 3.72
    }
  };

  $: isMobile = viewportWidth < 768;
</script>

<!-- Fixed container for controls -->
<div 
  class="fixed right-4 lg:right-8 z-50 
         {isMobile ? 'bottom-4' : 'top-1/2 -translate-y-1/2'}
         transition-all duration-300"
>
  <!-- Pull tab -->
  <button
    class="absolute left-1/2 -translate-x-1/2 cursor-pointer
           {isMobile ? '-top-3' : '-left-3 top-1/2 -translate-y-1/2'}
           {isOpen ? 'rotate-0' : 'rotate-180'}"
    on:click={() => isOpen = !isOpen}
  >
    <div class="relative">
      <div class="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-full" />
      <div class="relative bg-white/10 hover:bg-white/20 
                  border border-white/20 rounded-full p-1.5
                  transition-colors duration-200">
        <ChevronUp 
          class="w-4 h-4 text-white/60
                 {isMobile ? '' : '-rotate-90'}" 
        />
      </div>
    </div>
  </button>

  <!-- Controls panel -->
  {#if isOpen}
    <div 
      transition:slide={{ duration: 200 }}
      class="backdrop-blur-[2px] bg-black/20 
             rounded-lg border border-white/10
             shadow-lg overflow-hidden"
    >
      <div class="p-3 font-mono text-sm text-white/60 space-y-1.5">
        <!-- Stats -->
        <div>h = {$chuteStore.altitude.toFixed(0)}m</div>
        <div>v = {$chuteStore.velocity.toFixed(1)}m/s</div>

        <!-- Controls Row -->
        <div class="flex items-center gap-2 pt-1 border-t border-white/10">
          <div class="flex gap-1">
            {#each Object.entries(PLANETS) as [planet, config]}
              <button 
                class="p-1.5 rounded-lg transition-all cursor-pointer
                       hover:bg-white/10 hover:scale-110 active:scale-95
                       {$chuteStore.planet === planet ? 'bg-white/5' : 'opacity-50'}"
                on:click={() => chuteStore.setPlanet(planet)}
              >
                {#if $chuteStore.planet === planet}
                  <img 
                    src={config.icon} 
                    alt={planet}
                    class="w-5 h-5 pointer-events-none" 
                  />
                {:else}
                  <span class="text-lg pointer-events-none">{config.emoji}</span>
                {/if}
              </button>
            {/each}
          </div>

          <div class="text-xs">
            g = {PLANETS[$chuteStore.planet].gravity.toFixed(1)}
          </div>

          <button
            class="p-1.5 rounded-lg text-white/60 cursor-pointer
                   hover:text-white/90 hover:bg-white/10 
                   hover:scale-110 active:scale-95 
                   transition-all ml-auto"
            on:click={startAnimation}
          >
            <RotateCcw class="w-4 h-4 pointer-events-none" />
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>