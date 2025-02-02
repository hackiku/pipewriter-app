<!-- src/lib/pages/landing/sections/features/DriveFolder.svelte -->
<script lang="ts">
  import { Folder } from 'lucide-svelte';
  import { driveStore } from '../../stores/driveStore';
  import { driveRoot, getNodeByPath } from '../../data/folders';

  // Store subscriptions with proper reactivity
  $: currentFolder = $driveStore.currentFolder;
  $: breadcrumbs = $driveStore.breadcrumbs;
  $: currentPath = $driveStore.currentPath;
  $: isCompact = $driveStore.isCompact;
  $: showEarlyAccess = $driveStore.showEarlyAccess;
  
  // Ensure we have items to iterate over
  $: items = currentFolder?.children || driveRoot.children || [];
  $: activeNode = getNodeByPath(currentPath);

  // Handle navigation with path context
  function handleItemClick(path: string) {
    console.log('Clicked item:', path);
    driveStore.navigate(path);
  }

  // Breadcrumb click with index awareness
  function handleBreadcrumbClick(part: string, index: number) {
    console.log('Breadcrumb clicked:', part, 'at index:', index);
    driveStore.handleBreadcrumbClick(part, index);
  }
</script>

<div 
  class="flex flex-col rounded-xl border overflow-hidden bg-zinc-950 text-white"
  role="navigation"
  aria-label="Drive folder navigation"
>
  <!-- Path Bar -->
  <div class="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900">
    <button 
      class="hover:opacity-80 transition-opacity"
      on:click={() => driveStore.showMyDrive()}
    >
      <img src="/icons/google-drive.svg" alt="Google Drive" class="w-5 h-5" />
    </button>
    
    <nav class="flex items-center gap-1 text-sm whitespace-nowrap overflow-x-auto">
      {#each breadcrumbs || [] as part, i}
        {#if i > 0}
          <span class="text-white/40" aria-hidden="true">/</span>
        {/if}
        <button 
          class="hover:text-white/90 transition-colors
                 {i === (breadcrumbs?.length || 0) - 1 ? 'text-white' : 'text-white/40'}"
          on:click={() => handleBreadcrumbClick(part, i)}
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
      class="overflow-hidden transition-all duration-300"
      class:max-h-[120px]={isCompact}
    >
      <!-- Compact View -->
      {#if isCompact && activeNode}
        <button 
          class="flex items-center gap-3 px-4 py-2 w-full bg-white/10"
          on:click={() => driveStore.toggleCompact()}
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
          <div class="group">
            <button 
              class="flex items-center gap-3 px-4 py-2 w-full
                     {currentPath === item.path || currentPath.startsWith(item.path + '/') 
                       ? 'bg-white/10' 
                       : 'hover:bg-white/5'}
                     transition-colors"
              on:click={() => handleItemClick(item.path)}
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

            <!-- Show folder contents when folder is active -->
            {#if item.type === 'folder' && item.path === currentPath && item.children}
              <div class="pl-4">
                {#each item.children as subItem (subItem.path)}
                  <button 
                    class="flex items-center gap-3 px-4 py-2 w-full
                           {currentPath === subItem.path ? 'bg-white/10' : 'hover:bg-white/5'}
                           transition-colors"
                    on:click={() => handleItemClick(subItem.path)}
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