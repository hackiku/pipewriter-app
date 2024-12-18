<!-- src/lib/pages/demo/Demo.svelte -->
<script lang="ts">
  import { demoContent } from "./data";
  import Blurbs from "./Blurbs.svelte";
  import ZigZag from "./ZigZag.svelte";
  
  let blurbsVisible = false;
  let zigZagLeftVisible = false;
  let zigZagRightVisible = false;
  
  let blurbsSection: HTMLElement;
  let zigZagLeftSection: HTMLElement;
  let zigZagRightSection: HTMLElement;

  export function showElement(elementId: string) {
    switch(elementId) {
      case 'blurbs-3':
        blurbsVisible = true;
        requestAnimationFrame(() => {
          blurbsSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        break;
      case 'zz-left':
        zigZagLeftVisible = true;
        requestAnimationFrame(() => {
          zigZagLeftSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        break;
      case 'zz-right':
        zigZagRightVisible = true;
        requestAnimationFrame(() => {
          zigZagRightSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        break;
    }
  }
</script>

<!-- ZigZag Sections -->
<section 
  bind:this={zigZagLeftSection}
  class="transition-opacity duration-300"
  class:opacity-0={!zigZagLeftVisible}
>
  <ZigZag 
    visible={zigZagLeftVisible} 
    direction="left"
    {...demoContent.zigzags.left}
  />
</section>

<section 
  bind:this={zigZagRightSection}
  class="transition-opacity duration-300"
  class:opacity-0={!zigZagRightVisible}
>
  <ZigZag 
    visible={zigZagRightVisible} 
    direction="right"
    {...demoContent.zigzags.right}
  />
</section>

<!-- Features Grid -->
<section 
  bind:this={blurbsSection}
  class="py-16 transition-opacity duration-300"
  class:opacity-0={!blurbsVisible}
>
  <Blurbs visible={blurbsVisible} />
</section>