<!-- src/lib/pages/demo/Demo.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from "./Hero.svelte";
  import Dropper from "./Dropper.svelte";
  import Blurbs from "./Blurbs.svelte";
  import ZigZag from "../ZigZag.svelte";
  import LogosMarquee from "$lib/components/LogosMarquee.svelte";
  import LoomVideo from "$lib/components/marketing/LoomVideo.svelte";
  import { demoContent } from "./data";

  let blurbsVisible = false;
  let zigZagLeftVisible = false;
  let zigZagRightVisible = false;
  
  let blurbsSection: HTMLElement;
  let zigZagLeftSection: HTMLElement;
  let zigZagRightSection: HTMLElement;

  function handleElementSelect(elementId: string) {
    if (elementId === 'blurbs-3') {
      blurbsVisible = true;
      setTimeout(() => {
        blurbsSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    if (elementId === 'zz-left') {
      zigZagLeftVisible = true;
      setTimeout(() => {
        zigZagLeftSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    if (elementId === 'zz-right') {
      zigZagRightVisible = true;
      setTimeout(() => {
        zigZagRightSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  onMount(() => {
    (window as any).showBlurbs = () => handleElementSelect('blurbs-3');
    (window as any).showZigZagLeft = () => handleElementSelect('zz-left');
    (window as any).showZigZagRight = () => handleElementSelect('zz-right');
  });
</script>

<!-- Hero Section -->
<section class="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-20 lg:pt-40 min-h-[calc(100vh-5rem)]">
  <Hero 
    eyebrowText={demoContent.hero.eyebrow}
    headlineText={demoContent.hero.headline}
  />
  
  <Dropper 
    onElementSelect={handleElementSelect}
    isFixed={true}
  />
</section>

<!-- Logos Section -->
<div class="py-8">
  <LogosMarquee />
</div>

<!-- Features Section -->
<section class="bg-background">
  <h2 class="text-4xl text-center sm:text-5xl font-semibold mb-12">
    {demoContent.features.headline}
  </h2>
</section>

<LoomVideo />

<!-- ZigZag Sections -->
<section bind:this={zigZagLeftSection}>
  <ZigZag 
    visible={zigZagLeftVisible} 
    direction="left"
    {...demoContent.zigzags.left}
  />
</section>

<section bind:this={zigZagRightSection}>
  <ZigZag 
    visible={zigZagRightVisible} 
    direction="right"
    {...demoContent.zigzags.right}
  />
</section>

<!-- Features Grid -->
<section class="py-16" bind:this={blurbsSection}>
  <Blurbs visible={blurbsVisible} />
</section>

<style>
  :global([contenteditable="true"]:hover) {
    outline: 2px solid rgb(var(--primary) / 0.2);
    border-radius: 4px;
  }
  :global([contenteditable="true"]:focus) {
    outline: 2px solid rgb(var(--primary) / 0.4);
    border-radius: 4px;
  }
</style>