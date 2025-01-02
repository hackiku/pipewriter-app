<!-- src/lib/pages/space/BeforeAfter.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { scale } from 'svelte/transition';
  
  const examples = [
    {
      company: "Phase Four",
      before: "/examples/space/phase-four-before.png",
      after: "/examples/space/phase-four-after.png"
    },
    // Add more examples as needed
  ];

  let currentExample = 0;
  let showAfter = false;
</script>

<div class="container">
  <div class="max-w-5xl mx-auto">
    <div class="relative aspect-[16/9] rounded-xl overflow-hidden border">
      {#each [examples[currentExample]] as example (currentExample)}
        <div class="absolute inset-0" transition:scale>
          <img 
            src={showAfter ? example.after : example.before} 
            alt={`${example.company} website ${showAfter ? 'after' : 'before'} redesign`}
            class="w-full h-full object-cover"
          />
          
          <div class="absolute bottom-4 left-4">
            <button 
              class="px-4 py-2 rounded-full bg-black/50 text-white backdrop-blur-sm
                     hover:bg-black/70 transition-colors"
              on:click={() => showAfter = !showAfter}
            >
              {showAfter ? 'Show Original' : 'Show Redesign'}
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>