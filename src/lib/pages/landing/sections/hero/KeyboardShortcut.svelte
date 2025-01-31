<!-- src/lib/pages/landing/sections/hero/KeyboardShortcut.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  let keyLetter = 'C';
  
  onMount(() => {
    const interval = setInterval(() => {
      keyLetter = keyLetter === 'C' ? 'V' : 'C';
    }, 2000);

    return () => clearInterval(interval);
  });
</script>

  <div class="absolute inset-0 flex items-center justify-center gap-2 
              text-foreground/90">
    <!-- Ctrl Key -->
    <div class="key-press px-5 py-2 rounded-md 
                bg-foreground/20
                border border-foreground/50
                text-lg font-medium">
      Ctrl
    </div>
    <!-- Plus -->
    <span class="opacity-60">+</span>
    <!-- C/V Key -->
    <div class="key-press w-12 h-12 flex items-center justify-center 
                rounded-md bg-foreground/20
                border border-foreground/50
                text-lg font-medium">
      {keyLetter}
    </div>
  </div>

<style>
  .key-press {
    transition: transform 0.15s ease-out;
  }

  .key-press:active,
  .key-press.pressed {
    transform: translateY(1px);
  }
</style>