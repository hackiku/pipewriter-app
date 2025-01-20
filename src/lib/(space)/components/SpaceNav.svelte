<!-- src/lib/(space)/components/SpaceNav.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Sun, Moon, PenTool, Menu, X } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import SpaceButton from "./cta/SpaceButton.svelte";
  import { onMount } from "svelte";
  import { spaceStore } from '../stores/spaceStore';

  let isVisible: boolean;
  let isMenuOpen: boolean;

  spaceStore.subscribe(state => {
    isVisible = state.isNavVisible;
    isMenuOpen = state.isMenuOpen;
  });

  onMount(() => {
    const handleScroll = () => {
      spaceStore.updateScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 p-4 sm:p-6 md:px-16 lg:px-24 xl:px-44"
  class:translate-y-4={isVisible}
  class:translate-y-[-100%]={!isVisible}
>
  <div class="relative rounded-full">
    <!-- Gradient glow -->
    <div 
      class="absolute inset-0 rounded-full opacity-50 dark:opacity-30 blur-xl -z-10"
      style="background: radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.08), rgba(139, 92, 246, 0.08), transparent 70%)"
    />
    
    <div class="bg-background/70 backdrop-blur-md border border-border/5 shadow-sm rounded-full px-1 md:px-4">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center rounded-full">
        <a href="/" class="flex items-center gap-1.5">
          <PenTool class="h-5 -rotate-90"/>
          <span class="text-lg font-semibold">Pipewriter</span>
        </a>

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center gap-4">
          <Button
            on:click={toggleMode}
            variant="outline"
            size="icon"
            class="w-10"
          >
            <Sun
              class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Moon
              class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>

          <SpaceButton size="sm" text="Book Repack"/>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center gap-2">
          <Button on:click={toggleMode} variant="outline" size="icon">
            <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <button 
            class="p-2" 
            on:click={() => spaceStore.toggleMenu()}
          >
            {#if isMenuOpen}
              <X class="w-6 h-6" />
            {:else}
              <Menu class="w-6 h-6" />
            {/if}
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      {#if isMenuOpen}
        <div class="md:hidden px-4 py-2 border-t space-y-2">
          <div class="px-3 pt-2">
            <SpaceButton 
              size="default"
              className="w-full font-normal" 
            />
          </div>
        </div>
      {/if}
    </div>
  </div>
</nav>