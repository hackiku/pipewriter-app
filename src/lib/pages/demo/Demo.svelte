<!-- src/lib/pages/demo/Demo.svelte -->
<script lang="ts">
  import { demoContent } from "./data";
  import Blurbs from "./Blurbs.svelte";
  import ZigZag from "./ZigZag.svelte";
  import LoomVideo from "$lib/components/marketing/LoomVideo.svelte";

  let blurbsVisible = false;
  let zigZagLeftVisible = false;
  let zigZagRightVisible = false;
  
  let blurbsSection: HTMLElement;
  let zigZagLeftSection: HTMLElement;
  let zigZagRightSection: HTMLElement;

  export function showElement(elementId: string) {
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
</script>

<!-- Features Section -->
<section class="bg-background py-16">
  <h2 class="text-4xl text-center sm:text-5xl font-semibold mb-12">
    {demoContent.features.headline}
  </h2>
  
  <LoomVideo />
</section>

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