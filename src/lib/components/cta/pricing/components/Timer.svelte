<!-- src/lib/components/cta/pricing/components/Timer.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  const targetDate = new Date('2025-02-28T23:59:59');

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  onMount(() => {
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="absolute -top-2 left-1/2 -translate-x-1/2">
	<div class="px-6 py-2 text-sm font-medium w-44 
            bg-gradient-to-r from-purple-50 to-rose-50
            dark:from-purple-950/30 dark:to-rose-950/30
            text-purple-700 dark:text-purple-200
            rounded-full border border-purple-200/50 dark:border-purple-800/50
            flex items-center gap-2">
    <span class="font-bold">40% OFF</span>
    <span class="tabular-nums">{days}d left</span>
  </div>
</div>
