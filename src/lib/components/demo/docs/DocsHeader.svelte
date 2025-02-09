<!-- src/lib/components/demo/docs/DocsHeader.svelte -->
<script lang="ts">
  import Dropdown from './Dropdown.svelte';
  
  const menuItems = ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Extensions', 'Help', 'Accessibility', 'Pipewriter'];
  let isDropdownOpen = false;
</script>

<div class="flex sh-[72px] bg-white dark:bg-zinc-900 items-start px-4">
  <!-- Logo Column -->
  <div class="flex items-center w-16">
    <img src="/tools/gdocs.svg" alt="Google Docs" class="h-12"/>
  </div>
  
  <!-- Content Column -->
  <div class="flex flex-col gap-1">
    <!-- Document Title -->
    <span class="text-sm font-medium text-zinc-700 dark:text-zinc-300">
      Landing Page v1
    </span>
    
    <!-- Menu Bar -->
    <div class="flex items-center gap-6">
      {#each menuItems as item}
        {#if item === 'Pipewriter'}
          <Dropdown 
            on:click={() => isDropdownOpen = !isDropdownOpen}
            open={isDropdownOpen}
            on:close={() => isDropdownOpen = false}
          >
            <button class="text-[13px] text-zinc-600 hover:text-zinc-900 
                          dark:text-zinc-400 dark:hover:text-zinc-200">
              {item}
            </button>
          </Dropdown>
        {:else}
          <button class="text-[13px] text-zinc-600 hover:text-zinc-900 
                        dark:text-zinc-400 dark:hover:text-zinc-200">
            {item}
          </button>
        {/if}
      {/each}
    </div>
  </div>
</div>