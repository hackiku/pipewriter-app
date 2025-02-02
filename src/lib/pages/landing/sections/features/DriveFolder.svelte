<!-- src/lib/pages/landing/sections/features/DriveFolder.svelte -->
<script lang="ts">
  import { Folder } from 'lucide-svelte';
  import { driveStore } from '../../stores/driveStore';
  import { driveRoot, getNodeByPath, type DriveNode } from '../../data/folders';

  // Get current folder's contents
  $: currentFolder = $driveStore.currentFolder;
  $: breadcrumbs = $driveStore.breadcrumbs;
  $: currentPath = $driveStore.currentPath;
  $: isCompact = $driveStore.isCompact;
  $: showEarlyAccess = $driveStore.showEarlyAccess;
  
  // Ensure we have items to iterate over
  $: items = currentFolder?.children || [];
  $: activeNode = getNodeByPath(currentPath);
</script>

<div 
  class="flex flex-col rounded-xl border overflow-hidden bg-zinc-950 text-white"
  role="navigation"
  aria-label="Drive folder navigation"
>
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
          on:click={() => driveStore.navigate(part === 'My Drive' ? '/' : part === 'Pipewriter' ? '/Elements.gdoc' : items[i]?.path || '/')}
          aria-current={i === (breadcrumbs?.length || 0) - 1 ? 'page' : undefined}
        >
          {part}
        </button>
      {/each}
    </nav>
  </div>

  <!-- Early Access Message -->
  {#if showEarlyAccess}
    <div class="p-8 text-center">
      <p class="text-lg mb-4">👋 Get early access to start building your docs!</p>
      <p class="text-sm text-white/70">Join the waitlist to be one of the first.</p>
    </div>
  
  <!-- File List -->
  {:else}
    <div 
      class="overflow-hidden {isCompact ? 'max-h-[120px]' : ''} transition-all duration-300"
      role="list"
    >
      <!-- Compact View -->
      {#if isCompact && activeNode}
        <button 
          class="flex items-center gap-3 px-4 py-2 w-full bg-white/10"
          on:click={() => driveStore.toggleCompact()}
          role="listitem"
        >
          {#if activeNode.type === 'folder'}
            <Folder class="w-4 h-4 text-white/70" />
          {:else}
            <img
              class="w-4 h-4"
              src="/icons/google-docs-file.svg"
              alt="Google Docs Icon"
            />
          {/if}
          <span class="flex-1 text-sm text-left">{activeNode.name}</span>
        </button>

      <!-- Full View -->
      {:else}
        {#each items as item (item.path)}
          <div role="listitem">
            <button 
              class="flex items-center gap-3 px-4 py-2 w-full
                     {currentPath === item.path ? 'bg-white/10' : 'hover:bg-white/5'}
                     transition-colors"
              on:click={() => driveStore.navigate(item.path)}
            >
              {#if item.type === 'folder'}
                <Folder class="w-4 h-4 text-white/70" />
              {:else}
                <img
                  class="w-4 h-4"
                  src="/icons/google-docs-file.svg"
                  alt="Google Docs Icon"
                />
              {/if}
              <span class="flex-1 text-sm text-left">{item.name}</span>
              <div class="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                <span class="text-xs" aria-label="Shared document">👥</span>
              </div>
            </button>

            <!-- Folder Contents -->
            {#if item.type === 'folder' && item.path === currentPath && item.children}
              <div class="pl-4" role="list">
                {#each item.children as subItem (subItem.path)}
                  <button 
                    class="flex items-center gap-3 px-4 py-2 w-full
                           {currentPath === subItem.path ? 'bg-white/10' : 'hover:bg-white/5'}
                           transition-colors"
                    on:click={() => driveStore.navigate(subItem.path)}
                    role="listitem"
                  >
                    <img
                      class="w-4 h-4"
                      src="/icons/google-docs-file.svg"
                      alt="Google Docs Icon"
                    />
                    <span class="flex-1 text-sm text-left">{subItem.name}</span>
                    <div class="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <span class="text-xs" aria-label="Shared document">👥</span>
                    </div>
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>