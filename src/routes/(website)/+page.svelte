<!-- src/routes/+page.svelte -->
<script lang="ts">
  import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import LogosMarquee from "$lib/components/LogosMarquee.svelte";
  import { demoContent } from "$lib/pages/demo/data";
  import Hero from "$lib/pages/demo/Hero.svelte";
  import Dropper from "$lib/pages/demo/Dropper.svelte";
  import Demo from "$lib/pages/demo/Demo.svelte";
  import { onMount } from 'svelte';

  let demo: Demo;
  
  function handleElementSelect(elementId: string) {
    if (demo) {
      demo.showElement(elementId);
    }
  }
</script>

<BackgroundPattern />

<div class="flex flex-col min-h-screen">
  <main class="container flex-grow px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
    <!-- Hero with closer logos -->
    <div class="min-h-[calc(100vh-5rem)] flex flex-col justify-center">
      <section class="flex items-center justify-between">
        <Hero 
          eyebrowText={demoContent.hero.eyebrow}
          headlineText={demoContent.hero.headline}
        />
      </section>

      <!-- Logos closer to hero -->
      <div class="mt-12 mb-24">
        <LogosMarquee />
      </div>
    </div>

    <!-- Demo Canvas -->
    <div id="demo-section">
      <Demo bind:this={demo} />
    </div>
  </main>
</div>

<!-- Global Dropper -->
<Dropper {handleElementSelect} startOpen={true} />