<!-- $lib/pages/about/PlayPiano.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let isVisible = false;
  let firstImageLoaded = true;
  let secondImageLoaded = true;
  let caplesImageLoaded = true;

  onMount(() => {
    // Add visibility after mount for animation
    setTimeout(() => isVisible = true, 500);
  });

  // Image error handlers
  function handleImageError(event: Event, fallback: string) {
    const img = event.target as HTMLImageElement;
    img.onerror = null; // Prevent infinite loop
    img.src = fallback;
  }
</script>

  <div class="container">
    <!-- First Zigzag -->
    <div class="grid md:grid-cols-2 gap-16 items-center mb-24">
      <div class="space-y-6"
        class:opacity-0={!isVisible}
        class:opacity-100={isVisible}
        style="transition: opacity 0.5s ease-out">
        <h2 class="text-3xl font-bold">
          They all laughed when I sat down at the piano...
        </h2>
        <p class="text-xl text-muted-foreground">
          But they stopped laughing when I started playing. Just like they stopped laughing 
          when we showed how proper tools could transform technical writing.
        </p>
      </div>
      
      {#if isVisible}
        <div class="relative" 
          in:fly={{ x: 200, duration: 1000, easing: quintOut }}>
          <img 
            src="/images/writing-tools-transform.png"
            alt="Writing tools transformation"
            class="rounded-lg shadow-lg w-full h-auto"
            class:opacity-0={!firstImageLoaded}
            class:opacity-100={firstImageLoaded}
            on:error={(e) => handleImageError(e, '/api/placeholder/600/400')}
            style="transition: opacity 0.3s ease-out"
          />
        </div>
      {/if}
    </div>

    <!-- Second Zigzag -->
    <div class="grid md:grid-cols-2 gap-16 items-center mb-24">
      <div class="relative md:order-last"
        class:translate-x-0={isVisible}
        class:translate-x-full={!isVisible}
        style="transition: transform 1s ease-out">
        <img 
          src="/images/writing-tools-transform.png"
          alt="Modern writing workflow"
          class="rounded-lg shadow-lg w-full h-auto"
          class:opacity-0={!secondImageLoaded}
          class:opacity-100={secondImageLoaded}
          on:error={(e) => handleImageError(e, '/api/placeholder/600/400')}
          style="transition: opacity 0.3s ease-out"
        />
      </div>
      
      {#if isVisible}
        <div class="space-y-6"
          in:fly={{ x: -200, duration: 1000, easing: quintOut }}>
          <h2 class="text-3xl font-bold">
            ...but when I started to play
          </h2>
          <p class="text-xl text-muted-foreground">
            They saw how the right tools could transform their workflow from basic docs 
            to professional UX deliverables.
          </p>
        </div>
      {/if}
    </div>

    <!-- Caples Ad Reference -->
    {#if isVisible}
      <div class="relative h-[400px] overflow-hidden rounded-lg mt-32"
        in:fade={{ duration: 1500 }}>
        <img 
          src="/images/caples-ad.webp"
          alt="Famous Caples Piano Ad - They Laughed When I Sat Down At the Piano"
          class="w-full object-cover"
          class:opacity-0={!caplesImageLoaded}
          class:opacity-100={caplesImageLoaded}
          on:error={(e) => handleImageError(e, '/api/placeholder/1200/400')}
          style="transition: opacity 0.3s ease-out"
        />
        <div 
          class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" 
          style="pointer-events: none;"
        />
      </div>
    {/if}
  </div>

<style>
  .translate-x-full {
    transform: translateX(100%);
  }
  .translate-x-0 {
    transform: translateX(0);
  }
  .opacity-0 {
    opacity: 0;
  }
  .opacity-100 {
    opacity: 1;
  }
</style>