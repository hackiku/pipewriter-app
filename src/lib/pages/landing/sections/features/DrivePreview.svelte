<!-- src/lib/pages/landing/sections/features/DrivePreview.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { FileText, Folder, Moon } from 'lucide-svelte';

  export let activeId: number | null = null;

  const folderContents = [
    { type: 'folder', name: 'samples', icon: Folder },
    { type: 'folder', name: 'guides', icon: Folder },
    { type: 'folder', name: 'AI', icon: Folder },
    { type: 'doc', name: 'Elements 🎨', icon: FileText, shared: true },
    { type: 'doc', name: 'Darkmode 🌒', icon: FileText, shared: true },
    { type: 'doc', name: 'Blank ⚪', icon: FileText, shared: true }
  ];

  $: activeItem = activeId ? folderContents[activeId - 1] : null;
</script>

<div class="h-[70vh] flex flex-col rounded-3xl overflow-hidden border bg-zinc-950 text-white">
  <!-- Drive Header -->
  <div class="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
    <img src="/icons/google-drive.svg" alt="Google Drive" class="w-6 h-6" />
    <div class="flex items-center gap-1 text-sm text-zinc-400">
      <span class="text-white">My Drive</span>
      <span>/</span>
      <span class="text-white">Pipewriter</span>
    </div>
  </div>

  <!-- Preview Area -->
  <div class="flex-1 relative">
    <!-- File List (Always visible) -->
    <div class="absolute inset-0 overflow-y-auto">
      {#each folderContents as item, i}
        <button
          class="flex items-center gap-3 w-full px-4 py-2 
                 {activeId === i + 1 ? 'bg-primary bg-opacity-10' : 'hover:bg-white hover:bg-opacity-5'} 
                 transition-colors"
        >
          <svelte:component this={item.icon} class="w-5 h-5 text-zinc-400" />
          <span class="flex-1">{item.name}</span>
          {#if item.shared}
            <div class="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
              <span class="text-xs">👥</span>
            </div>
          {/if}
        </button>
      {/each}
    </div>

    <!-- Preview Overlay -->
    {#if activeId}
      <div
        class="absolute inset-0 bg-zinc-950 bg-opacity-90 backdrop-blur-sm"
        transition:fade={{ duration: 200 }}
      >
        <!-- Content varies based on activeId -->
        <div class="h-full flex items-center justify-center p-8">
          {#if activeId === 1}
            <div class="space-y-4 text-center">
              <div class="text-6xl">📦</div>
              <h3 class="text-2xl font-medium">90+ UI Elements</h3>
              <p class="text-zinc-400">Ready to copy-paste into your docs</p>
            </div>
          {:else if activeId === 2}
            <div class="space-y-4 text-center">
              <div class="text-6xl">📝</div>
              <h3 class="text-2xl font-medium">12 Template Docs</h3>
              <p class="text-zinc-400">Pre-formatted for perfect deliverables</p>
            </div>
          {:else if activeId === 3}
            <div class="space-y-4 text-center">
              <div class="text-6xl">🌗</div>
              <h3 class="text-2xl font-medium">Dark Mode Built-in</h3>
              <p class="text-zinc-400">Switch themes with one click</p>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>