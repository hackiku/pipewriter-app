<!-- $lib/iframe/components/DropperBar.svelte -->
<script lang="ts">
  import { elementsTheme, chainMode } from '../stores';
  import { Sun, Moon, Palette, Link } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import * as Tooltip from "$lib/components/ui/tooltip";

  let showThemes = false;

  const themes = [
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'gray', label: 'Gray', icon: Palette },
    { id: 'light', label: 'Default', icon: Sun }
  ] as const;

  function setTheme(themeId: string) {
    elementsTheme.set(themeId);
    showThemes = false;
  }

  $: currentTheme = themes.find(t => t.id === $elementsTheme) || themes[2];
</script>

<div class="relative">
  <!-- Folder Tab Design -->
  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
    <div class="relative">
      <!-- Tab Shape -->
      <div class="relative w-32 h-12 bg-white dark:bg-gray-800 rounded-t-[32px] shadow-lg">
        <!-- Left curve -->
        <div class="absolute -left-6 bottom-0 w-6 h-6 bg-white dark:bg-gray-800" />
        <!-- Right curve -->
        <div class="absolute -right-6 bottom-0 w-6 h-6 bg-white dark:bg-gray-800" />
        
        <!-- Theme Button -->
        <button
          class="w-full h-full flex items-center justify-center"
          on:click={() => showThemes = !showThemes}
        >
          <svelte:component this={currentTheme.icon} size={20} />
        </button>

        <!-- Theme Options Dropdown -->
        {#if showThemes}
          <div
            class="absolute bottom-full mb-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            transition:slide={{duration: 200, easing: cubicOut}}
          >
            {#each themes as theme}
              <button
                class="flex items-center gap-2 w-full p-2 transition-all duration-200
                       {$elementsTheme === theme.id ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}"
                on:click={() => setTheme(theme.id)}
              >
                <svelte:component this={theme.icon} size={18} />
                <span class="text-sm">{theme.label}</span>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Chain Mode Button -->
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <button 
        class="absolute left-4 bottom-2 p-2 rounded-full transition-all duration-200
               {$chainMode ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}"
        on:click={() => chainMode.update(n => !n)}
      >
        <Link size={20} />
      </button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>Chain Mode</p>
    </Tooltip.Content>
  </Tooltip.Root>
</div>

<div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />

<style>
  /* Add any additional styling here */
</style>