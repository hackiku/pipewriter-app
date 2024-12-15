<!-- src/lib/pages/ai/GumroadSection.svelte -->
<script lang="ts">
	import { onMount } from "svelte";
	import PricingBar from "./PricingBar.svelte";
	import Timer from "./Timer.svelte";

	let isSticky = false;
	let pricingBarElement: HTMLElement;

	function handleGradientClick() {
		window.scrollBy({
			top: window.innerHeight,
			behavior: "smooth",
		});
	}

	onMount(() => {
		const handleScroll = () => {
			if (!pricingBarElement) return;
			const rect = pricingBarElement.getBoundingClientRect();
			isSticky = rect.top <= 0;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});
</script>

<div class="relative">
	<!-- Pricing Bar -->
	<div bind:this={pricingBarElement}>
		<PricingBar {isSticky} />
	</div>

	<!-- Gumroad Embed -->
	<div class="container">
		<div class="max-w-4xl mx-auto text-center mb-12 pt-8">
			<div
				class="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 rounded-full text-primary mb-6"
			>
				<Timer />
				<span class="text-sm font-medium">until price increase</span>
			</div>
			<h2 class="text-4xl sm:text-5xl font-bold mb-4">
				10× Your Copy Decks Forever
			</h2>
			<p class="text-xl text-muted-foreground">
				One-time access to everything: docs, scripts, app <br>for an indie founder price.
			</p>
		</div>
		<div class="max-w-4xl mx-auto">
			<div class="relative overflow-hidden bg-background">
				<!-- Gumroad content -->
				<div class="h-screen overflow-hidden relative">
					<div class="h-full overflow-y-auto">
						<div>
							<script src="https://gumroad.com/js/gumroad-embed.js"></script>
							<div class="gumroad-product-embed">
								<a href="https://pipewriter.gumroad.com/l/wires-for-writers"
									>Loading...</a
								>
							</div>
						</div>
					</div>

					<!-- Simple Gradient Overlay -->
					<div
						class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent cursor-grab"
						  on:click={handleGradientClick}
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Hide scrollbar but keep functionality */
	.overflow-y-auto {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.overflow-y-auto::-webkit-scrollbar {
		display: none;
	}
</style>
