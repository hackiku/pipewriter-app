<!-- src/lib/components/demo/docs/DocsHeader.svelte -->
<script lang="ts">
  import { Share2, Star } from 'lucide-svelte';
</script>

<header class="flex items-center gap-2 px-6 py-2 border-b">
  <!-- Logo -->
  <div class="flex items-center gap-2">
    <img 
      src="/icons/google-docs.svg" 
      alt="Google Docs" 
      class="w-5 h-5"
    />
    <div class="text-sm font-medium text-zinc-700">SaaS Marketing Copy</div>
  </div>
  
  <!-- Toolbar -->
  <div class="flex-1 mx-4">
    <div class="inline-flex items-center gap-1 p-1 bg-zinc-100 rounded-full">
      {#each ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Extensions', 'Help'] as item}
        <button class="px-3 py-1 text-sm hover:bg-white hover:shadow-sm rounded-full transition-all">
          {item}
        </button>
      {/each}
    </div>
  </div>

  <!-- Actions -->
  <div class="flex items-center gap-2">
    <Star class="w-5 h-5 text-zinc-400" />
    <Share2 class="w-5 h-5 text-zinc-400" />
  </div>
</header>