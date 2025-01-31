<!-- src/lib/pages/landing/LandingPage.svelte -->
<script lang="ts">
  import { dev } from "$app/environment";
  import Hero from "./sections/hero/Hero.svelte";
  import Demo from "./sections/demo/Demo.svelte";
  import Features from "./sections/features/Features.svelte";
  import Benefits from "./sections/benefits/Benefits.svelte";
  import Proof from "./sections/proof/Proof.svelte";
  import Pricing from "./sections/pricing/Pricing.svelte";
</script>

<main class="flex flex-col relative min-h-screen overflow-x-clip text-foreground">
  <!-- Hero Section -->
  <section class="relative pt-32 md:pt-40 h-[90vh] max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <Hero /> 
  </section>

  <!-- Demo Section -->
  <section class="relative -mt-[10vh] max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <Demo />
  </section>
  
  <!-- Features Section -->
  <section class="relative py-24 border-t max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    
		    <h2 class="text-[5vh] md:text-[6vh] lg:text-[7vh] 
              font-medium leading-[1.1] tracking-tight mb-16
              max-w-[20ch] mx-auto text-center">
      10x Your Copy Decks in Google Docs
    </h2>

		<Features />
  </section>
	
  <!-- <section class="relative py-24 border-t max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32"> -->
    <!-- <Benefits /> -->
  <!-- </section> -->

	<!-- Social Proof -->
  <section class="__py-24">
    <Proof />
  </section>

  <!-- Pricing -->
  <section class="relative border-t py-20">
    <Pricing />
  </section>
</main>