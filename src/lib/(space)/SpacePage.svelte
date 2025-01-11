<!-- src/lib/(space)/SpacePage.svelte -->
<script lang="ts">
	import { Rocket, Stars, Plane } from "lucide-svelte";
	import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
	// layout
	import SpaceNav from "./components/SpaceNav.svelte";
	// content
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
	import SpaceForm from "./components/cta/SpaceForm.svelte";
	import PricingCard from "./components/cta/PricingCard.svelte";
</script>

<SpaceNav />

<main class="bg-background text-foreground relative overflow-x-hidden">
	<!-- Fixed Background Pattern -->
	<div class="fixed inset-0 pointer-events-none">
		<BackgroundPattern size="md" opacity="high" gradient={true} />
	</div>

	<!-- Content -->
	<div class="relative">
		<!-- Hero Section -->
		<Hero />

		<!-- Before/After slider -->
		<section class="relative -mt-24 mb-24"> <!-- Pulls it up into hero space -->
			<Repack />
		</section>

		<!-- <section class="py-24 relative">
			<div class="container">
				<Problem />
			</div>
		</section> -->

		<!-- Process Section -->
		<section class="py-24 relative">
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
							Every space startup deserves a proper landing. Chute Repack is a
							7-day redesign sprint that rebuilds your website in
							production-ready code. Clean, semantic, and engineered to convert.
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

		<section class="mb-36">
			<Testimonials />
		</section>


<!-- About Section -->
<section class="relative border-t border-border/50 bg-black/30 dark:bg-white/[0.03]">
  <!-- Tab protruding from section -->
  <div class="absolute left-1/2 -translate-x-1/2 -translate-y-full">
    <div class="flex flex-col items-center gap-4 px-8 pt-4 pb-6 
                rounded-t-2xl border-t border-x border-border/50 
                bg-black/30 dark:bg-white/[0.03]">
      <div class="w-12 h-12 rounded-full bg-muted/30 
                  flex items-center justify-center">
        <span class="text-2xl font-serif italic">?</span>
      </div>
      <p class="text-sm text-muted-foreground">Wait, where's the space?</p>
    </div>
  </div>

  <About />
  <Products />
</section>


		<!-- Pricing Section with Form -->
		<section class="py-24 relative border-t">
			<div class="container">
				<div class="flex text-center justify-center mb-16">
					<div class="w-3/5 space-y-4">
						<div
							class="inline-flex items-center gap-1.5 px-3 py-1
                        rounded-full bg-primary/10 text-primary border border-primary/20"
						>
							<Rocket class="w-4 h-4" />
							<span class="text-sm font-medium">Pricing</span>
						</div>

						<h2 class="text-5xl font-normal">The Spice must flow</h2>
						<p class="text-xl text-muted-foreground">
							Your Landing 'Chute, Repack'd
						</p>
					</div>
				</div>

				<div class="grid lg:grid-cols-2 gap-16 items-start">
					<!-- Left: Form -->
					<div class="space-y-8">
						<div>
						</div>

						<SpaceForm />
					</div>

					<!-- Right: Pricing -->
					<div class="lg:sticky lg:top-8">
						<PricingCard />
					</div>
				</div>
			</div>
		</section>

	</div>
</main>

<style>
	/* Optional: Smooth scroll behavior */
	html {
		scroll-behavior: smooth;
	}
</style>
