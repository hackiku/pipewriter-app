<!-- src/lib/pages/space/SpacePage.svelte -->
<script lang="ts">
	import { Rocket, Code, Stars, Plane, ChevronRight } from "lucide-svelte";
	import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
	import Hero from "./Hero.svelte";
	import BeforeAfter from "./BeforeAfter.svelte";
	import Process from "./Process.svelte";
	import Products from "./Products.svelte";
	import SpaceButton from "./SpaceButton.svelte";
	import SpaceDrawer from "./SpaceDrawer.svelte";
</script>



<main class="bg-backsground text-foreground">
	<!-- Hero Section -->
	<Hero />

	<!-- <div class="fixed top-0"> -->
	<!-- <div> -->
		<BackgroundPattern
			size="lg"
			opacity="high"
			gradient=true
		/>
	<!-- </div> -->


	<!-- Before/After Gallery - Moved up, visible on first viewport -->
	<section class="relative -mt-6 pb-24 bg-background">
		<div class="container">
			<BeforeAfter />
		</div>
	</section>

	<!-- Process Section -->
	<!-- <BackgroundPattern
		size="lg"
		opacity="high"
		gradient=true
	/> -->

	<section class="py-24 bg-background">
		<div class="w-3/5 mx-44">
			<h2 class="text-3xl font-semibold mb-6">Space startup redesign</h2>
			<p class="text-xl text-muted-foreground mb-8 leading-relaxed">
				Your landing page rebuilt in your live code stack.
			</p>
		</div>

		<!-- write up this component like the ToolsList but less spacey, more compact icons somehow, rewrite it from scratch -->
		<!-- <StackGrid />  -->

		<Process />
	</section>
	<!-- Products Section -->
	<section class="py-24 bg-background">

		<div class="w-3/5 mx-44">
			<h2 class="text-3xl font-semibold mb-6">Why space startups?</h2>
			<p class="text-xl text-muted-foreground mb-8 leading-relaxed">
				
			</p>
		</div>
		
		<!-- write this component somewhat like the Founder attached, but less cheesy, -->
		<!-- better design and more in line with space theme and rest of page.  -->
		<!-- <About /> -->
 
		<Products />
	</section>

	<!-- TODO: Abstract to ./Pricing.svelte -->
	<!-- Pricing Section -->
	<section class="py-24 bg-background border-t">
		<div class="container">
			<div class="grid grid-cols-12 gap-8 items-center">
				<div class="col-span-12 md:col-span-5 md:col-start-2">
					<div class="p-8 rounded-xl border bg-card">
						<div class="flex items-end gap-2 mb-6">
							<span class="text-4xl font-bold">$2,000</span>
							<span class="text-muted-foreground">/page</span>
						</div>

						<ul class="space-y-4 mb-8">
							<li class="flex items-start gap-2">
								<Rocket class="w-5 h-5 text-primary mt-1" />
								<span>Full redesign in pure, semantic code</span>
							</li>
							<li class="flex items-start gap-2">
								<Rocket class="w-5 h-5 text-primary mt-1" />
								<span>Export to React, Vue, or Svelte</span>
							</li>
							<li class="flex items-start gap-2">
								<Rocket class="w-5 h-5 text-primary mt-1" />
								<span>72-hour turnaround time</span>
							</li>
						</ul>

						<SpaceDrawer>
							<div slot="trigger">
								<SpaceButton
									text="Schedule Your Redesign"
									source="pricing"
									fullWidth={true}
								/>
							</div> 
						</SpaceDrawer>
					</div>
				</div>

				<div class="col-span-12 md:col-span-4 md:col-start-8">
					<h3 class="text-2xl font-semibold mb-4">Ready for Launch</h3>
					<p class="text-lg text-muted-foreground">
						Get your landing page redesigned and coded in just 72 hours. Simple,
						transparent pricing with no hidden fees.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Final CTA -->
	<section class="py-24 bg-background">
		<div class="container">
			<div class="max-w-3xl mx-auto text-center">
				<h2 class="text-4xl font-semibold mb-6">Ready for Takeoff?</h2>
				<p class="text-xl text-muted-foreground mb-8">
					Book a quick call to discuss your redesign needs.
				</p>

				<SpaceDrawer>
					<div slot="trigger">
						<SpaceButton size="lg" text="Schedule a Call" source="final_cta" />
					</div>
				</SpaceDrawer>

				<p class="mt-6 text-sm text-muted-foreground">
					Or email directly at <a
						href="mailto:ivan@pipewriter.io"
						class="text-primary hover:underline">ivan@pipewriter.io</a
					>
				</p>
			</div>
		</div>
	</section>
</main>
