<!-- src/routes/early/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const REDIRECT_DELAY = 1000;

  onMount(() => {
    const timeout = setTimeout(() => {
      window.location.href = data.redirectUrl;
    }, REDIRECT_DELAY);

    return () => clearTimeout(timeout);
  });
</script>

<div class="fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm">
  <div class="text-center space-y-6">
    <div class="relative">
      <div class="absolute inset-0 bg-gradient-to-r from-[#3644FE] to-[#B345ED] blur-xl opacity-20" />
      <h1 class="relative text-3xl font-semibold text-foreground">
        Taking you to Gumroad...
      </h1>
    </div>

    <!-- Loading dots -->
    <div class="flex items-center justify-center gap-3">
      {#each Array(3) as _, i}
        <div
          class="w-2 h-2 rounded-full bg-gradient-to-r from-[#3644FE] to-[#B345ED] animate-bounce"
          style="animation-delay: {i * 150}ms;"
        />
      {/each}
    </div>
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