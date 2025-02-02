<!-- src/lib/pages/landing/sections/features/DriveItem.svelte -->
<script lang="ts">
  import { Folder } from 'lucide-svelte';
  import type { DriveNode } from '../../data/folders';

  export let item: DriveNode;
  export let currentPath: string;
  export let onClick: (path: string) => void;
  export let level: number = 0;
  
  $: isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
  $: isFolder = item.type === 'folder';
  $: showChildren = isFolder && isActive && item.children;
</script>

<div class="group">
  <button 
    class="flex items-center gap-3 px-4 py-2 w-full
           {isActive ? 'bg-white/10' : 'hover:bg-white/5'}
           transition-colors"
    style="padding-left: {level * 16 + 16}px"
    on:click={() => onClick(item.path)}
  >
    {#if isFolder}
      <Folder class="w-4 h-4 text-white/70" />
    {:else}
      <img
        class="w-4 h-4"
        src="/tools/gdocs-square.svg"
        alt="Google Docs Icon"
      />
    {/if}
    <span class="flex-1 text-sm text-left">{item.name}</span>
    <div class="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
      <span class="text-xs" aria-label="Shared document">👥</span>
    </div>
  </button>

  {#if showChildren}
    {#each item.children as child (child.path)}
      <svelte:self
        item={child}
        {currentPath}
        {onClick}
        level={level + 1}
      />
    {/each}
  {/if}
</div>