<!-- src/lib/(space)/repacks/firefly/components/music/Piano.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  // Basic piano notes and frequencies
  const notes = [
    { note: 'C5', freq: 523.25 },
    { note: 'D5', freq: 587.33 },
    { note: 'E5', freq: 659.25 },
    { note: 'F5', freq: 698.46 },
    { note: 'G5', freq: 783.99 },
    { note: 'A5', freq: 880.00 },
    { note: 'B5', freq: 987.77 }
  ];
  
  function playNote(note: string, freq: number) {
    dispatch('frequencyChange', { note, freq });
  }
</script>

<div class="space-y-2">
  <div class="text-[#F5FF00] text-sm tracking-wider mb-4">FREQUENCY MAP</div>
  
  <div class="flex gap-px">
    {#each notes as {note, freq}}
      <button
        class="flex-1 h-32 bg-zinc-900 border border-[#F5FF00]/20 
               hover:bg-[#F5FF00]/10 transition-colors
               flex flex-col items-center justify-end p-2"
        on:click={() => playNote(note, freq)}
      >
        <span class="text-zinc-400 text-sm">{note}</span>
      </button>
    {/each}
  </div>
</div>