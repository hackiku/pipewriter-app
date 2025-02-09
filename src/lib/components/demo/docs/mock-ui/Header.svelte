<!-- src/lib/components/demo/docs/DocsHeader.svelte -->
<script lang="ts">
  import { X } from 'lucide-svelte';
</script>

<div class="flex flex-col bg-white dark:bg-zinc-900">
  <!-- Top Navigation -->
  <div class="flex h-12 items-center px-2 border-b border-zinc-200 dark:border-zinc-800">
    <!-- Left Section -->
    <div class="flex items-center gap-2 min-w-[240px] px-2">
      <img src="/tools/gdocs.svg" alt="Google Docs" class="w-6 h-6" />
      <span class="text-sm font-medium text-zinc-700 dark:text-zinc-300">Landing Page v1</span>
    </div>

    <!-- Center Section - Menu -->
    <div class="flex items-center gap-6 px-4">
      {#each ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Extensions', 'Help', 'Accessibility', 'Pipewriter'] as item}
        <button class="text-[13px] text-zinc-600 hover:text-zinc-900 
                       dark:text-zinc-400 dark:hover:text-zinc-200">
          {item}
        </button>
      {/each}
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-2 ml-auto">
      <button class="p-2 text-zinc-600 dark:text-zinc-400">
        <img src="/demo/assets/last-edit.svg" alt="Last edit" class="w-5 h-5 hidden dark:block" />
        <img src="/demo/assets/last-edit-dark.svg" alt="Last edit" class="w-5 h-5 block dark:hidden" />
      </button>
      <button class="p-2 text-zinc-600 dark:text-zinc-400">
        <img src="/demo/assets/comments.svg" alt="Comments" class="w-5 h-5 hidden dark:block" />
        <img src="/demo/assets/comments-dark.svg" alt="Comments" class="w-5 h-5 block dark:hidden" />
      </button>
      <button class="p-2 text-zinc-600 dark:text-zinc-400">
        <img src="/demo/assets/video.svg" alt="Video call" class="w-5 h-5 hidden dark:block" />
        <img src="/demo/assets/video-dark.svg" alt="Video call" class="w-5 h-5 block dark:hidden" />
      </button>
      <button class="ml-2 px-4 py-1.5 bg-[#c2e7ff] dark:bg-[#1a73e8] rounded-full
                     text-sm text-[#001d35] dark:text-white flex items-center gap-1">
        <img src="/demo/assets/share.svg" alt="Share" class="w-4 h-4 hidden dark:block" />
        <img src="/demo/assets/share-dark.svg" alt="Share" class="w-4 h-4 block dark:hidden" />
        Share
      </button>
    </div>
  </div>



  <!-- Pipewriter Bar -->
</div>