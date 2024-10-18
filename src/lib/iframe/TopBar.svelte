<!-- $lib/gdocs/TopBar.svelte -->

<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import { showInfo, chainMode } from '$lib/iframe/stores';
  import { Link, Info, Sun, Moon } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";

  function toggleShowInfo() {
    showInfo.update(n => !n);
  }

  function toggleChainMode() {
    chainMode.update(n => !n);
  }

  let pressedColor = '#3801cd';
</script>

<div class="flex items-center">
  <!-- title -->
  <div class="flex-1 flex justify-start gap-2.5 h-full">
    
  </div>
  
  <!-- Buttons right -->
  <div class="flex-1 flex items-center justify-end gap-1">
    <div class="flex rounded-full gap-2">
      <!-- Chain Mode Button -->
      <button on:click={toggleChainMode} title="Chain Mode"
        class="hover:bg-zinc-100 transition-all rounded-full p-1"
      >
        <Link class="h-4 w-4" stroke={$chainMode ? pressedColor : 'gray'} />
      </button>

      <!-- Show Info Button -->
      <button on:click={toggleShowInfo} title="Show Info"
        class="hover:bg-zinc-100 transition-all rounded-full p-1"
      >
        <Info class="h-4 w-4" stroke={$showInfo ? pressedColor : 'gray'} />
      </button>
  
      <!-- Dark Mode -->
      <Button on:click={toggleMode} variant="outline" size="icon">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </div>
  </div>
</div>