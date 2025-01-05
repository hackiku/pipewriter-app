<!-- lib/pages/producthunt/components/LaunchTimer.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  export let launchDate: Date;
  
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let interval: NodeJS.Timer;
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate.getTime() - now;
    
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }
  
  onMount(() => {
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
  });
  
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div class="flex flex-col items-center justify-center space-y-8">
  <h2 class="text-2xl font-semibold">Launching In</h2>
  
  <div class="grid grid-cols-4 gap-4 sm:gap-6 text-center">
    <div class="flex flex-col items-center">
      <div class="text-4xl sm:text-5xl font-bold mb-2">{days}</div>
      <div class="text-sm text-muted-foreground">Days</div>
    </div>
    
    <div class="flex flex-col items-center">
      <div class="text-4xl sm:text-5xl font-bold mb-2">{hours}</div>
      <div class="text-sm text-muted-foreground">Hours</div>
    </div>
    
    <div class="flex flex-col items-center">
      <div class="text-4xl sm:text-5xl font-bold mb-2">{minutes}</div>
      <div class="text-sm text-muted-foreground">Minutes</div>
    </div>
    
    <div class="flex flex-col items-center">
      <div class="text-4xl sm:text-5xl font-bold mb-2">{seconds}</div>
      <div class="text-sm text-muted-foreground">Seconds</div>
    </div>
  </div>
</div>