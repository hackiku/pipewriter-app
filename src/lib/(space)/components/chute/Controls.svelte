<!-- src/lib/pages/space/components/chute/Controls.svelte -->
<script lang="ts">
  import { RotateCcw } from 'lucide-svelte';
  import { chuteStore } from '../../stores/chuteStore';

  export let startAnimation: () => void;
</script>

<div class="backdrop-blur-[2px] bg-black/10 
            rounded-lg border border-white/10
            px-4 py-3">
  <!-- Stats Row -->
  <div class="flex items-center gap-4 font-mono text-sm text-white/60 mb-3">
    <div>alt(t) = {$chuteStore.altitude.toFixed(1)}m</div>
    <div>v(t) = {$chuteStore.velocity.toFixed(1)}m/s</div>
  </div>

  <!-- Controls Row -->
  <div class="flex items-center justify-between border-t border-white/10 pt-3">
    <!-- Planet Selector -->
    <div class="flex items-center gap-3">
      <button 
        class="p-2 rounded-full transition-all hover:bg-white/10"
        class:opacity-50={$chuteStore.planet !== 'earth'}
        on:click={() => chuteStore.setPlanet('earth')}
      >
        {#if $chuteStore.planet === 'earth'}
          <img src="/space/assets/earth.svg" alt="Earth" class="w-6 h-6" />
        {:else}
          <span class="text-xl">🌍</span>
        {/if}
      </button>
      <button 
        class="p-2 rounded-full transition-all hover:bg-white/10"
        class:opacity-50={$chuteStore.planet !== 'mars'}
        on:click={() => chuteStore.setPlanet('mars')}
      >
        {#if $chuteStore.planet === 'mars'}
          <img src="/space/assets/mars.svg" alt="Mars" class="w-6 h-6" />
        {:else}
          <span class="text-xl">🟠</span>
        {/if}
      </button>
    </div>

    <!-- Reset Button -->
    <button
      class="p-2 rounded-full text-white/60 hover:text-white/90 
             hover:bg-white/10 transition-all"
      on:click={startAnimation}
    >
      <RotateCcw class="w-5 h-5" />
    </button>
  </div>
</div>