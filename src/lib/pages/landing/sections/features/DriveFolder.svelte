<!-- src/lib/pages/landing/sections/features/DriveFolder.svelte -->
<script lang="ts">
  import { driveStore } from '../../stores/driveStore';
  import { driveRoot, getNodeByPath } from '../../data/folders';
  import DriveItem from './DriveItem.svelte';
  import DriveBreadcrumbs from './DriveBreadcrumbs.svelte';
  
  // Store subscriptions with proper reactivity
  $: currentFolder = $driveStore.currentFolder;
  $: breadcrumbs = $driveStore.breadcrumbs;
  $: currentPath = $driveStore.currentPath;
  $: isCompact = $driveStore.isCompact;
  $: showEarlyAccess = $driveStore.showEarlyAccess;
  
  // Ensure we have items to iterate over
  $: items = currentFolder?.children || driveRoot.children || [];
  $: activeNode = getNodeByPath(currentPath);

  function handleItemClick(path: string) {
    driveStore.navigate(path);
  }

  function handleBreadcrumbClick(part: string, index: number) {
    driveStore.handleBreadcrumbClick(part, index);
  }
</script>

<div 
  class="flex flex-col rounded-xl border overflow-hidden bg-zinc-950 text-white"
  role="navigation"
  aria-label="Drive folder navigation"
>
  <DriveBreadcrumbs
    {breadcrumbs}
    onClick={handleBreadcrumbClick}
  />

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
        <DriveItem
          item={activeNode}
          currentPath={currentPath}
          onClick={() => driveStore.toggleCompact()}
        />

      <!-- Full View -->
      {:else}
        {#each items as item (item.path)}
          <DriveItem
            {item}
            {currentPath}
            onClick={handleItemClick}
          />
        {/each}
      {/if}
    </div>
  {/if}
</div>