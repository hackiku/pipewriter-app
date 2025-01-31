<!-- src/lib/pages/landing/sections/features/DriveFolder.svelte -->
<script lang="ts">
  import { Folder } from 'lucide-svelte';
  import { driveContents, type DriveItem } from '../../data/folders';
  
  export let activeId: string | null = null;
  export let onSelect: (id: string) => void = () => {};

  function handleItemClick(item: DriveItem) {
    if (item.preview) {
      onSelect(item.id);
    }
  }

  $: pathParts = [
    'My Drive',
    'Pipewriter',
    ...(activeId === 'samples' ? ['samples'] : [])
  ];
</script>

<div class="w-fit flex flex-col rounded-xl border overflow-hidden bg-zinc-950 text-white">
  <!-- Drive Header -->
  <div class="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900 w-full">
    <img src="/icons/google-drive.svg" alt="Google Drive" class="w-5 h-5" />
    <div class="flex items-center gap-1 text-sm whitespace-nowrap">
      {#each pathParts as part, i}
        {#if i > 0}
          <span class="text-white/40">/</span>
        {/if}
        <span class={i === pathParts.length - 1 ? 'text-white/40' : ''}>{part}</span>
      {/each}
    </div>
  </div>

  <!-- File List -->
  <div class="flex-1 overflow-y-auto min-w-[300px]">
    {#each driveContents as item}
      {#if item.type === 'folder'}
        <div class="group">
          <button 
            class="flex items-center gap-3 px-4 py-2 w-full
                   {activeId === item.id ? 'bg-white/10' : 'hover:bg-white/5'} 
                   {item.preview ? 'cursor-pointer' : 'cursor-default'}
                   transition-colors"
            on:click={() => handleItemClick(item)}
          >
            <Folder class="w-4 h-4 text-white/70" />
            <span class="flex-1 text-sm text-left">{item.name}</span>
          </button>
          
          {#if activeId === item.id && item.items}
            <div class="pl-4">
              {#each item.items as subItem}
                <button 
                  class="flex items-center gap-3 px-4 py-2 w-full
                         {activeId === subItem.id ? 'bg-white/10' : 'hover:bg-white/5'}
                         {subItem.preview ? 'cursor-pointer' : 'cursor-default'}
                         transition-colors"
                  on:click={() => handleItemClick(subItem)}
                >
                  <img
                    class="w-4 h-4"
                    src="/icons/google-docs-file.svg"
                    alt="Google Docs Icon"
                  />
                  <span class="flex-1 text-sm text-left">{subItem.name}</span>
                  {#if subItem.shared}
                    <div class="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <span class="text-xs">👥</span>
                    </div>
                  {/if}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {:else}
        <button 
          class="flex items-center gap-3 px-4 py-2 w-full
                 {activeId === item.id ? 'bg-white/10' : 'hover:bg-white/5'}
                 {item.preview ? 'cursor-pointer' : 'cursor-default'}
                 transition-colors"
          on:click={() => handleItemClick(item)}
        >
          <img
            class="w-4 h-4"
            src="/icons/google-docs-file.svg"
            alt="Google Docs Icon"
          />
          <span class="flex-1 text-sm text-left">{item.name}</span>
          {#if item.shared}
            <div class="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <span class="text-xs">👥</span>
            </div>
          {/if}
        </button>
      {/if}
    {/each}
  </div>
</div>