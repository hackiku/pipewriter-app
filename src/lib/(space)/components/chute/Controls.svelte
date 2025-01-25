<!-- src/lib/(space)/components/chute/Controls.svelte -->
<script lang="ts">
  import { RotateCcw } from 'lucide-svelte';
  import { chuteStore } from '../../stores/chuteStore';
  import { PHYSICS, PLANETS } from './physics';
  import { slide } from 'svelte/transition';

  export let startAnimation: () => void;
  let isOpen = true;

  const PLANET_OPTIONS = [
    { id: 'earth', icon: '🌍' },
    { id: 'mars', icon: '🟠' },
    { id: 'moon', icon: '🌕' }
  ] as const;

  function handlePlanetClick(planetId: string) {
    if (planetId === $chuteStore.planet) {
      isOpen = false;
    } else if (planetId !== 'moon') {  // Moon disabled for now
      chuteStore.setPlanet(planetId);
    }
  }
</script>

<div class="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex items-center gap-3">
  <!-- Stats Panel -->
  {#if isOpen}
    <div
      transition:slide|local={{ duration: 200 }}
      class="backdrop-blur-[2px] bg-black/20 
             rounded-xl border border-white/10 shadow-lg"
    >
      <div class="p-4 font-mono text-sm text-white/60 space-y-2">
        <div>h = {$chuteStore.altitude.toFixed(0)}m</div>
        <div>v = {$chuteStore.velocity.toFixed(1)}m/s</div>
        <div>g = {PLANETS[$chuteStore.planet].gravity}m/s²</div>
        
        <button
          class="mt-2 p-2 w-full rounded-lg 
                 hover:bg-white/10 active:scale-95
                 transition-all border-t border-white/10"
          on:click={startAnimation}
        >
          <RotateCcw class="w-4 h-4 mx-auto text-white/60" />
        </button>
      </div>
    </div>
  {/if}

  <!-- Planet Column -->
  <div class="flex flex-col gap-2">
    {#if isOpen}
      {#each PLANET_OPTIONS as planet}
        <button
          class="h-12 w-12 rounded-full relative
                 {planet.id === $chuteStore.planet ? 'ring-2 ring-white/20' : ''}
                 {planet.id === 'moon' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
                 bg-black/20 backdrop-blur-sm transition-all duration-200
                 border border-white/10"
          on:click={() => handlePlanetClick(planet.id)}
        >
          <span class="text-2xl">{planet.icon}</span>
          <div class="absolute inset-0 rounded-full opacity-0 
                      hover:opacity-100 transition-opacity
                      bg-gradient-to-r from-white/5 to-transparent" />
        </button>
      {/each}
    {:else}
      <!-- Single Planet Button when closed -->
      <button
        class="h-12 w-12 rounded-full relative hover:scale-110
               bg-black/20 backdrop-blur-sm transition-all duration-200
               border border-white/10"
        on:click={() => isOpen = true}
      >
        <span class="text-2xl">
          {PLANET_OPTIONS.find(p => p.id === $chuteStore.planet)?.icon}
        </span>
        <div class="absolute inset-0 rounded-full opacity-0 
                    hover:opacity-100 transition-opacity
                    bg-gradient-to-r from-white/5 to-transparent" />
      </button>
    {/if}
  </div>
</div>