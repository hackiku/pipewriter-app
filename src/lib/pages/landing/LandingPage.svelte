<!-- src/lib/pages/landing/LandingPage.svelte -->
<script lang="ts">
  // import { dev } from "$app/environment";
  // sections
	import Hero from "./sections/hero/Hero.svelte";
  import Demo from "./sections/demo/Demo.svelte";
  // import DocsDemo from "$lib/components/demo/docs/DocsDemo.svelte";
  import Features from "./sections/features/Features.svelte";
  import Proof from "./sections/proof/Proof.svelte";
  // import AppDemo from "$lib/components/demo/app/AppDemo.svelte";
	import PricingGrid from "$lib/components/cta/pricing/PricingGrid.svelte";
  // import Pricing from "./sections/pricing/Pricing.svelte";

	// proof
	import LogosMarquee from "$lib/components/proof/LogosMarquee.svelte"
	// import WriterStep from "./sections/features/proof/WriterStep.svelte";
	import FounderCard from "./sections/proof/FounderCard.svelte";
	
	// dev & design
	import BackgroundGrid from '$lib/components/BackgroundGrid.svelte';
	import ViewportSize from '$lib/components/dev/ViewportSize.svelte';
  // import Frame from '$lib/iframe/Frame.svelte';
	

	export const HEADLINE = "text-[#171717] dark:text-[#CFCFCF]"; 

</script>


<ViewportSize />

<div class="bg-landing dark:bg-[#040D12]
		fixed inset-0 min-w-screen min-h-screen overflow-hidden -z-10">
	
	<!-- <StickerBackground /> -->
	<BackgroundGrid gridSize="48" speed="30s" opacity="0.06" />
</div>


<main class="flex flex-col relative min-h-screen overflow-x-clip text-foreground ">
	<!-- Hero Section -->
	<section class="relative __pt-32 __md:pt-40 h-[90vh] max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <Hero {HEADLINE} /> 
  </section>

  <!-- Demo Section -->
  <section class="relative -mt-[10vh] max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <Demo />
    <!-- <DocsDemo /> -->
		<div class="max-w-sm mx-auto my-6">
			<!-- <WriterStep /> -->
		</div>

	</section>

	<!-- <FounderCard /> -->

  <!-- Features Section -->
  <section class="relative py-24 border-t max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <h2 class="text-[5vh] md:text-[6vh] lg:text-[7vh] 
              font-bold leading-[1.3] tracking-tight mb-16
              max-w-[20ch] mx-auto text-center
							{HEADLINE}">
      Write 10× Copy Decks <br>in Google Docs
    </h2>

    <Features />
  </section>

	<div class="_py-12">
		<h3 class="text-center text-foreground">Battle tested writing for the bestest</h3>
		<LogosMarquee />
		<!-- <LogosMarquee /> -->
	</div>

  <!-- App Demo Section -->
  <!-- <section class="relative pt-24 border-t max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <div class="min-h-[80vh]">
      <AppDemo />
    </div>
  </section> -->

  <!-- Social Proof -->
  <!-- <section class="py-24 bg-red-800/20"> -->
	<section class="py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
		
		<div class="text-center mb-16 max-w-lg mx-auto">
    	<h2 class="text-4xl font-medium mb-4">
      	Made with 🫶, ⏱️, and <br>Oxford comma
    	</h2>
  	</div>

    <Proof />
  
	</section>

  <!-- Pricing -->
  <section class="relative border-t pt-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
		
		<div class="text-center mb-16 smax-w-lg smx-auto border">
    	<h2 class="text-[5vh] md:text-[6vh] lg:text-[7vh] 
      	        font-medium leading-[1.1] tracking-tight
        	      max-w-[16ch] mx-auto text-center">
      	Take Writer Wireframes for a Ride
    	</h2>
    	<!-- <p class="text-xl text-muted-foreground">
      	Start with a $1 trial or go all-in with the complete toolkit.
    	</p> -->
  	</div>

  <div class="mx-auto _container max-w-3xl">
    <PricingGrid />
  </div>

	
	<div class="py-12">
		<LogosMarquee />
	</div>

</main>