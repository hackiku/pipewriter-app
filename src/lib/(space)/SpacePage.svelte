<!-- src/lib/(space)/SpacePage.svelte -->
<script lang="ts">
	import { Rocket, Stars } from "lucide-svelte";
	// import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
	import SpaceNav from "./components/nav/SpaceNav.svelte";

	// chute
	import Scene from "./components/chute/Scene.svelte";
	import Controls from "./components/chute/Controls.svelte";
	import BeforeAfter from "./components/repack/BeforeAfter.svelte";

	// ./content/
	import Hero from "./content/hero/Hero.svelte";
  import Repack from './content/repack/Repack.svelte';

	import Features from "./content/features/Features.svelte";
	import About from "./content/about/About.svelte";
	import Products from "./content/products/Products.svelte";
	import Testimonials from "./components/proof/Testimonials.svelte";
	// import SpaceButton from "./components/cta/SpaceButton.svelte";
	import CTA from "./components/cta/CTA.svelte";
	import LogosMarquee from "$lib/components/proof/LogosMarquee.svelte";

	let startAnimation: () => void;
</script>

<SpaceNav />

<!-- <div class="fixed inset-0 pointer-events-none">
	<BackgroundPattern size="sm" opacity="high" gradient={true} />
</div> -->

<main
	class="flex flex-col relative min-h-screen overflow-x-clip
             bg-zinc-300/40 dark:bg-zinc-950 text-foreground"
>
	<!-- Controls & Scene -->
	<!-- <Controls {startAnimation} /> -->
	<!-- <Scene bind:startAnimation /> -->

	<!-- Hero Section -->
	<section class="relative h-[90vh]">
		<!-- Top Hero Content -->
		<div class="h-[65vh] grid lg:grid-cols-2 items-start">
			<div
				class="relative z-10 h-full pt-36
				pl-4 sm:pl-6 md:pl-16 lg:pl-24 xl:pl-44"
			>
				<Hero />
			</div>
		</div>
	</section>


	<section class="relative -mt-[10vh]">
		<Repack />
	</section>


	<section class="">
		<Features />
	</section>

	<section class="py-32">
		<Testimonials />
	</section>

	
	<!-- About & Products -->
	<section class="relative bg-zinc-950/[0.05] dark:bg-white/[0.03]">
		<div class="absolute inset-x-0 top-0 flex justify-center">
			<div class="flex-1 border-t border-border/50" />
			<div class="w-32 -translate-y-6">
				<div
					class="relative h-16 -translate-y-10
                        bg-zinc-950/[0.05] dark:bg-white/[0.03]
                        border-t border-x border-border/50
                        rounded-t-full"
				/>
				<div
					class="absolute top-6 z-10 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-12 h-12 rounded-full bg-muted/30
                        flex items-center justify-center"
				>
					<span class="text-lg font-serif italic">?</span>
				</div>
				<p class="text-xl font-medium text-muted-foreground text-center mt-2">
					What's with the space?
				</p>
			</div>
			<div class="flex-1 border-t border-border/50" />
		</div>

		<div class="__pt-32 pb-24">
			<About />
			<Products />
		</div>
	</section>

	<!-- CTA Section -->
	<section class="relative border-t py-20 space-y-10">
		<div class="container">
			<div class="flex text-center justify-center mb-16">
				<div class="md:w-4/5 space-y-4">
					<!-- <div
						class="inline-flex items-center gap-1.5 px-3 py-1
                          rounded-full bg-primary/10 text-primary
                          border border-primary/20"
					>
						<Rocket class="w-4 h-4" />
						<span class="text-sm font-medium">Pricing</span>
					</div> -->
					<h2 class="text-5xl font-normal">Let the Spice Flow</h2>
					<p class="text-2xl text-muted-foreground">
						Book a free discovery call.
					</p>
				</div>
			</div>
		
			<div class="pxx-20">
				<CTA />
			</div>
		
		</div>
		<LogosMarquee />
	</section>
	<!-- </div> -->
	<!-- </div> -->
</main>
