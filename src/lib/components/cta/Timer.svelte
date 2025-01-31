<!-- src/lib/components/cta/Timer.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  export let showText = false;
  
  let days: number = 0;
  let hours: number = 0;
  let minutes: number = 0;
  
  // Set end date to January 31st, 2025
  const endDate = new Date('2025-01-10T00:00:00');
  let interval: NodeJS.Timer;
  
  function updateTimer() {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      return;
    }
    
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  }
  
  onMount(() => {
    updateTimer();
    interval = setInterval(updateTimer, 1000 * 60); // Update every minute
  });
  
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div class="flex items-center gap-2 tabular-nums font-medium">
  <div class="flex items-center gap-1">
    {#if days > 0}
      <span>{days}d</span>
    {/if}
    <span>{hours}h</span>
    <span>{minutes}m</span>
  </div>
  {#if showText}
    <span>until price increase</span>
  {/if}
</div>