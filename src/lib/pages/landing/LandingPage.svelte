<!-- src/lib/pages/landing/LandingPage.svelte -->
<script lang="ts">
	// import { dev } from "$app/environment";
	import { FileText } from "lucide-svelte";

	// sections
	import Hero from "./sections/hero/Hero.svelte";
	import Demo from "./sections/demo/Demo.svelte";

	import Samples from "./sections/samples/Samples.svelte";
	// import DocsDemo from "$lib/components/demo/docs/DocsDemo.svelte";
	import Features from "./sections/features/Features.svelte";
	import LogosMarquee from "$lib/components/proof/LogosMarquee.svelte";
	import Proof from "./sections/proof/Proof.svelte";
	// import AppDemo from "$lib/components/demo/app/AppDemo.svelte";

	// import Compare from "$lib/components/cta/pricing/comparison/Compare.svelte";
	import Pricing from "./sections/pricing/Pricing.svelte";
	import FAQ from "./sections/faq/FAQ.svelte";

	// dev & design
	import BackgroundGrid from "$lib/components/BackgroundGrid.svelte";
	import ViewportSize from "$lib/components/dev/ViewportSize.svelte";
	// import Frame from '$lib/iframe/Frame.svelte';

	export const HEADLINE = "text-[#171717] dark:text-[#CFCFCF]";
</script>

<ViewportSize />

<div
	class="bg-landing dark:bg-[#040D12]
		fixed inset-0 min-w-screen min-h-screen overflow-hidden -z-10"
>
	<BackgroundGrid gridSize="44" speed="10s" opacity="0.3" />
</div>

<div
	class="flex flex-col relative min-h-screen overflow-x-clip text-foreground"
>
	<!-- Hero Section -->
	<section
		class="relative __pt-32 __md:pt-40 h-[85vh] max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32"
	>
		<Hero {HEADLINE} />
	</section>


	<!-- Features Section -->
	<section
		class="relative __pt-12 max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32"
	>

		<Samples />

		<!-- <div class="flex space-between w-full gap-12">
			<div class="aspect-video w-2/3 bg-neutral-900/30">
			</div>
		</div> -->
		
	</section>
	
	<!-- <div class="mt-12 space-y-10">

		<h3 class="text-xl text-center font-medium text-foreground/60">
			Battle-tested writing for the bestest
		</h3>
		<LogosMarquee />
	</div> -->

		<div class="py-12">
		<h3 class="text-center font-medium text-foreground/60">
			Battle-tested writing for the bestest
		</h3>
		<LogosMarquee />
	</div>

	<!-- Features Section -->
	<section
		class="relative py-12 max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32"
	>
		<h2
			class="text-[5vh] md:text-[6vh] lg:text-[7vh]
              font-bold leading-[1.3] tracking-tight mb-16
              max-w-[20ch] mx-auto text-center
							{HEADLINE}"
		>
			Write 10× Copy Decks <br/> <span class="text-2xl italic font-medium">(with the power of UX ✨)</span> 
		</h2>


		<Features />
	</section>


	

	<!-- Social Proof -->
	<section class="py-12 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
		<div class="text-center mb-16 max-w-lg mx-auto">
			<h2 class="text-4xl font-semibold mb-4">
				Made with 🫶, ⏱️, and <br />Oxford comma
			</h2>
		</div>

		<Proof />
	</section>

	
	<section class="pb-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
		<FAQ />
	</section>

	<!-- <div class="py-12 bg-blue-200">
		<LogosMarquee />
	</div> -->
</div>
