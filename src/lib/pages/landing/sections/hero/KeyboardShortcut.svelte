<!-- src/lib/pages/landing/sections/hero/KeyboardShortcut.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  export let rotation = 0;
  let keyLetter = 'C';
  let ctrlPressed = false;
  let letterPressed = false;
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    
    const animate = async () => {
      while (mounted) {
        // Press keys
        ctrlPressed = true;
        await new Promise(r => setTimeout(r, 200));
        letterPressed = true;
        await new Promise(r => setTimeout(r, 250));
        
        // Release keys
        ctrlPressed = false;
        letterPressed = false;
        await new Promise(r => setTimeout(r, 200));
        
        // Alternate between C and V
        keyLetter = keyLetter === 'C' ? 'V' : 'C';
        
        // Longer pause between animations
        await new Promise(r => setTimeout(r, 1400));
      }
    };
    
    animate();
    
    return () => {
      mounted = false;
    };
  });
</script>

<div class="relative w-full h-full flex items-center justify-center gap-3 text-foreground/90"
     style="transform: rotate({rotation}deg)">
  
  <!-- Ctrl Key -->
  <div class="relative">
    <!-- Static Shadow -->
    <div class="absolute inset-0 rounded-md bg-foreground/20 translate-x-[3px] translate-y-[3px]" />
    <!-- Button -->
    <div class="relative px-4 py-1.5 rounded-md bg-foreground/10 
                border-2 border-foreground/20 text-base font-medium
                transition-transform duration-75 ease-in-out"
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
    <div class="absolute inset-0 w-10 h-10 rounded-md bg-foreground/20 translate-x-[3px] translate-y-[3px]" />
    <!-- Button -->
    <div class="relative w-10 h-10 flex items-center justify-center rounded-md 
                bg-foreground/10 border-2 border-foreground/20 text-base font-medium
                transition-transform duration-75 ease-in-out"
         class:translate-x-[3px]={letterPressed}
         class:translate-y-[3px]={letterPressed}>
      {keyLetter}
    </div>
  </div>
</div>