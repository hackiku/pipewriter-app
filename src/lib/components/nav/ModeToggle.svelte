<!-- src/lib/components/nav/ModeToggle.svelte -->
<script lang="ts">
  import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
</script>

<button
  on:click={toggleMode}
  class="relative w-10 h-10 rounded-full 
         flex items-center justify-center
				 hover:bg-foreground/10
         hover:text-[#3644FE] dark:hover:text-[#B345ED]
         transition-colors duration-300"
>
  <Sun
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform duration-300 
           dark:-rotate-90 dark:scale-0"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform duration-300 
           dark:rotate-0 dark:scale-100"
  />
  <span class="sr-only">Toggle theme</span>
</button>