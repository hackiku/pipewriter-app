<!-- src/lib/(space)/components/nav/ModeToggle.svelte -->
<script lang="ts">
  import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
</script>

<button
  on:click={toggleMode}
  class="relative w-10 h-10 rounded-full 
         hover:bg-muted/20 transition-colors duration-200
         flex items-center justify-center"
>
  <Sun
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all 
           dark:-rotate-90 dark:scale-0"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all 
           dark:rotate-0 dark:scale-100"
  />
  <span class="sr-only">Toggle theme</span>
</button>