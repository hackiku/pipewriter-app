<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import LogosMarquee from "$lib/components/LogosMarquee.svelte";
  import { demoContent } from "$lib/pages/demo/data";
  import Hero from "$lib/pages/demo/Hero.svelte";
  import Dropper from "$lib/pages/demo/Dropper.svelte";
  import Demo from "$lib/pages/demo/Demo.svelte";

  let demo: Demo;
  let isDemoVisible = false;
  let demoSection: HTMLElement;
  
  function handleElementSelect(elementId: string) {
    if (demo) {
      demo.showElement(elementId);
      // Scroll to demo section when element is selected
      demoSection?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isDemoVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (demoSection) {
      observer.observe(demoSection);
    }

    return () => observer.disconnect();
  });
</script>

<BackgroundPattern />

<div class="flex flex-col min-h-screen">
  <main class="container flex-grow px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
    <!-- Hero Section with space for Dropper -->
    <div class="min-h-[calc(100vh-5rem)] flex flex-col justify-center">
      <section class="flex items-center justify-between lg:pr-48 md:pr-32 sm:pr-24 pr-16">
        <Hero 
          eyebrowText={demoContent.hero.eyebrow}
          headlineText={demoContent.hero.headline}
        />
      </section>

      <!-- Logos -->
      <div class="mt-12 mb-24">
        <LogosMarquee />
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-2 text-center">
      <h2 class="text-4xl sm:text-5xl font-semibold mb-12">
        {demoContent.features.headline}
      </h2>
      
      <!-- Loom Video Placeholder -->
      <div class="aspect-video w-full max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
        <p class="text-lg text-gray-500 dark:text-gray-400">Video Player Placeholder</p>
      </div>
    </div>

    <!-- Demo Canvas -->
    <div id="demo-section" bind:this={demoSection}>
      <Demo bind:this={demo} />
    </div>
  </main>
</div>

<!-- Global Dropper -->
<Dropper 
  onElementSelect={handleElementSelect}
  startOpen={true}
  {isDemoVisible}
/>