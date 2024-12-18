<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import LogosMarquee from "$lib/components/LogosMarquee.svelte";
  import { demoContent } from "$lib/pages/demo/data";
  import Hero from "$lib/pages/demo/Hero.svelte";
  import DropperWrapper from "$lib/pages/demo/DropperWrapper.svelte";
  import Dropper from "$lib/pages/demo/Dropper.svelte";
  import Demo from "$lib/pages/demo/Demo.svelte";

  let demo: Demo;
  let demoSection: HTMLElement;
  
  function handleElementSelect(elementId: string) {
    if (demo) {
      demo.showElement(elementId);
      demoSection?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
</script>

<BackgroundPattern />

<section class="container min-h-[calc(100vh-5rem)] flex flex-col justify-center">
  <div class="flex items-start justify-between">
    <div class="w-2/5">
      <Hero 
        eyebrowText={demoContent.hero.eyebrow}
        headlineText={demoContent.hero.headline}
      />
    </div>
  </div>

  <div class="mt-12">
    <LogosMarquee />
  </div>
</section>

<DropperWrapper>
  <Dropper onSelect={handleElementSelect} />
</DropperWrapper>

<section class="container py-16 text-center">
  <h2 class="text-4xl sm:text-5xl font-semibold mb-12">
    {demoContent.features.headline}
  </h2>
  
  <div class="aspect-video w-full max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
    <p class="text-lg text-muted-foreground">Video Player Placeholder</p>
  </div>
</section>

<section id="demo-section" class="container" bind:this={demoSection}>
  <Demo bind:this={demo} />
</section>

<style>
  /* :global(.container) { */
  .container {
    --container-width: 80rem;
    width: min(var(--container-width), 100vw - 2rem);
    margin-inline: auto;
  }
</style>