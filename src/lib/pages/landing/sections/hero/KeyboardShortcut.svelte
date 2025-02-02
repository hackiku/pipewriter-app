<!-- src/lib/pages/landing/sections/hero/KeyboardShortcut.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  export let rotation = 8; // Get from data config
  
  let keyLetter = 'C';
  let ctrlPressed = false;
  
  onMount(() => {
    const interval = setInterval(() => {
      keyLetter = keyLetter === 'C' ? 'V' : 'C';
    }, 2000);

    return () => clearInterval(interval);
  });
</script>

<div class="absolute inset-0 flex items-center justify-center gap-2 
            text-foreground/90"
     style="transform: rotate({rotation}deg)">
  <!-- Ctrl Key -->
  <div class="px-5 py-2 rounded-md bg-foreground/20 border border-foreground/50
              text-lg font-medium">
    Ctrl
  </div>
  
  <!-- Plus -->
  <span class="opacity-60">+</span>
  
  <!-- Letter Key -->
  <div class="w-12 h-12 flex items-center justify-center 
              rounded-md bg-foreground/20 border border-foreground/50
              text-lg font-medium">
    {keyLetter}
  </div>
</div>