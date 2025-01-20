<!-- src/lib/(space)/components/chute/Controls.svelte -->
<script lang="ts">
  import { RotateCcw } from 'lucide-svelte';
  import { chuteStore } from '../../stores/chuteStore';

  export let startAnimation: () => void;

  // Planet-specific icons/emojis (simplified for now)
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
</script>

<div class="p-3 font-mono text-sm text-white/60 space-y-1.5">
  <!-- Stats - One per line -->
  <div>h = {$chuteStore.altitude.toFixed(0)}m</div>
  <div>v = {$chuteStore.velocity.toFixed(1)}m/s</div>

  <!-- Controls Row - Planet selection, gravity, reset -->
  <div class="flex items-center gap-2 pt-1 border-t border-white/10">
    <!-- Planet Selector -->
    <div class="flex gap-1">
      {#each Object.entries(PLANETS) as [planet, config]}
        <button 
          class="p-1.5 rounded-lg transition-all
                 hover:bg-white/10 hover:scale-110
                 {$chuteStore.planet === planet ? 'bg-white/5' : 'opacity-50'}"
          on:click={() => chuteStore.setPlanet(planet)}
        >
          {#if $chuteStore.planet === planet}
            <img 
              src={config.icon} 
              alt={planet}
              class="w-5 h-5" 
            />
          {:else}
            <span class="text-lg">{config.emoji}</span>
          {/if}
        </button>
      {/each}
    </div>

    <!-- Gravity Display -->
    <div class="text-xs">
      g = {PLANETS[$chuteStore.planet].gravity.toFixed(1)}
    </div>

    <!-- Reset Button -->
    <button
      class="p-1.5 rounded-lg text-white/60
             hover:text-white/90 hover:bg-white/10 
             hover:scale-110 transition-all ml-auto"
      on:click={startAnimation}
    >
      <RotateCcw class="w-4 h-4" />
    </button>
  </div>
</div>