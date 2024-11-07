<!-- $lib/iframe/components/DropperBar.svelte -->

<script lang="ts">
  import { elementsTheme, chainMode, currentColor } from '../stores';
  import { Link } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  import { cn } from "$lib/utils";
  import ColorButton from "./ColorButton.svelte";

  let showThemes = false;

  const themes = [
    { id: 'dark', color: '#171717', label: 'Dark' },
    { id: 'white', color: '#FFFFFF', label: 'White' },
    { id: 'gray', color: '#A3A3A3', label: 'Gray' }
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
  <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background from-40% via-background/80 via-70% to-transparent to-100% pointer-events-none" />

  <!-- Centered Tab with Buttons -->
  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
    <!-- Tab Shape -->
    <div class="w-26 h-11 bg-white dark:bg-gray-800 rounded-t-2xl border-t border-x border-gray-200 dark:border-gray-700 shadow-lg">
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
        <div class="relative w-6 h-6">
          <ColorButton
            color={currentTheme.color}
            title={currentTheme.label}
            isSelected={true}
            on:click={() => showThemes = !showThemes}
          />

          {#if showThemes}
            <div 
              class="absolute bottom-full right-0 mb-1 flex flex-col gap-1"
              transition:slide={{duration: 150, axis: 'y'}}
            >
              {#each otherThemes as theme}
                <ColorButton
                  color={theme.color}
                  title={theme.label}
                  isSelected={$currentColor === theme.color}
                  on:click={() => setTheme(theme.id)}
                />
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