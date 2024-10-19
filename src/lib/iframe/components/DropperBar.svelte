<!-- $lib/iframe/components/DropperBar.svelte -->
<script lang="ts">
  import { elementsTheme } from '../stores';
  import { Sun, Moon, Palette } from 'lucide-svelte';

  const themes = ['light', 'gray', 'dark'] as const;
  type Theme = typeof themes[number];

  function setTheme(theme: Theme) {
    elementsTheme.set(theme);
  }
</script>

<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-background rounded-t-full shadow-lg">
  <div class="flex items-center space-x-2 p-2">
    {#each themes as theme}
      <button
        class="w-6 h-6 rounded-full flex items-center justify-center transition-all mt-2
               {$elementsTheme === theme ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'}"
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
</div>