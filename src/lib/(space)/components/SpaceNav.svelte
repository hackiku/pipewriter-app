<!-- src/lib/pages/space/components/SpaceNav.svelte -->

<!-- src/lib/pages/space/layout/SpaceNav.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Sun, Moon, PenTool } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import SpaceButton from "../components/cta/SpaceButton.svelte";
  import { onMount } from "svelte";
  import { spaceStore } from '../stores/spaceStore';

  let isVisible = true;
  let lastScrollY = 0;

  onMount(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (Math.abs(scrollDelta) > 50) {
        isVisible = scrollDelta < 0 || currentScrollY < 100;
        lastScrollY = currentScrollY;
        spaceStore.updateScroll(currentScrollY);
      }
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
    <div 
      class="absolute inset-0 rounded-full opacity-50 dark:opacity-30 blur-xl -z-10"
      style="
        background: radial-gradient(
          circle at 50% 50%,
          rgba(79, 70, 229, 0.08),
          rgba(139, 92, 246, 0.08),
          transparent 70%
        );
      "
    />
    
    <div class="bg-background/70 backdrop-blur-md border border-border/5 shadow-sm rounded-full px-1 md:px-4">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" class="flex items-center gap-1.5">
          <PenTool class="h-5 -rotate-90"/>
          <span class="text-lg font-semibold">Pipewriter</span>
        </a>

        <div class="flex items-center gap-4">
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

          <SpaceButton size="sm" />
        </div>
      </div>
    </div>
  </div>
</nav>