<!-- src/lib/(space)/components/chute/Controls.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { RotateCcw, ChevronRight, Play, Pause } from 'lucide-svelte';
  import { chuteStore } from '../../stores/chuteStore';
  import { spaceStore } from '../../stores/spaceStore';
  import { PHYSICS, PLANETS } from './physics';
  import { slide } from 'svelte/transition';

  export let startAnimation: () => void;
  export let pauseAnimation: () => void;

  let hasAutoClosedOnce = false;

  $: if ($spaceStore.hasScrolledPastHero && !hasAutoClosedOnce && $spaceStore.isControlsOpen) {
    hasAutoClosedOnce = true;
    spaceStore.setControlsOpen(false);
  }

  const PLANET_OPTIONS = [
    { id: 'earth', icon: '🌍', label: 'Earth' },
    { id: 'mars', icon: '🟠', label: 'Mars' },
    { id: 'moon', icon: '🌕', label: 'Moon (Soon)' }
  ] as const;

  function handlePlanetClick(planetId: string) {
    if (planetId !== 'moon') {
      chuteStore.setPlanet(planetId as keyof typeof PLANETS);
    }
  }

  function handleReset() {
    chuteStore.reset();
    if (startAnimation) {
      startAnimation();
      chuteStore.setPlaying(true);
    }
  }

  function handlePlayPause() {
    if ($chuteStore.isPlaying) {
      pauseAnimation?.();
      chuteStore.setPlaying(false);
    } else {
      startAnimation?.();
      chuteStore.setPlaying(true);
    }
  }

  function toggleControls() {
    spaceStore.toggleControls();
  }
</script>

<div class="fixed right-4 bottom-[20vh] z-50 flex flex-col items-end gap-3">
  {#if $spaceStore.isControlsOpen}
    <!-- Planet Selection -->
    <div 
      class="flex justify-end gap-2"
      transition:slide|local={{ duration: 200, axis: 'y' }}
    >
      {#each PLANET_OPTIONS as planet}
        <!-- Planet Button with Tooltip -->
        <button
          class="group relative h-10 w-10 rounded-full
                 {planet.id === $chuteStore.planet ? 'opacity-100' : 'opacity-50'}
                 {planet.id === 'moon' ? 'cursor-not-allowed' : 'hover:opacity-100'}
                 bg-black/20 backdrop-blur-sm transition-all duration-200
                 border border-white/10"
          on:click={() => handlePlanetClick(planet.id)}
        >
          <span class="text-xl">{planet.icon}</span>
          
          <!-- Tooltip -->
          <div class="absolute -top-8 left-1/2 -translate-x-1/2 
                      opacity-0 group-hover:opacity-100 transition-opacity
                      whitespace-nowrap text-sm px-2 py-1 rounded
                      bg-black/40 backdrop-blur-sm">
            {planet.label}
          </div>
        </button>
      {/each}
    </div>

    <!-- Controls Panel -->
    <div
      transition:slide|local={{ duration: 200, axis: 'y' }}
      class="backdrop-blur-[2px] bg-black/20 
             rounded-xl border border-white/10 shadow-lg
             w-[200px] relative overflow-hidden"
    >
      <!-- Control Buttons -->
      <div class="absolute top-2 right-2 flex gap-2">
        <button
          class="p-2 rounded-lg hover:bg-white/10 
                 active:scale-95 transition-all
                 disabled:opacity-50 disabled:cursor-not-allowed"
          on:click={handlePlayPause}
        >
          {#if $chuteStore.isPlaying}
            <Pause class="w-4 h-4 text-white/60" />
          {:else}
            <Play class="w-4 h-4 text-white/60" />
          {/if}
        </button>
        <button
          class="p-2 rounded-lg hover:bg-white/10 
                 active:scale-95 transition-all"
          on:click={handleReset}
        >
          <RotateCcw class="w-4 h-4 text-white/60" />
        </button>
      </div>

      <!-- Stats Panel with Labels -->
      <div class="p-4 pt-12 font-mono text-sm">
        <div class="space-y-1.5">
          <div class="flex justify-between">
            <span class="text-white/40">Altitude</span>
            <span class="text-white/80">{$chuteStore.altitude.toFixed(0)}m</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/40">Velocity</span>
            <span class="text-white/80">{$chuteStore.velocity.toFixed(1)}m/s</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/40">Gravity</span>
            <span class="text-white/80">{PLANETS[$chuteStore.planet].gravity}m/s²</span>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Toggle Button -->
  <button
    class="h-10 w-10 rounded-lg relative
           bg-black/20 backdrop-blur-sm
           hover:bg-white/10 active:scale-95
           transition-all border border-white/10
           flex items-center justify-center"
    on:click={toggleControls}
  >
    <ChevronRight 
      class="w-5 h-5 text-white/60 transition-transform duration-200"
      style="transform: rotate({$spaceStore.isControlsOpen ? 180 : 0}deg)"
    />
  </button>
</div>