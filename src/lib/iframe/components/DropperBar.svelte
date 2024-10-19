<!-- $lib/iframe/components/DropperBar.svelte -->
<script lang="ts">
  import { elementsTheme } from '../stores';
  import { Sun, Moon, Palette } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  const themes = ['light', 'gray', 'dark'] as const;
  type Theme = typeof themes[number];

  let isExpanded = false;

  function setTheme(theme: Theme) {
    elementsTheme.set(theme);
    isExpanded = false;
  }

  function toggleExpand() {
    isExpanded = !isExpanded;
  }

  $: currentThemeIcon = $elementsTheme === 'light' ? Sun : $elementsTheme === 'dark' ? Moon : Palette;
</script>

<div class="z-20 absolute bottom-0 left-1/2 transform -translate-x-1/2 p-1 bg-background rounded-full shadow-lg overflow-hidden"
     on:mouseenter={() => (isExpanded = true)}
     on:mouseleave={() => (isExpanded = false)}>
  <div class="flex items-center space-x-1 p-1 relative">
    <button
      class="w-8 h-8 rounded-full flex items-center justify-center transition-all
             bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
      on:click={toggleExpand}
      title={`${$elementsTheme.charAt(0).toUpperCase() + $elementsTheme.slice(1)} theme`}
    >
      <svelte:component this={currentThemeIcon} size={20} />
    </button>
    {#if isExpanded}
      <div class="flex space-x-1" in:slide={{ duration: 200, easing: cubicOut }} out:slide={{ duration: 200, easing: cubicOut }}>
        {#each themes.filter(theme => theme !== $elementsTheme) as theme}
          <button
            class="w-8 h-8 rounded-full flex items-center justify-center transition-all
                   bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
            on:click={() => setTheme(theme)}
            title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme`}
          >
            {#if theme === 'light'}
              <Sun size={20} />
            {:else if theme === 'dark'}
              <Moon size={20} />
            {:else}
              <Palette size={20} />
            {/if}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>


<div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>