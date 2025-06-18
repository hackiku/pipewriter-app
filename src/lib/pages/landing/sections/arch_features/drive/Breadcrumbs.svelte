<!-- src/lib/pages/landing/sections/features/drive/Breadcrumbs.svelte -->
<script lang="ts">
  import { ChevronDown } from 'lucide-svelte';
  import { driveStore } from '../../../stores/driveStore';
  
  export let breadcrumbs: string[] = [];
  export let onClick: (part: string, index: number) => void;
  export let currentPath: string;

  // Filter out .gdoc files and get path components
  $: pathParts = currentPath.split('/').filter(part => !part.endsWith('.gdoc') && part !== '');
  $: showFolder = pathParts.length > 0;
  $: folderName = showFolder ? pathParts[0] : null;
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
      <!-- My Drive -->
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

    <!-- Optional folder -->
    {#if showFolder}
      <span class="text-white/30" aria-hidden="true">/</span>
      <button 
        class="text-white hover:text-white/90 transition-colors"
        on:click={() => onClick(folderName, 1)}
      >
        {folderName}
      </button>
    {/if}
  </nav>

  <!-- Chevron Toggle -->
  <button
    class="ml-auto hover:opacity-80 transition-all p-1 rounded-md
           hover:bg-white/5"
    on:click={() => driveStore.toggleCompact()}
    aria-label="Toggle folder view"
  >
    <ChevronDown 
      class="w-4 h-4 transition-transform duration-200
             {$driveStore.isCompact ? '-rotate-90' : 'rotate-0'}"
    />
  </button>
</div>