<!-- src/lib/pages/landing/sections/features/DriveFolder.svelte -->
<script lang="ts">
  import { Folder } from 'lucide-svelte';
  import { driveContents, type DriveItem } from '../../data/folders';
  
  export let activeId: string | null = null;
  export let onSelect: (id: string) => void = () => {};
  export let isRootView = true;

  let showEarlyAccess = false;
  let currentFolder: string | null = null;
  let isExpanded = false;

  // Helper to get current active item
  $: activeItem = activeId ? 
    driveContents.find(item => 
      item.id === activeId || 
      item.items?.some(subItem => `${item.id}/${subItem.id}` === activeId)
    ) : null;

  // Mobile behavior - show truncated view
  $: shouldTruncate = !isExpanded && window?.innerWidth < 768;
  
  function toggleExpand() {
    if (window?.innerWidth < 768) {
      isExpanded = !isExpanded;
    }
  }

  function handleDocClick(item: DriveItem) {
    if (item.preview) {
      onSelect(item.id);
    }
  }

  function handleFolderClick(item: DriveItem) {
    if (item.type === 'folder') {
      currentFolder = item.id;
      onSelect(`${item.id}/${item.items?.[0]?.id || ''}`);
    }
  }

  function handleItemClick(item: DriveItem) {
    if (item.type === 'folder') {
      handleFolderClick(item);
    } else {
      handleDocClick(item);
    }
  }

  function handlePathClick(part: string) {
    if (part === 'My Drive') {
      showEarlyAccess = true;
      currentFolder = null;
    } else if (part === 'Pipewriter') {
      showEarlyAccess = false;
      currentFolder = null;
      onSelect('elements');
    } else {
      // Handle subfolder clicks in path
      const folder = driveContents.find(item => item.id === part);
      if (folder) {
        handleFolderClick(folder);
      }
    }
  }

  $: {
    // Update currentFolder when activeId changes
    if (activeId?.includes('/')) {
      currentFolder = activeId.split('/')[0];
    }
  }

  $: pathParts = [
    'My Drive',
    'Pipewriter',
    ...(currentFolder ? [currentFolder] : [])
  ];

  $: getPathPartStyle = (part: string) => {
    if (showEarlyAccess) {
      return part === 'My Drive' ? 'text-white' : 'text-white/40';
    }
    if (part === currentFolder) return 'text-white';
    if (part === 'Pipewriter' && !currentFolder && !showEarlyAccess) return 'text-white';
    return 'text-white/40';
  };
</script>

<button 
  class="flex flex-col rounded-xl border overflow-hidden bg-zinc-950 text-white
         {shouldTruncate ? 'cursor-pointer' : ''}"
  on:click={toggleExpand}
>
  <!-- Drive Header -->
  <div class="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900">
    <img src="/icons/google-drive.svg" alt="Google Drive" class="w-5 h-5" />
    <div class="flex items-center gap-1 text-sm whitespace-nowrap overflow-x-auto">
      {#each pathParts as part, i}
        {#if i > 0}
          <span class="text-white/40">/</span>
        {/if}
        <button 
          class="hover:text-white/90 transition-colors {getPathPartStyle(part)}"
          on:click={() => handlePathClick(part)}
        >
          {part}
        </button>
      {/each}
    </div>
  </div>

  <!-- Early Access Message or File List -->
  {#if showEarlyAccess}
    <div class="p-8 text-center">
      <p class="text-lg mb-4">👋 Get early access to start building your docs!</p>
      <p class="text-sm text-white/70">Join the waitlist to be one of the first.</p>
    </div>
  {:else}


    <!-- File List -->
    <div class="overflow-hidden {shouldTruncate ? 'max-h-[120px]' : ''} transition-all duration-300">
      {#if shouldTruncate && activeItem}
        <!-- Mobile Truncated View -->
        {#if activeItem.type === 'folder'}
          <button class="flex items-center gap-3 px-4 py-2 w-full bg-white/10">
            <Folder class="w-4 h-4 text-white/70" />
            <span class="flex-1 text-sm text-left">{activeItem.name}</span>
          </button>
        {:else}
          <button class="flex items-center gap-3 px-4 py-2 w-full bg-white/10">
            <img
              class="w-4 h-4"
              src="/icons/google-docs-file.svg"
              alt="Google Docs Icon"
            />
            <span class="flex-1 text-sm text-left">{activeItem.name}</span>
          </button>
        {/if}
      {:else}
				<!-- File List -->
				<div class="overflow-y-auto">
					{#each driveContents as item}
						{#if item.type === 'folder'}
							<div class="group">
								<button 
									class="flex items-center gap-3 px-4 py-2 w-full
												{currentFolder === item.id ? 'bg-white/10' : 'hover:bg-white/5'} 
												cursor-pointer transition-colors"
									on:click={() => handleFolderClick(item)}
								>
									<Folder class="w-4 h-4 text-white/70" />
									<span class="flex-1 text-sm text-left">{item.name}</span>
								</button>
								
								{#if currentFolder === item.id && item.items}
									<div class="pl-4">
										{#each item.items as subItem}
											<button 
												class="flex items-center gap-3 px-4 py-2 w-full
															{activeId === `${item.id}/${subItem.id}` ? 'bg-white/10' : 'hover:bg-white/5'}
															{subItem.preview ? 'cursor-pointer' : 'cursor-default'}
															transition-colors"
												on:click={() => handleDocClick(subItem)}
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
								on:click={() => handleDocClick(item)}
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
			{/if}
    </div>
  {/if}
</button>