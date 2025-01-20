<!-- src/lib/pages/space/components/chute/Controls.svelte -->
<script lang="ts">
  import { RotateCcw } from 'lucide-svelte';
  import { chuteStore } from '../../stores/chuteStore';

  export let startAnimation: () => void;
</script>

<div class="backdrop-blur-sm bg-black/20 
            px-4 py-2.5 flex items-center justify-between border-t border-white/10">
  <!-- Planet Selector -->
  <div class="flex items-center gap-3">
    <button 
      class="p-2 rounded-full transition-all hover:bg-white/10"
      class:opacity-50={$chuteStore.planet !== 'earth'}
      on:click={() => chuteStore.setPlanet('earth')}
    >
      <span class="text-xl">🌍</span>
    </button>
    <button 
      class="p-2 rounded-full transition-all hover:bg-white/10"
      class:opacity-50={$chuteStore.planet !== 'mars'}
      on:click={() => chuteStore.setPlanet('mars')}
    >
      <span class="text-xl">🟠</span>
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

  <!-- Stats -->
  <div class="flex items-center gap-4 font-mono text-sm text-white/60">
    <div>alt(t) = {$chuteStore.altitude.toFixed(1)}m</div>
    <div>v(t) = {$chuteStore.velocity.toFixed(1)}m/s</div>
  </div>
</div>