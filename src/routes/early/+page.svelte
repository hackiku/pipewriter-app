<!-- src/routes/early/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    // Immediate redirect to waitlist
    goto('/waitlist', { replaceState: true });
  });
</script>

<!-- Simple loading state while redirecting -->
<div class="fixed inset-0 flex items-center justify-center bg-background">
  <div class="text-center space-y-4">
    <div class="text-lg text-muted-foreground">Redirecting...</div>
    <div class="flex items-center justify-center gap-2">
      {#each Array(3) as _, i}
        <div
          class="w-2 h-2 rounded-full bg-primary animate-bounce"
          style="animation-delay: {i * 150}ms;"
        />
      {/each}
    </div>
  </div>
</div>

<style>
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  
  .animate-bounce {
    animation: bounce 1s infinite;
  }
</style>