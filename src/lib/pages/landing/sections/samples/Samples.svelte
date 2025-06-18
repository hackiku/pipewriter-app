<!-- src/lib/pages/landing/sections/samples/Samples.svelte -->
<script lang="ts">
	import { onMount } from "svelte";
	import SampleMarquee from "./SampleMarquee.svelte";
	import LogosMarquee from "$lib/components/proof/LogosMarquee.svelte";

	let sliderPosition = 50; // Percentage from left
	let containerRef: HTMLDivElement;
	let isDragging = false;
	let currentSample = 0;

	const samples = [
		{
			id: "saas",
			name: "Web copy",
			company: "Redocly",
			description: "From wireframe copy to conversion-focused landing page",
			logo: "/logos/redocly.svg",
		},
		{
			id: "ecommerce",
			name: "Learnforce",
			company: "ShopFlow",
			description: "Product pages that drive purchases",
			// logo: "/logos/learnforce.svg",
		},
		{
			id: "agency",
			name: "UX Agency Website",
			company: "Orizon",
			description: "Enterprise messaging that converts decision makers",
			logo: "/logos/orizon.svg",
		},
		{
			id: "blockchain",
			name: "Blockchain Agency",
			company: "Omicron",
			description: "Enterprise messaging that converts decision makers",
			// awwwards honorable mention badge svg
		},
	];

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		updateSliderPosition(event);
	}

	function handleMouseMove(event: MouseEvent) {
		if (!isDragging) return;
		updateSliderPosition(event);
	}

	function handleMouseUp() {
		isDragging = false;
	}

	function updateSliderPosition(event: MouseEvent) {
		if (!containerRef) return;

		const rect = containerRef.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
		sliderPosition = percentage;
	}

	function handleSampleChange(index: number) {
		currentSample = index;
	}

	onMount(() => {
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	});

	$: currentSampleData = samples[currentSample];
</script>

<div class="space-y-16">
	<!-- Sample Info -->
	
	<!-- Before/After Slider -->
	<button
		bind:this={containerRef}
		class="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-border
           bg-gradient-to-br from-muted/20 to-muted/40 cursor-ew-resize select-none"
		on:mousedown={handleMouseDown}
	>
		<!-- Before (Google Docs) -->
		<div class="absolute inset-0 bg-white dark:bg-zinc-900">
			<!-- Mock Google Docs interface -->
			<div class="h-full flex flex-col">
				<!-- Docs header -->
				<div
					class="h-16 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700
                    flex items-center px-6 gap-4"
				>
					<div
						class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center"
					>
						<span class="text-white text-sm font-bold">D</span>
					</div>
					<div class="flex-1">
						<div class="text-sm font-medium text-zinc-700 dark:text-zinc-300">
							{currentSampleData.name} Copy.gdoc
						</div>
					</div>
				</div>

				<!-- Docs content -->
				<div class="flex-1 p-8 bg-white dark:bg-zinc-900">
					<div class="max-w-2xl mx-auto space-y-4">
						<div class="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
						<div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
						<div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-5/6"></div>
						<div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-4/5"></div>

						<div
							class="mt-8 p-4 border-2 border-dashed border-primary/30 rounded-lg"
						>
							<div class="text-xs text-primary font-medium mb-2">
								PIPEWRITER ELEMENT
							</div>
							<div class="h-6 bg-primary/10 rounded w-2/3"></div>
						</div>

						<div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
						<div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-3/4"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- After (Website) -->
		<div
			class="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/15"
			style="clip-path: polygon({sliderPosition}% 0%, 100% 0%, 100% 100%, {sliderPosition}% 100%)"
		>
			<!-- Mock Website -->
			<div class="h-full flex flex-col">
				<!-- Website header -->
				<div
					class="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700
                    flex items-center px-6 justify-between"
				>
					<div class="text-lg font-bold text-primary">
						{currentSampleData.company}
					</div>
					<div class="flex gap-4 text-sm">
						<span>Home</span>
						<span>Features</span>
						<span>Pricing</span>
					</div>
				</div>

				<!-- Website content -->
				<div class="flex-1 p-8">
					<div class="text-center space-y-6">
						<div
							class="h-12 bg-gradient-to-r from-primary to-primary/80 rounded w-3/4 mx-auto"
						></div>
						<div
							class="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 mx-auto"
						></div>

						<div class="grid grid-cols-3 gap-4 mt-8">
							<div
								class="h-24 bg-white dark:bg-zinc-800 rounded-lg border"
							></div>
							<div
								class="h-24 bg-white dark:bg-zinc-800 rounded-lg border"
							></div>
							<div
								class="h-24 bg-white dark:bg-zinc-800 rounded-lg border"
							></div>
						</div>

						<div class="mt-8 p-6 bg-primary/10 rounded-xl">
							<div class="h-8 bg-primary/20 rounded w-2/3 mx-auto"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Slider Handle -->
		<div
			class="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#3644FE] to-[#B345ED]
             cursor-ew-resize z-10 group"
			style="left: {sliderPosition}%"
		>
			<!-- Handle circle -->
			<div
				class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                  w-8 h-8 bg-white dark:bg-zinc-900 rounded-full border-2
                  border-primary shadow-lg flex items-center justify-center
                  group-hover:scale-110 transition-transform"
			>
				<div class="w-1 h-4 bg-primary rounded-full"></div>
			</div>
		</div>

		<!-- Labels -->
		<div
			class="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm
                rounded-full text-white text-sm font-medium"
		>
			Google Docs
		</div>
		<div
			class="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm
                rounded-full text-white text-sm font-medium"
		>
			Live Website
		</div>
	</button>

	<!-- Sample Selector Marquee -->
	<SampleMarquee
		{samples}
		{currentSample}
		on:sampleChange={(e) => handleSampleChange(e.detail)}
	/>



</div>
