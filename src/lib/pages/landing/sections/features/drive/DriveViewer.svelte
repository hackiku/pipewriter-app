<!-- src/lib/pages/landing/sections/features/drive/DriveViewer.svelte -->
<script lang="ts">
  import { driveStore } from '../../../stores/driveStore';
  import { driveRoot } from '../../../data/folders';
  import Row from './Row.svelte';
  import Breadcrumbs from './Breadcrumbs.svelte';
  
  $: currentPath = $driveStore.currentPath;
  $: items = driveRoot.children || [];

  function handleItemClick(path: string) {
    driveStore.navigate(path);
  }

  function handleBreadcrumbClick(part: string, index: number) {
    driveStore.handleBreadcrumbClick(part, index);
  }

  // Show folder in breadcrumbs only when inside one
  $: breadcrumbs = ['Pipewriter'];
  $: {
    if (currentPath !== '/') {
      const parts = currentPath.split('/').filter(Boolean);
      const firstPart = parts[0];
      const isFolder = items.find(item => 
        item.type === 'folder' && item.path === '/' + firstPart
      );
      
      if (isFolder) {
        breadcrumbs = ['Pipewriter', firstPart];
      }
    }
  }
</script>

<div 
  class="flex flex-col rounded-xl border overflow-hidden bg-zinc-950 text-white"
  role="navigation"
  aria-label="Drive folder navigation"
>
  <Breadcrumbs
    {breadcrumbs}
    {currentPath}
    onClick={handleBreadcrumbClick}
  />

  <div class="overflow-hidden transition-all duration-300">
    {#each items as item (item.path)}
      <Row
        {item}
        {currentPath}
        onClick={handleItemClick}
      />
    {/each}
  </div>
</div>