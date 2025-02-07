<!-- src/lib/pages/landing/sections/features/drive/Breadcrumbs.svelte -->
<script lang="ts">
  import { ChevronDown } from 'lucide-svelte';
  import { driveStore } from '../../../stores/driveStore';
  
  export let breadcrumbs: string[] = [];
  export let onClick: (part: string, index: number) => void;
  export let currentPath: string;
  export let isCompact: boolean;

  // Only show folder if we're inside one
  $: showFolder = currentPath.includes('/') && 
                  breadcrumbs.length > 1 && 
                  currentPath.split('/')[1] !== 'App.gdoc';

  function toggleCompact() {
    driveStore.toggleCompact();
  }
</script>

<div class="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900">
  <button 
    class="hover:opacity-80 transition-opacity"
    on:click={() => onClick('Pipewriter', 0)}
  >
    <img src="/tools/gdrive.svg" alt="Drive Folder" class="w-5 h-5" />
  </button>

  <nav class="flex items-center gap-1 text-sm whitespace-nowrap overflow-x-auto">
    <!-- Static My Drive text -->
    <button 
      class="text-white/50 hover:text-white/90 transition-colors"
      on:click={() => null}
    >
      My Drive
      <span class="text-white/30" aria-hidden="true">/</span>
    </button>

    <!-- Pipewriter -->
    <button 
      class="hover:text-white/90 transition-colors
             {!showFolder ? 'text-white' : 'text-white/50'}"
      on:click={() => onClick('Pipewriter', 0)}
    >
      Pipewriter
    </button>

    <!-- Optional folder (only shown when inside a folder) -->
    {#if showFolder}
      <span class="text-white/30" aria-hidden="true">/</span>
      <button 
        class="text-white hover:text-white/90 transition-colors"
        on:click={() => onClick(breadcrumbs[1], 1)}
      >
        {breadcrumbs[1]}
      </button>
    {/if}
  </nav>

  <!-- Chevron Toggle -->
  <button
    class="ml-auto hover:opacity-80 transition-all p-1 rounded-md
           hover:bg-white/5"
    on:click={toggleCompact}
    aria-label={isCompact ? 'Expand folder view' : 'Collapse folder view'}
  >
    <ChevronDown 
      class="w-4 h-4 transition-transform duration-200
             {isCompact ? '-rotate-90' : 'rotate-0'}"
    />
  </button>
</div>