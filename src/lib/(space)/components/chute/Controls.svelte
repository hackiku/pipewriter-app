<!-- Controls.svelte -->
<script lang="ts">
  import { RotateCcw, ChevronRight } from 'lucide-svelte';
  import { chuteStore } from '../../stores/chuteStore';
  import { PHYSICS, PLANETS } from './physics';
  import { slide } from 'svelte/transition';

  export let startAnimation: () => void;
  export let opacity = 1;  // Passed from SpacePage
  
  let isOpen = true;

  const PLANET_OPTIONS = [
    { id: 'earth', icon: '🌍' },
    { id: 'mars', icon: '🟠' },
    { id: 'moon', icon: '🌕' }
  ] as const;

  // Auto-collapse when opacity hits threshold
  $: if (opacity <= 0.1 && isOpen) {
    isOpen = false;
  }

  function handlePlanetClick(planetId: string) {
    if (planetId !== 'moon') {  // Moon still disabled
      chuteStore.setPlanet(planetId);
    }
  }
</script>

<div class="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex items-center"
     style="opacity: {opacity}; transition: opacity 200ms ease-out;">
  
  {#if isOpen}
    <div
      transition:slide|local={{ duration: 200 }}
      class="backdrop-blur-[2px] bg-black/20 
             rounded-xl border border-white/10 shadow-lg"
    >
      <!-- Stats Panel -->
      <div class="p-4 font-mono text-sm text-white/60 space-y-2">
        <div>h = {$chuteStore.altitude.toFixed(0)}m</div>
        <div>v = {$chuteStore.velocity.toFixed(1)}m/s</div>
        <div>g = {PLANETS[$chuteStore.planet].gravity}m/s²</div>
        
        <!-- Reset Button -->
        <button
          class="mt-2 p-2 w-full rounded-lg 
                 hover:bg-white/10 active:scale-95
                 transition-all border-t border-white/10"
          on:click={startAnimation}
        >
          <RotateCcw class="w-4 h-4 mx-auto text-white/60" />
        </button>

        <!-- Planet Row -->
        <div class="flex justify-end gap-2 pt-2">
          {#each PLANET_OPTIONS as planet}
            <button
              class="h-10 w-10 rounded-full relative
                     {planet.id === $chuteStore.planet ? 'opacity-100' : 'opacity-50'}
                     {planet.id === 'moon' ? 'cursor-not-allowed' : 'hover:opacity-100'}
                     bg-black/20 backdrop-blur-sm transition-all duration-200
                     border border-white/10"
              on:click={() => handlePlanetClick(planet.id)}
            >
              <span class="text-xl">{planet.icon}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Expand/Collapse Button -->
  <button
    class="h-10 w-10 ml-2 rounded-lg relative
           bg-black/20 backdrop-blur-sm
           hover:bg-white/10 active:scale-95
           transition-all border border-white/10
           flex items-center justify-center"
    on:click={() => isOpen = !isOpen}
  >
    <ChevronRight 
      class="w-5 h-5 text-white/60 transition-transform duration-200"
      rotate={isOpen ? 180 : 0}
    />
  </button>
</div>