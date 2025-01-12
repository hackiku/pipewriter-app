<!-- src/lib/(space)/SpacePage.svelte -->
<script lang="ts">
	import { Rocket, Stars, Plane } from "lucide-svelte";
	import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
	// content
	import SpaceNav from "./components/SpaceNav.svelte";
	import Hero from "./content/Hero.svelte";
	import Repack from "./components/chute/Repack.svelte";
	import Problem from "./content/Problem.svelte";
	import Process from "./content/Process.svelte";
	import About from "./content/About.svelte";
	import Products from "./components/products/Products.svelte";
	// proof
	import StackIcons from "./components/proof/StackIcons.svelte";
	import Testimonials from "./components/proof/Testimonials.svelte";
	// cta
	import SpaceButton from "./components/cta/SpaceButton.svelte";
	import CTA from "./components/cta/CTA.svelte";
	import LogosMarquee from "$lib/components/proof/LogosMarquee.svelte";
	// import SpaceForm from "./components/cta/SpaceForm.svelte";
	// import PricingCard from "./components/cta/PricingCard.svelte";
</script>

<SpaceNav />

<!-- <main class="bg-background text-foreground relative overflow-x-hidden"> -->
<main
	class="bg-zinc-300/40 dark:bg-zinc-950 text-foreground relative overflow-x-hidden"
>
	<!-- Fixed Background Pattern -->
	<div class="fixed inset-0 pointer-events-none">
		<BackgroundPattern size="sm" opacity="high" gradient={true} />
	</div>

	<!-- Content -->
	<div class="relative">
		<!-- Hero Section -->
		<Hero />

		<!-- Before/After slider -->
		<section class="relative -mt-20 mb-24">
			<Repack />
		</section>

		<!-- <section class="py-24 relative">
			<div class="container">
				<Problem />
			</div>
		</section> -->

		<!-- Process Section -->
		<section class="py-12 relative">
			<div class="container">
				<!-- Editorial Header: Right-aligned for visual interest -->
				<div class="flex justify-end mb-24">
					<div class="w-3/5">
						<div
							class="inline-flex items-center gap-1.5 px-3 py-1
                           rounded-full bg-primary/10 text-primary border border-primary/20 mb-8"
						>
							<Stars class="w-4 h-4" />
							<span class="text-sm font-medium">The Process</span>
						</div>

						<p class="text-3xl font-regular leading-snug text-balance">
							Your rockets rock, but your website looks like 1969? Time for a refresh.
							<span class="opacity-50">Chute Repack is a</span> 7-day <span class="opacity-50">
							coding sprint to a landing page that gets customers and investors.</span>
							<span></span>
						</p>
					</div>
				</div>

				<Process />

				<div class="flex flex-col items-center mt-24">
					<StackIcons />
					<SpaceButton text="Get Repack'd — $2k" />
				</div>
			</div>
		</section>

		<section class="mb-20 max-h-[80vh] overflow-clip">
			<Testimonials />
		</section>

		<section class="relative bg-zinc-950/[0.05] dark:bg-white/[0.03]">
			<!-- Top border with centered triangle -->
			<div class="absolute inset-x-0 top-0 flex justify-center">
				<!-- Left border -->
				<div class="flex-1 border-t border-border/50" />

				<!-- Center triangle container -->
				<div class="w-32 -translate-y-6">
					<!-- Triangle shape -->
					<div
						class="relative h-16 -translate-y-10 bg-zinc-950/[0.05] dark:bg-white/[0.03] border-t border-x border-border/50 rounded-t-full overflow-hidden"
					>
						<!-- Question mark circle -->
					</div>
					<div
						class="absolute top-6 z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center"
					>
						<span class="text-lg font-serif italic">?</span>
					</div>
					<!-- Text below triangle -->
					<p class="text-sm text-muted-foreground text-center mt-2">
						Wait, where's the space?
					</p>
				</div>

				<!-- Right border -->
				<div class="flex-1 border-t border-border/50" />
			</div>

			<!-- Section content container -->
			<div class="pt-24">
				<About />
				<Products />
			</div>
		</section>

		<!-- Pricing Section with Form -->
		<section class="py-24 relative border-t">
			<div class="container">
				<div class="flex text-center justify-center mb-16">
					<div class="md:w-3/5 space-y-4">
						<div
							class="inline-flex items-center gap-1.5 px-3 py-1
                        rounded-full bg-primary/10 text-primary border border-primary/20"
						>
							<Rocket class="w-4 h-4" />
							<span class="text-sm font-medium">Pricing</span>
						</div>

						<h2 class="text-5xl font-normal">Let the Spice Flow</h2>
						<p class="text-xl text-muted-foreground">
							Your Landing 'Chute, Repack'd
						</p>
					</div>
				</div>

				<CTA />
			</div>
			<LogosMarquee />
		</section>
	</div>
</main>

<style>
	/* Optional: Smooth scroll behavior */
	html {
		scroll-behavior: smooth;
	}
</style>
