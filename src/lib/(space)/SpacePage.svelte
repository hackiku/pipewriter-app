<!-- src/lib/(space)/SpacePage.svelte -->
<script lang="ts">
	import { Rocket, Stars } from "lucide-svelte";
	import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
	import SpaceNav from "./components/SpaceNav.svelte";

	import Hero from "./content/Hero.svelte";
	// import ChuteCanvas from "./components/chute/ChuteCanvas.svelte";
	import ChuteScene from "./components/chute/ChuteScene.svelte";
	import PlanetGrid from "./components/chute/PlanetGrid.svelte";
	import BeforeAfter from "./components/chute/BeforeAfter.svelte";

	import Repack from "./components/chute/Repack.svelte";
	import Process from "./content/Process.svelte";
	import About from "./content/About.svelte";
	import Products from "./components/products/Products.svelte";
	import StackIcons from "./components/proof/StackIcons.svelte";
	import Testimonials from "./components/proof/Testimonials.svelte";
	import SpaceButton from "./components/cta/SpaceButton.svelte";
	import CTA from "./components/cta/CTA.svelte";
	import LogosMarquee from "$lib/components/proof/LogosMarquee.svelte";
</script>

<SpaceNav />

<main
	class="bg-zinc-300/40 dark:bg-zinc-950 text-foreground relative overflow-x-hidden min-h-screen"
>
	<div class="fixed inset-0 pointer-events-none">
		<BackgroundPattern size="sm" opacity="high" gradient={true} />
	</div>

	<PlanetGrid />

	<!-- Hero Section -->
<!-- Hero Section in SpacePage.svelte -->
<section class="relative min-h-[85vh] pt-20 md:pt-24">
  <div class="container">
    <!-- Two Column Layout -->
    <div class="grid lg:grid-cols-2 gap-8 items-start">
      <!-- Hero Content -->
      <div class="relative z-10 pt-8">
        <Hero />
      </div>

      <!-- Chute Scene -->
      <div class="relative h-[40vh] lg:h-[50vh] mt-8 lg:mt-16">
        <ChuteScene />
      </div>
    </div>
  </div>
</section>

<!-- Before/After Preview (closer to hero) -->
<section class="relative -mt-16 lg:-mt-24">
  <div class="container max-w-6xl mx-auto px-4">
    <BeforeAfter
      company="Firefly Aerospace"
      description="Full-throttle redesign with mission-ready UX"
    >
      <div slot="before">
        <img 
          src="/space/examples/firefly-before.jpg"
          alt="Original Firefly Aerospace website"
          class="w-full h-full object-cover"
        />
      </div>
      
      <div slot="after">
        <img
          src="/space/examples/firefly-after.jpg"
          alt="Redesigned Firefly Aerospace website"
          class="w-full h-full object-cover"
        />
      </div>
    </BeforeAfter>
  </div>
</section>

	<!-- Before/After Section -->
	<section class="relative py-12">
		<div class="container max-w-6xl mx-auto px-4">
			<BeforeAfter
				company="Firefly Aerospace"
				description="Full-throttle redesign with mission-ready UX"
			>
				<div slot="before">
					<img
						src="/space/examples/firefly-before.jpg"
						alt="Original Firefly Aerospace website"
						class="w-full h-full object-cover"
					/>
				</div>

				<div slot="after">
					<img
						src="/space/examples/firefly-after.jpg"
						alt="Redesigned Firefly Aerospace website"
						class="w-full h-full object-cover"
					/>
				</div>
			</BeforeAfter>
		</div>
	</section>

	<!-- Testimonials -->
	<section class="mb-20 max-h-[80vh] overflow-clip">
		<Testimonials />
	</section>

	<!-- About & Products Section -->
	<section class="relative bg-zinc-950/[0.05] dark:bg-white/[0.03]">
		<!-- Section Divider -->
		<div class="absolute inset-x-0 top-0 flex justify-center">
			<div class="flex-1 border-t border-border/50" />
			<div class="w-32 -translate-y-6">
				<div
					class="relative h-16 -translate-y-10
                      bg-zinc-950/[0.05] dark:bg-white/[0.03]
                      border-t border-x border-border/50
                      rounded-t-full overflow-hidden"
				></div>
				<div
					class="absolute top-6 z-10 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-12 h-12 rounded-full bg-muted/30
                      flex items-center justify-center"
				>
					<span class="text-lg font-serif italic">?</span>
				</div>
				<p class="text-sm text-muted-foreground text-center mt-2">
					Wait, where's the space?
				</p>
			</div>
			<div class="flex-1 border-t border-border/50" />
		</div>

		<div class="pt-24">
			<About />
			<Products />
		</div>
	</section>

	<!-- CTA Section -->
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
	<!-- </div> -->
</main>

<style>
	/* Optional: Smooth scroll behavior */
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
