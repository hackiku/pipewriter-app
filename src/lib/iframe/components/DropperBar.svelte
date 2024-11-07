<!-- $lib/iframe/components/DropperBar.svelte -->

<script lang="ts">
  import { elementsTheme, chainMode } from '../stores';
  import { dropperStore } from '../stores/dropperStore';
	import { Link } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { cn } from "$lib/utils";
  import ColorButton from "./ColorButton.svelte";

	
  let showThemes = false;

  const themes = [
    { id: 'gray', color: '#A3A3A3', label: 'Gray' },
    { id: 'white', color: '#FFFFFF', label: 'White' },
    { id: 'dark', color: '#171717', label: 'Black' }
  ] as const;

  function setTheme(themeId: string) {
    elementsTheme.set(themeId);
    showThemes = false;
  }

  function toggleThemes() {
    showThemes = !showThemes;
  }

  $: currentTheme = themes.find(t => t.id === $elementsTheme) || themes[1];
  $: otherThemes = themes.filter(t => t.id !== currentTheme.id);
</script>

<div class="relative dropper-container">
  <!-- Background Gradient -->
  <div 
    class="absolute bottom-0 left-0 right-0 h-20 
           bg-gradient-to-t from-background from-40% via-background/80 via-70% to-transparent"
    aria-hidden="true"
  />

  <!-- Main Control Bar -->
  <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 z-10">
    <div class={cn(
      "relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg",
      showThemes ? "rounded-t-2xl -pt-2" : "rounded-t-2xl",
      "transition-all duration-300 ease-out"
    )}>
      <!-- All Buttons Container -->
      <div class="grid grid-cols-2 gap-3 p-3">
        <!-- Theme Selection Buttons (Top Row) -->
        {#if showThemes}
          {#each otherThemes as theme}
            <div 
              class="w-6"
              in:slide={{
                duration: 300,
                easing: quintOut,
                axis: 'y'
              }}
            >
              <ColorButton
                color={theme.color}
                title={theme.label}
                isSelected={false}
                on:click={() => setTheme(theme.id)}
              />
            </div>
          {/each}
        {/if}

        <!-- Chain and Current Color Buttons (Bottom Row) -->
        <div class="w-6">
          <button
            class={cn(
              "w-6 h-6 rounded-full transition-colors flex items-center justify-center",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              $chainMode && "text-foreground"
            )}
            on:click={() => chainMode.update(n => !n)}
            aria-label="Toggle chain mode"
          >
            <Link 
              size={18} 
              class={$chainMode ? "text-foreground" : "text-muted-foreground"} 
            />
          </button>
        </div>

        <div class="w-6">
          <ColorButton
            color={currentTheme.color}
            title={currentTheme.label}
            isSelected={showThemes}
            on:click={toggleThemes}
          />
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