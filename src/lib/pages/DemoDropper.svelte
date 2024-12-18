<!-- src/lib/pages/DemoDropper.svelte -->
<script lang="ts">
  import DemoElementCard from "./DemoElementCard.svelte";

  interface Element {
    id: string;
    src: string;
    alt: string;
    description: string;
  }

  // Selected elements for the demo
  const demoElements: Element[] = [
    {
      id: 'hero',
      src: 'elements/hero-dark.svg',
      alt: 'Hero Section',
      description: 'Hero section with headline and CTA'
    },
    {
      id: 'zz-left',
      src: 'elements/zz-left-dark.svg',
      alt: 'Zigzag Left',
      description: 'Content section with left-aligned text'
    },
    {
      id: 'zz-right',
      src: 'elements/zz-right-dark.svg',
      alt: 'Zigzag Right',
      description: 'Content section with right-aligned text'
    },
    {
      id: 'blurbs-3',
      src: 'elements/blurbs-3-dark.svg',
      alt: '3 Blurbs',
      description: 'Three column content blocks'
    },
    {
      id: 'blurbs-4',
      src: 'elements/blurbs-4-dark.svg',
      alt: '4 Blurbs',
      description: 'Four column content blocks'
    },
    {
      id: 'button-left',
      src: 'elements/button-left-dark.svg',
      alt: 'Left Button',
      description: 'Left-aligned CTA button'
    }
  ];

  // Grid configuration
  const gridClass = {
    grid: "grid-cols-2 sm:grid-cols-3",
    gap: "gap-2",
    padding: "pr-4"
  };
</script>

<div class="relative w-full h-full">
  <!-- Bottom Fade Gradient -->
  <div 
    class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-10"
  />
  
  <!-- Grid Container -->
  <div class="space-y-2 pb-10">
    <div class="grid {gridClass.grid} {gridClass.gap} {gridClass.padding}">
      {#each demoElements as element (element.id)}
        <DemoElementCard {element} />
      {/each}
    </div>
  </div>
</div>

<style>
  /* Add any additional styles here */
</style>