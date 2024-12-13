<!-- $lib/pages/about/PlayPiano.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  let isVisible = false;

  onMount(() => {
    // Add visibility after mount for animation
    setTimeout(() => isVisible = true, 500);
  });
</script>

<section class="container py-24 border-t overflow-hidden">
  <div class="grid md:grid-cols-2 gap-16 items-center">
    <div class="space-y-6">
      <h2 class="text-3xl font-bold">
        They all laughed when I sat down at the piano...
      </h2>
      <p class="text-xl text-muted-foreground">
        When we said technical documentation could be beautiful.
      </p>
    </div>

    <div class="space-y-6" class:translate-x-0={isVisible} class:translate-x-full={!isVisible} transition:duration-1000>
      <h2 class="text-3xl font-bold">
        ...but when we showed them
      </h2>
      <p class="text-xl text-muted-foreground">
        They saw how proper tools could transform their workflow.
      </p>
    </div>
  </div>
</section>

<style>
  .translate-x-full {
    transform: translateX(100%);
  }
  .translate-x-0 {
    transform: translateX(0);
  }
  .transition-duration-1000 {
    transition-duration: 1000ms;
  }
</style>