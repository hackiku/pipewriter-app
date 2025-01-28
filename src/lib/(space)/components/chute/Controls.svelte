<!-- src/lib/(space)/components/chute/Controls.svelte -->
<script lang="ts">
  import { RotateCcw, ChevronRight } from 'lucide-svelte';
  import { chuteStore } from '../../stores/chuteStore';
  import { spaceStore } from '../../stores/spaceStore';
  import { PHYSICS, PLANETS } from './physics';
  import { slide } from 'svelte/transition';

  export let startAnimation: () => void;
  export let opacity = 1;

  // Close controls only when first scrolling past hero
  // Hero is 90vh tall, so check for that threshold
  let hasPassedHeroOnce = false;
  
  $: {
    // Only trigger close behavior once when first passing hero
    if ($spaceStore.scrollY > window.innerHeight * 0.9 && !hasPassedHeroOnce) {
      hasPassedHeroOnce = true;
      if ($spaceStore.isControlsOpen) {
        spaceStore.toggleControls();
      }
    }
  }

  const PLANET_OPTIONS = [
    { id: 'earth', icon: '🌍' },
    { id: 'mars', icon: '🟠' },
    { id: 'moon', icon: '🌕' }
  ] as const;

  function handlePlanetClick(planetId: string) {
    if (planetId !== 'moon') {
      chuteStore.setPlanet(planetId);
    }
  }
</script>

<div class="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3"
     style="opacity: {opacity}; transition: opacity 200ms ease-out;">
  
  {#if $spaceStore.isControlsOpen}
    
	
	    <!-- Planet Selection - Outside Container -->
    <div 
      class="flex justify-end gap-2"
      transition:slide|local={{ duration: 200, delay: 50 }}
    >
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

		<div
      transition:slide|local={{ duration: 200 }}
      class="backdrop-blur-[2px] bg-black/20 
             rounded-xl border border-white/10 shadow-lg
             w-[200px]"
    >
      <!-- Stats Panel -->
      <div class="p-4 font-mono text-sm text-white/60 flex flex-col">
        <!-- Live Stats -->
        <div class="space-y-2 flex-grow">
          <div>h = {$chuteStore.altitude.toFixed(0)}m</div>
          <div>v = {$chuteStore.velocity.toFixed(1)}m/s</div>
          <div>g = {PLANETS[$chuteStore.planet].gravity}m/s²</div>
        </div>
        
        <!-- Reset Button - Bottom Right -->
        <div class="flex justify-end mt-4">
          <button
            class="p-2 rounded-lg 
                   hover:bg-white/10 active:scale-95
                   transition-all"
            on:click={startAnimation}
          >
            <RotateCcw class="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>
    </div>

  {/if}

  <!-- Toggle Button - Always Visible -->
  <button
    class="h-10 w-10 rounded-lg relative
           bg-black/20 backdrop-blur-sm
           hover:bg-white/10 active:scale-95
           transition-all border border-white/10
           flex items-center justify-center"
    on:click={() => spaceStore.toggleControls()}
  >
    <ChevronRight 
      class="w-5 h-5 text-white/60 transition-transform duration-200"
      style="transform: rotate({$spaceStore.isControlsOpen ? 180 : 0}deg)"
    />
  </button>
</div>