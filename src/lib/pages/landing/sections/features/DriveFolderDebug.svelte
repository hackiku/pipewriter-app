<!-- // src/lib/pages/landing/sections/features/DriveFolderDebug.svelte -->
<script lang="ts">
  import { Folder } from 'lucide-svelte';
  import { driveStore } from '../../stores/driveStore';
  import { driveRoot, getNodeByPath } from '../../data/folders';
  
  // Store subscriptions
  $: currentFolder = $driveStore.currentFolder;
  $: breadcrumbs = $driveStore.breadcrumbs;
  $: currentPath = $driveStore.currentPath;
  $: isCompact = !$driveStore.isCompact; // Inverted for mobile view
  
  // Debug info
  $: currentNode = getNodeByPath(currentPath);
  $: parentPath = currentPath === '/' ? null : currentPath.split('/').slice(0, -1).join('/') || '/';
  $: items = currentFolder?.children || [];
  
  function handleFolderClick(path: string) {
    console.log('Navigation triggered:', path);
    driveStore.navigate(path);
  }
</script>

<div class="flex flex-col rounded-xl border overflow-hidden bg-zinc-950 text-white">
  <!-- Debug Panel -->
  <div class="p-4 border-b border-white/10 bg-zinc-800 text-sm">
    <div class="space-y-2">
      <p>Current Path: {currentPath}</p>
      <p>Parent Path: {parentPath}</p>
      <p>Is Compact: {isCompact}</p>
      <p>Items Count: {items.length}</p>
      <p>Breadcrumbs: {breadcrumbs?.join(' > ') || 'None'}</p>
    </div>
  </div>

  <!-- Path Bar -->
  <div class="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900">
    <img src="/icons/google-drive.svg" alt="Google Drive" class="w-5 h-5" />
    <nav class="flex items-center gap-1 text-sm whitespace-nowrap overflow-x-auto">
      {#each breadcrumbs || [] as part, i}
        {#if i > 0}
          <span class="text-white/40" aria-hidden="true">/</span>
        {/if}
        <button 
          class="hover:text-white/90 transition-colors
                 {i === (breadcrumbs?.length || 0) - 1 ? 'text-white' : 'text-white/40'}"
          on:click={() => {
            const path = part === 'My Drive' ? '/' 
                      : part === 'Pipewriter' ? '/Elements.gdoc'
                      : items[i]?.path || '/';
            console.log('Breadcrumb click:', part, 'Path:', path);
            handleFolderClick(path);
          }}
        >
          {part}
        </button>
      {/each}
    </nav>
  </div>

  <!-- File List -->
  <div class="overflow-hidden transition-all duration-300">
    {#if isCompact && currentNode}
      <button 
        class="flex items-center gap-3 px-4 py-2 w-full bg-white/10"
        on:click={() => driveStore.toggleCompact()}
      >
        {#if currentNode.type === 'folder'}
          <Folder class="w-4 h-4 text-white/70" />
        {:else}
          <img src="/icons/google-docs-file.svg" alt="Google Docs Icon" class="w-4 h-4" />
        {/if}
        <span class="flex-1 text-sm text-left">{currentNode.name}</span>
      </button>
    {:else}
      {#each items as item (item.path)}
        <button 
          class="flex items-center gap-3 px-4 py-2 w-full
                 {currentPath === item.path ? 'bg-white/10' : 'hover:bg-white/5'}
                 transition-colors"
          on:click={() => handleFolderClick(item.path)}
        >
          {#if item.type === 'folder'}
            <Folder class="w-4 h-4 text-white/70" />
          {:else}
            <img src="/icons/google-docs-file.svg" alt="Google Docs Icon" class="w-4 h-4" />
          {/if}
          <span class="flex-1 text-sm text-left">{item.name}</span>
          <div class="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
            <span class="text-xs" aria-label="Shared document">👥</span>
          </div>
        </button>

        {#if item.type === 'folder' && item.path === currentPath && item.children}
          <div class="pl-4">
            {#each item.children as subItem (subItem.path)}
              <button 
                class="flex items-center gap-3 px-4 py-2 w-full
                       {currentPath === subItem.path ? 'bg-white/10' : 'hover:bg-white/5'}
                       transition-colors"
                on:click={() => handleFolderClick(subItem.path)}
              >
                <img src="/icons/google-docs-file.svg" alt="Google Docs Icon" class="w-4 h-4" />
                <span class="flex-1 text-sm text-left">{subItem.name}</span>
                <div class="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <span class="text-xs" aria-label="Shared document">👥</span>
                </div>
              </button>
            {/each}
          </div>
        {/if}
      {/each}
    {/if}
  </div>
</div>