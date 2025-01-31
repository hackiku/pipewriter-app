<!-- src/lib/components/demo/docs/DocsHeader.svelte -->
<script lang="ts">
  import { FileText } from 'lucide-svelte';
</script>

<div class="flex flex-col border-b border-zinc-200 dark:border-zinc-800 
            bg-white dark:bg-zinc-900 transition-colors">
  <!-- Main Header -->
  <header class="flex items-center gap-2 px-4 h-12">
    <div class="flex items-center gap-2">
      <img src="/icons/google-docs.svg" alt="Google Docs Icon" class="h-6 w-6">
			<!-- <FileText class="w-5 h-5 text-[#4285f4] dark:text-[#8ab4f8]" /> -->
      <span class="text-sm font-medium text-zinc-700 dark:text-zinc-200">
        Landing Page Copy
      </span>
    </div>
    
    <!-- Basic Menu Bar -->
    <div class="ml-8 flex items-center gap-4">
      {#each ['File', 'Edit', 'View', 'Insert'] as item}
        <button class="text-sm text-zinc-600 hover:text-zinc-900 
                      dark:text-zinc-400 dark:hover:text-zinc-200 
                      transition-colors">
          {item}
        </button>
      {/each}
    </div>
  </header>

  <!-- Toolbar -->
  <div class="px-4 py-1.5 border-t border-zinc-100 dark:border-zinc-800">
    <div class="inline-flex items-center gap-1 px-2 py-1 
                bg-zinc-100/80 dark:bg-zinc-800/80 
                rounded-full">
      <div class="w-4 h-4 bg-zinc-200 dark:bg-zinc-700 rounded-sm" />
      <div class="w-24 h-4 bg-zinc-200 dark:bg-zinc-700 rounded-sm" />
      <div class="w-16 h-4 bg-zinc-200 dark:bg-zinc-700 rounded-sm" />
    </div>
  </div>
</div>