<!-- src/lib/pages/landing/LandingPage.svelte -->
<script lang="ts">
	// import { dev } from "$app/environment";
	import { MessageCircleQuestion } from "lucide-svelte";
	// sections
	import Hero from "./sections/hero/Hero.svelte";
	import Samples from "./sections/samples/Samples.svelte";
	import Features from "./sections/features/Features.svelte";
	import Proof from "./sections/proof/Proof.svelte";	
	// import PricingCta from "$lib/components/pricing/PricingCta.svelte";
  import WaitlistCta from "$lib/components/pricing/WaitlistCta.svelte";
	import FAQ from "./sections/faq/FAQ.svelte";
	
	// dev & design
	import BackgroundGrid from "$lib/components/BackgroundGrid.svelte";
	import ViewportSize from "$lib/components/dev/ViewportSize.svelte";
	import LogosMarquee from "$lib/components/proof/LogosMarquee.svelte";
  
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

		<div class="pt-12">
		<h3 class="text-center font-medium text-foreground/60 mb-6">
			Battle-tested writing for the bestest
		</h3>
		<LogosMarquee />
	</div>

	<!-- Features Section -->
	<section
		class="relative pt-24 max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 border-b-2"
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
	<section class="py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
		<div class="text-center mb-16 max-w-md mx-auto">
			<h2 class="text-4xl sm:text-5xl font-semibold mb-4">
				Made with 🫶, ⏱️, and Oxford Comma
			</h2>
		</div>

		<Proof />
	</section>
	
	
	
	<section class="py-12 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
		<!-- <PricingCta /> -->
		<WaitlistCta />
	</section>
	


<section class="py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">

	<div class="flex justify-center mb-8">
		<div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#3644FE]/30 to-[#B345ED]/30 
		            flex items-center justify-center shadow-lg">
			<MessageCircleQuestion class="w-8 h-8 text-foreground/60" />
		</div>
	</div>
	
	<h2
		class="text-[5vh] md:text-[6vh] lg:text-[7vh]
              font-bold leading-[1.3] tracking-tight mb-16
              max-w-[20ch] mx-auto text-center
			{HEADLINE}"
	>
		Unquestionably Frequent
	</h2>

	<FAQ />
</section>	<!-- <div class="py-12 bg-blue-200">
		<LogosMarquee />
	</div> -->
</div>
