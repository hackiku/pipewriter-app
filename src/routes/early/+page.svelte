<!-- src/routes/early/+page.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  // Configurable delay duration
  const REDIRECT_DELAY = 2000; // 2 seconds for testing
  const MIN_LOADING_TIME = 2500; // Min time to show loading UI

  onMount(() => {
    const startTime = Date.now();

    // Backup redirect with configurable delay
    const timeout = setTimeout(() => {
      const url = data.redirectUrl || 'https://pipewriter.gumroad.com/l/wires-for-writers';
      
      // Ensure minimum loading time
      const elapsed = Date.now() - startTime;
      const remainingDelay = Math.max(0, MIN_LOADING_TIME - elapsed);
      
      setTimeout(() => {
        window.location.href = url;
      }, remainingDelay);
      
    }, REDIRECT_DELAY);

    return () => clearTimeout(timeout);
  });
</script>

<div class="fixed inset-0 flex items-center justify-center bg-slate-300 dark:bg-slate-950 bg-opacity-20">
  <div class="text-center space-y-4">
    <!-- Loading dots -->
    <div class="flex items-center gap-3">
      {#each Array(3) as _, i}
        <div
          class="w-2 h-2 rounded-full bg-foreground animate-bounce"
          style="animation-delay: {i * 150}ms;"
        />
      {/each}
    </div>
    
    <p class="text-sm text-muted-foreground">
      Taking you to Gumroad...
    </p>
  </div>
</div>

<style>
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
</style>