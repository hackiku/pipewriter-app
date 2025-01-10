<!-- src/lib/components/space/layout/Hero.svelte -->
<script lang="ts">
	import { Send } from "lucide-svelte";
	import SpaceButton from "../cta/SpaceButton.svelte";
	import SpaceDrawer from "../cta/SpaceDrawer.svelte";

	let containerRef: HTMLElement;
	let animationRef: HTMLElement;
</script>

<section
	bind:this={containerRef}
	class="relative min-h-[90vh] flex items-start pt-32 overflow-hidden"
>
	<!-- Editorial Grid Background -->
	<div class="absolute inset-0 pointer-events-none">
		<div
			class="absolute inset-0
             bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)]
             bg-[size:8.33%_8.33%]"
		/>
		<div
			class="absolute inset-0
             bg-gradient-to-b from-transparent via-background/50 to-background"
		/>
	</div>

	<div class="container relative z-10">
		<div class="grid grid-cols-12 gap-8">
			<!-- Left Content -->
			<div class="col-span-12 lg:col-span-6 lg:col-start-2">
				<h1
					class="text-5xl sm:text-5xl md:text-7xl font-regular leading-tight mb-6"
				>
					Space Age Landing Pages
				</h1>

				<p class="text-2xl md:text-3xl text-muted-foreground mb-8 leading-relaxed">
					Website redesigns for space startups. Your code stack, full-throttle UX.
				</p>

				<SpaceDrawer>
					<div slot="trigger">
						<SpaceButton size="lg" />
					</div>
					<div class="p-6">
						<!-- Drawer content handled by SpaceDrawer component -->
					</div>
				</SpaceDrawer>
			</div>

			<!-- Right Animation -->

			<div class="relative col-span-12 lg:col-span-3 lg:col-start-8">
				<div
					class="absolute z-10 inline-flex items-center gap-1.5 px-3 py-1 m-8
                    rounded-full bg-primary/10 text-primary border border-primary/20"
				>
					<Send class="w-4 h-4" />
					<span class="text-xl font-medium">Chute Repack</span>
				</div>

				<div bind:this={animationRef} class="relative aspect-[9/16] w-full">
					<img
						src="pages/space/chute.svg"
						alt="Artistic parachute animation"
						class="w-full h-full object-cover"
					/>

					<!-- Placeholder for actual animation -->
					<div
						class="absolute inset-0 bg-gradient-to-b from-transparent to-background"
					/>
				</div>
			</div>
		</div>
	</div>
</section>
