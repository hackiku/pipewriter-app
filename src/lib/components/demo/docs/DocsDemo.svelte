<!-- src/lib/components/demo/docs/DocsDemo.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { FileText } from 'lucide-svelte';
  import FrameDemo from './frame/FrameDemo.svelte';
  import DocsHeader from './DocsHeader.svelte';
  import DocsBody from './DocsBody.svelte';

  let isFrameOpen = true;
</script>

<div class="flex flex-col h-full bg-white dark:bg-zinc-900 transition-colors">
  <DocsHeader />

  <!-- Main Content Area -->
  <div class="flex flex-1 relative">
    <!-- Document Area -->
    <div class="flex-1">
      <DocsBody />
    </div>

    <!-- Frame Integration -->
    {#if isFrameOpen}
      <div class="w-[clamp(280px,25vw,400px)] border-l border-zinc-200 dark:border-zinc-800 
                  bg-white dark:bg-zinc-900 shadow-xl">
        <FrameDemo />
      </div>
    {/if}
  </div>
</div>