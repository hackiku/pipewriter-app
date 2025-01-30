<!-- src/lib/pages/landing/sections/features/DriveFolder.svelte -->
<script lang="ts">
  import { FileText, Folder, Settings } from 'lucide-svelte';

  const folderContents = [
    { type: 'folder', name: 'samples', icon: Folder },
    { type: 'folder', name: 'guides', icon: Folder },
    { type: 'folder', name: 'AI', icon: Folder },
    { type: 'doc', name: 'Elements 🎨', icon: FileText, shared: true },
    { type: 'doc', name: 'Darkmode 🌒', icon: FileText, shared: true },
    { type: 'doc', name: 'Blank ⚪', icon: FileText, shared: true }
  ];
</script>

<div class="h-full flex flex-col rounded-xl border overflow-hidden bg-zinc-950 text-white">
  <!-- Drive Header -->
  <div class="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900">
    <img src="/icons/google-drive.svg" alt="Google Drive" class="w-6 h-6" />
    <div class="flex items-center gap-1 text-sm">
      <span>My Drive</span>
      <span class="text-white/40">/</span>
      <span>DOCS</span>
      <span class="text-white/40">/</span>
      <span>Pipewriter</span>
    </div>
  </div>

  <!-- Toolbar -->
  <div class="flex items-center gap-4 px-4 py-2 border-b border-white/10 bg-zinc-900/50">
    <button class="px-3 py-1.5 text-sm hover:bg-white/10 rounded-md transition-colors">
      Type
    </button>
    <button class="px-3 py-1.5 text-sm hover:bg-white/10 rounded-md transition-colors">
      People
    </button>
    <button class="px-3 py-1.5 text-sm hover:bg-white/10 rounded-md transition-colors">
      Modified
    </button>
  </div>

  <!-- File List -->
  <div class="flex-1 overflow-y-auto">
    {#each folderContents as item}
      <div class="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors">
        <svelte:component this={item.icon} class="w-5 h-5 text-white/70" />
        <span class="flex-1">{item.name}</span>
        {#if item.shared}
          <div class="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
            <span class="text-xs">👥</span>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>