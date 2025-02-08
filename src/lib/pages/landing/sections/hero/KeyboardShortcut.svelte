<!-- src/lib/pages/landing/sections/hero/KeyboardShortcut.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  export let rotation = 8;
  let keyLetter = 'C';
  let ctrlPressed = false;
  let letterPressed = false;
  
  onMount(() => {
    const animate = async () => {
      while (true) {
        ctrlPressed = true;
        await new Promise(r => setTimeout(r, 200));
        letterPressed = true;
        await new Promise(r => setTimeout(r, 200));
        ctrlPressed = false;
        letterPressed = false;
        await new Promise(r => setTimeout(r, 200));
        keyLetter = keyLetter === 'C' ? 'V' : 'C';
        await new Promise(r => setTimeout(r, 1400));
      }
    };
    
    animate();
    return () => {};
  });
</script>

<div class="absolute inset-0 flex items-center justify-center gap-3 text-foreground/90"
     style="transform: rotate({rotation}deg)">
  
  <!-- Ctrl Key -->
  <div class="relative">
    <!-- Static Shadow -->
    <div class="absolute inset-0 rounded-md bg-foreground/20 translate-x-[3px] translate-y-[3px]" />
    <!-- Button -->
    <div class="relative px-5 py-2 rounded-md bg-foreground/10 
                border-2 border-foreground/20 text-lg font-medium
                transition-transform duration-75 ease-in-out
                hover:translate-x-0.5 hover:translate-y-0.5"
         class:translate-x-[3px]={ctrlPressed}
         class:translate-y-[3px]={ctrlPressed}>
      Ctrl
    </div>
  </div>
  
  <!-- Plus -->
  <span class="opacity-80 font-medium">+</span>
  
  <!-- Letter Key -->
  <div class="relative">
    <!-- Static Shadow -->
    <div class="absolute inset-0 w-12 h-12 rounded-md bg-foreground/20 translate-x-[3px] translate-y-[3px]" />
    <!-- Button -->
    <div class="relative w-12 h-12 flex items-center justify-center rounded-md 
                bg-foreground/10 border-2 border-foreground/20 text-lg font-medium
                transition-transform duration-75 ease-in-out
                hover:translate-x-0.5 hover:translate-y-0.5"
         class:translate-x-[3px]={letterPressed}
         class:translate-y-[3px]={letterPressed}>
      {keyLetter}
    </div>
  </div>
</div>