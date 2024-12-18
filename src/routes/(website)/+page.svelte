<!-- src/routes/+page.svelte -->
<script lang="ts">
  import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import LogosMarquee from "$lib/components/LogosMarquee.svelte";
  import Demo from "$lib/pages/Demo.svelte";
  import Blurbs from "$lib/pages/Blurbs.svelte";
  import ZigZag from "$lib/pages/ZigZag.svelte";
  import { onMount } from 'svelte';

  let blurbsVisible = false;
  let zigZagLeftVisible = false;
  let zigZagRightVisible = false;
  
  let blurbsSection: HTMLElement;
  let zigZagLeftSection: HTMLElement;
  let zigZagRightSection: HTMLElement;

  function showBlurbs() {
    blurbsVisible = true;
    setTimeout(() => {
      blurbsSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  function showZigZagLeft() {
    zigZagLeftVisible = true;
    setTimeout(() => {
      zigZagLeftSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  function showZigZagRight() {
    zigZagRightVisible = true;
    setTimeout(() => {
      zigZagRightSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  onMount(() => {
    (window as any).showBlurbs = showBlurbs;
    (window as any).showZigZagLeft = showZigZagLeft;
    (window as any).showZigZagRight = showZigZagRight;
  });
</script>

<BackgroundPattern />

<div class="flex flex-col min-h-screen">
  <main class="container flex-grow px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
    <Demo />

    <!-- Logos Section -->
    <div class="py-8">
      <LogosMarquee />
    </div>

    <!-- ZigZag Sections -->
    <section bind:this={zigZagLeftSection}>
      <ZigZag 
        visible={zigZagLeftVisible} 
        direction="left"
        heading="Built For Writers"
        subheading="Professional Grade Templates"
        description="Create beautiful wireframes directly in Google Docs. Perfect for copywriters and content designers who want to present their work professionally."
      />
    </section>

    <section bind:this={zigZagRightSection}>
      <ZigZag 
        visible={zigZagRightVisible} 
        direction="right"
        heading="Seamless Integration"
        subheading="Works Where You Work"
        description="No need to learn new tools. Create and edit wireframes right in your Google Doc, making it easy to collaborate with your team."
      />
    </section>

    <!-- Features Grid -->
    <section class="py-16" bind:this={blurbsSection}>
      <Blurbs visible={blurbsVisible} />
    </section>
  </main>
</div>