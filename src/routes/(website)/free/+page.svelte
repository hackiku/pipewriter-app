<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Demo from "$lib/pages/demo/Demo.svelte";
  import DropperWrapper from "$lib/pages/demo/DropperWrapper.svelte";
  import Dropper from "$lib/pages/demo/Dropper.svelte";

  let demo: Demo;
  let demoSection: HTMLElement;
  let isHeroVisible = true;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );

    const heroSection = document.querySelector('#hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => observer.disconnect();
  });
  
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

<div class="flex flex-col min-h-screen">
  <main class="flex-grow px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
    <section id="demo-section" class="pb-32" bind:this={demoSection}>
      <Demo bind:this={demo} />
    </section>
  </main>
</div>

<DropperWrapper {isHeroVisible}>
  <Dropper onSelect={handleElementSelect} />
</DropperWrapper>