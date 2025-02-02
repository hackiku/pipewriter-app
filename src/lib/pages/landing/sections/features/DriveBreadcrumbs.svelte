<!-- src/lib/pages/landing/sections/features/DriveBreadcrumbs.svelte -->
<script lang="ts">
  export let breadcrumbs: string[] = [];
  export let onClick: (part: string, index: number) => void;
  export let showDriveIcon = true;

  function handleDriveIconClick() {
    onClick('My Drive', 0);
  }
</script>

<div class="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900">
  {#if showDriveIcon}
    <button 
      class="hover:opacity-80 transition-opacity"
      on:click={handleDriveIconClick}
    >
      <img src="/tools/gdrive.svg" alt="Google Drive" class="w-5 h-5" />
    </button>
  {/if}
  
  <nav class="flex items-center gap-1 text-sm whitespace-nowrap overflow-x-auto">
    {#each breadcrumbs as part, i}
      {#if i > 0}
        <span class="text-white/40" aria-hidden="true">/</span>
      {/if}
      <button 
        class="hover:text-white/90 transition-colors
               {i === breadcrumbs.length - 1 ? 'text-white' : 'text-white/40'}"
        on:click={() => onClick(part, i)}
        aria-current={i === breadcrumbs.length - 1 ? 'page' : undefined}
      >
        {part}
      </button>
    {/each}
  </nav>
</div>