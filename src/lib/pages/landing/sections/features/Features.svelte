<!-- src/lib/pages/landing/sections/features/Features.svelte -->
<script lang="ts">
	import DriveFolder from "./DriveFolder.svelte";
	import DrivePreview from "./DrivePreview.svelte";
	import MiniTestimonial from "$lib/components/proof/testimonials/MiniTestimonial.svelte";
	import { Button } from "$lib/components/ui/button";
	import { ShoppingCart } from "lucide-svelte";
	import { onMount } from "svelte";
	import { demoStore } from "../../stores/demoStore";

	let activeFeature: string | null = "elements";
	let previewContainer: HTMLElement;

	function handleDriveSelect(id: string) {
		activeFeature = id;
		// Scroll to the selected preview card
		const card = document.getElementById(`preview-${id}`);
		if (card) {
			card.scrollIntoView({ behavior: "smooth" });
		}
	}

	onMount(() => {
		// Set up intersection observer for preview cards
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const id = entry.target.id.replace("preview-", "");
						activeFeature = id;
					}
				});
			},
			{
				root: null,
				threshold: 0.5, // Trigger when card is 50% visible
				rootMargin: "-20% 0px -30% 0px", // Adjust trigger area
			},
		);

		// Observe all preview cards
		document.querySelectorAll(".preview-card").forEach((card) => {
			observer.observe(card);
		});

		return () => observer.disconnect();
	});

	function handleGumroadCheckout() {
		window.location.href = "https://gum.co/pipewriter";
	}

	$: isRootView = !activeFeature || !activeFeature.includes("/");
</script>

<div class="relative">
	<!-- Desktop Layout -->
	<div class="hidden lg:grid grid-cols-5 gap-8">
		<!-- Left Column: Drive Folder & CTA -->
		<div class="col-span-2">
			<div class="sticky top-28 space-y-6">
				<DriveFolder
					activeId={activeFeature}
					onSelect={handleDriveSelect}
					{isRootView}
				/>
				<Button
					variant="ghost"
					class="w-full group"
					on:click={handleGumroadCheckout}
				>
					<ShoppingCart
						class="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity"
					/>
					<span class="opacity-50 group-hover:opacity-100 transition-opacity"
						>Add to Cart</span
					>
				</Button>

				<!-- Add Mini Testimonial -->
				<div class="px-12 py-6 __border-t">
					<MiniTestimonial />
				</div>
			</div>
		</div>

		<!-- Right Column: Preview Cards -->
		<div class="col-span-3" bind:this={previewContainer}>
			<DrivePreview {activeFeature} />
		</div>
	</div>

	<!-- Mobile Layout -->
	<div class="lg:hidden">
		<!-- Sticky Header with Drive Folder -->
		<div class="sticky top-4 z-[999] bg-background/80 backdrop-blur-sm pb-6">
			<DriveFolder 
				activeId={activeFeature} 
				onSelect={handleDriveSelect} 
				isRootView={isRootView}
			/>
			<div class="space-y-6 mt-6">
				<Button 
					variant="ghost" 
					class="w-full group"
					on:click={handleGumroadCheckout}
				>
					<ShoppingCart class="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
					<span class="opacity-50 group-hover:opacity-100 transition-opacity">Add to Cart</span>
				</Button>
				
				<!-- Add Mini Testimonial -->
				<!-- <div class="pt-6 border-t"> -->
					<!-- <MiniTestimonial /> -->
				<!-- </div> -->
			</div>
		</div>

		<!-- Preview Cards -->
		<div class="mt-6">
			<DrivePreview {activeFeature} />
		</div>
	</div>
</div>
