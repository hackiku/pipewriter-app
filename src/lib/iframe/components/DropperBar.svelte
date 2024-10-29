<!-- $lib/iframe/components/DropperBar.svelte -->
<script lang="ts">
  import { elementsTheme, chainMode } from '../stores';
  import { Sun, Moon, Palette, Link } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { cn } from "$lib/utils";

  let showThemes = false;

  const themes = [
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'white', label: 'White', icon: Sun },
    { id: 'gray', label: 'Gray', icon: Palette }
  ] as const;

  function setTheme(themeId: string) {
    elementsTheme.set(themeId);
    showThemes = false;
  }

  $: currentTheme = themes.find(t => t.id === $elementsTheme) || themes[1];
  $: otherThemes = themes.filter(t => t.id !== $elementsTheme);
</script>

<div class="relative dropper-container">
  <!-- Bottom Gradient -->
  <div class="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background from-40% via-background/80 via-70% to-transparent to-100% pointer-events-none" />

  <!-- Centered Tab with Buttons -->
  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
    <!-- Tab Shape -->
    <div class="w-26 h-10 bg-white dark:bg-gray-800 rounded-t-2xl border-t border-x border-gray-200 dark:border-gray-700 shadow-lg">
      <!-- Button Container -->
      <div class="h-full flex items-center justify-between px-2 gap-2">
        <button
          class={cn(
            "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
            $chainMode && "text-foreground"
          )}
          on:click={() => chainMode.update(n => !n)}
        >
          <Link size={18} class={$chainMode ? "text-foreground" : "text-muted-foreground"} />
        </button>

        <!-- Theme Button with Expansion -->
        <div class="relative">
          <button
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            on:click={() => showThemes = !showThemes}
          >
            <svelte:component 
              this={currentTheme.icon} 
              size={18} 
              class="text-foreground"
            />
          </button>

          {#if showThemes}
            <div 
              class="absolute bottom-full right-0 mb-1 flex flex-col gap-1"
              transition:slide={{duration: 150, axis: 'y'}}
            >
              {#each otherThemes as theme}
                <button
                  class="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 
                         dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                  on:click={() => setTheme(theme.id)}
                >
                  <svelte:component 
                    this={theme.icon} 
                    size={18} 
                    class="text-muted-foreground" 
                  />
                </button>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .dropper-container {
    position: relative;
    z-index: 10;
  }
</style>