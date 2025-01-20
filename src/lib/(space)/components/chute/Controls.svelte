<!-- src/lib/(space)/components/chute/Controls.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { RotateCcw, ChevronUp } from 'lucide-svelte';
  import { chuteStore } from '../../stores/chuteStore';
  import { PHYSICS, PLANETS } from './physics';
  import { slide } from 'svelte/transition';

  export let startAnimation: () => void;
  
  let isOpen = true;
  let viewportWidth: number;

  onMount(() => {
    viewportWidth = window.innerWidth;
    const handleResize = () => viewportWidth = window.innerWidth;
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  $: isMobile = viewportWidth < 768;
</script>

<div 
  class="fixed right-4 lg:right-8 z-50 
         {isMobile ? 'bottom-4' : 'top-1/2 -translate-y-1/2'}
         transition-all duration-300"
>
  <!-- Pull tab -->
  <button
    class="absolute -translate-x-1/2 cursor-pointer
           {isMobile ? 'left-1/2 -top-3' : '-left-3 top-1/2 -translate-y-1/2'}
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
             rounded-xl border border-white/10
             shadow-lg overflow-hidden"
    >
      <div class="p-4 font-mono text-sm text-white/60 space-y-2">
        <!-- Stats -->
        <div>h = {$chuteStore.altitude.toFixed(0)}m</div>
        <div>v = {$chuteStore.velocity.toFixed(1)}m/s</div>
        <div>g = {PLANETS[$chuteStore.planet].gravity}m/s²</div>

        <!-- Planet Selection & Reset -->
        <div class="flex items-center gap-3 pt-2 border-t border-white/10">
          <!-- Planet Buttons -->
          <div class="flex gap-2">
            {#each ['earth', 'mars'] as planet}
              <button 
                class="group p-2.5 rounded-lg transition-all
                       relative overflow-hidden
                       {$chuteStore.planet === planet ? 
                         'bg-white/10 ring-2 ring-white/20' : 
                         'hover:bg-white/5'}"
                on:click={() => chuteStore.setPlanet(planet)}
              >
                <img 
                  src={`/space/assets/${planet}.svg`}
                  alt={planet}
                  class="w-6 h-6 relative z-10 
                         transition-transform duration-300
                         group-hover:scale-110" 
                />
                <div class="absolute inset-0 opacity-0 
                           group-hover:opacity-100
                           bg-gradient-to-t
                           from-white/5 to-transparent
                           transition-opacity duration-300" />
              </button>
            {/each}
          </div>

          <!-- Reset Button -->
          <button
            class="p-2 rounded-lg text-white/60
                   hover:text-white/90 hover:bg-white/10 
                   hover:scale-110 active:scale-95 
                   transition-all ml-auto"
            on:click={startAnimation}
          >
            <RotateCcw class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>