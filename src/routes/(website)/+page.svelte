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

	import LoomVideo from "$lib/components/marketing/LoomVideo.svelte";

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

<!-- <BackgroundPattern /> -->


<div class="flex flex-col min-h-screen">

	<main class="flex-grow px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
    <!-- Hero Section -->

    <section id="hero-section" class="pt-20 lg:pt-40 min-h-[calc(100vh-5rem)]">
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div class="lg:w-[45%]">
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


    <!-- Demo Section -->
    <section id="demo-section" class="pb-32" bind:this={demoSection}>
      <Demo bind:this={demo} />
    </section>
  
		<!-- <EarlyAccess /> -->
	
	</main>
</div>

<DropperWrapper {isHeroVisible}>
  <Dropper onSelect={handleElementSelect} />
</DropperWrapper>

