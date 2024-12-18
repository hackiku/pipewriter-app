<!-- src/routes/+page.svelte -->
<script lang="ts">
  import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import LogosMarquee from "$lib/components/LogosMarquee.svelte";
  import LoomVideo from "$lib/components/marketing/LoomVideo.svelte";
  import Demo from "$lib/pages/Demo.svelte";
  import Blurbs from "$lib/pages/Blurbs.svelte";
  import { onMount } from 'svelte';

  let blurbsVisible = false;
  let blurbsSection: HTMLElement;

  function showBlurbs() {
    blurbsVisible = true;
    setTimeout(() => {
      blurbsSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  onMount(() => {
    (window as any).showBlurbs = showBlurbs;
  });
</script>

<BackgroundPattern />

<div class="flex flex-col min-h-screen">
  <main class="container flex-grow px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
    <!-- Demo Section -->
    <Demo />

    <!-- Logos Section -->
    <div class="py-8">
      <LogosMarquee />
    </div>

    <!-- Features Section -->
    <section class="bg-background">
      <h2 class="text-4xl text-center sm:text-5xl font-semibold mb-12">
        10× Your Copy Decks
      </h2>
    </section>

    <LoomVideo />

    <!-- Features Grid -->
    <section class="py-16" bind:this={blurbsSection}>
      <Blurbs visible={blurbsVisible} />
    </section>
  </main>
</div>

