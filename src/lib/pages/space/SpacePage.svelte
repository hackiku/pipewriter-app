<!-- SpacePage.svelte -->
<script lang="ts">
	import { Rocket, Stars } from "lucide-svelte";
	import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
	import Hero from "./layout/Hero.svelte";
	import BeforeAfter from "./content/BeforeAfter.svelte";
	import Process from "./content/Process.svelte";
	import Products from "./content/Products.svelte";
	import Testimonials from "./proof/Testimonials.svelte";
	import About from "./content/About.svelte";
	import StackIcons from "./proof/StackIcons.svelte";
	import SpaceForm from "./cta/SpaceForm.svelte";
	import PricingCard from "./cta/PricingCard.svelte";

	import SpaceButton from "./cta/SpaceButton.svelte";

</script>

<main class="bg-background text-foreground relative">
	<!-- Fixed Background Pattern -->
	<div class="fixed inset-0 pointer-events-none">
		<BackgroundPattern size="lg" opacity="high" gradient={true} />
	</div>

	<!-- Content -->
	<div class="relative">
		<!-- Hero Section -->
		<Hero />

		<!-- Before/After Gallery -->
		<section class="relative -mt-6 pb-24">
			<div class="container">
				<BeforeAfter />
			</div>
		</section>

		<!-- Process Section -->
		<section class="py-24 relative">
			<div class="container">
				<!-- Section Header -->
				<div class="flex justify-end mb-16">
					<div class="w-3/5 space-y-4">
						<div
							class="inline-flex items-center gap-1.5 px-3 py-1
                        rounded-full bg-primary/10 text-primary border border-primary/20"
						>
							<Stars class="w-4 h-4" />
							<span class="text-sm font-medium">Our Process</span>
						</div>

						<h2 class="text-5xl font-bold">Space Startup Redesign</h2>
						<p class="text-xl text-muted-foreground">
							Your landing page rebuilt in your live code stack. No templates,
							no compromises.
						</p>
					</div>
				</div>

				<Process />

				<!-- Tech Stack -->
				<div class="mt-12">
					<StackIcons />
				</div>
			</div>
		</section>

		<!-- Proof Section -->
		<section class="py-24 relative border-t border-border/50">
			<div class="container">
				<div class="flex justify-start mb-16">
					<div class="w-3/5 space-y-4">
						<div
							class="inline-flex items-center gap-1.5 px-3 py-1
                        rounded-full bg-primary/10 text-primary border border-primary/20"
						>
							<Rocket class="w-4 h-4" />
							<span class="text-sm font-medium">Why Space?</span>
						</div>

						<h2 class="text-5xl font-normal">UX for the space race</h2>
						<p class="text-xl text-muted-foreground">
							Building tools for the next generation of space exploration.
							Here's what we're working on:
						</p>
					</div>
				</div>

				<Testimonials />
			</div>
		</section>

		<!-- About Section -->
		<section class="py-2 relative border-t border-border/50">
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

						<h2 class="text-5xl font-normal">Get your Chute Repack'd</h2>
						<p class="text-xl text-muted-foreground">
							Simple pricing, custom redesign, much writer.
						</p>
					</div>
				</div>

				<div class="grid lg:grid-cols-2 gap-16 items-start">
					<!-- Left: Form -->
					<div class="space-y-8">
						<div>
							<!-- <h2 class="text-4xl font-bold mb-4">Get a Chute Repack</h2>
							<p class="text-xl text-muted-foreground">
								Tell us about your project and we'll get back to you within 24
								hours.
							</p> -->
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

								<SpaceButton size="lg" />

	</div>
</main>

<style>
	/* Optional: Smooth scroll behavior */
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
