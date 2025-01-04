<!-- src/lib/pages/space/proof/StackIcons.svelte -->
<script lang="ts">
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import { tools } from "$lib/data/assets/tools";

	let visible = false;
	let container: HTMLElement;

	const spaceStacks = [
		{
			...tools.sveltekit,
			description: "Fast as a rocket",
		},
		{
			...tools.react,
			description: "Mission control dashboards",
		},
		{
			...tools.nextjs,
			description: "Enterprise-ready",
		},
		{
			...tools.tailwind,
			description: "Pixel-perfect design",
		},
		{
			...tools.figma,
			description: "Launch blueprints",
		},
		{
			...tools.pipewriter,
			description: "UX writing",
		},
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 },
		);

		observer.observe(container);
		return () => observer.disconnect();
	});

	let scrolling = false;
	function handleScroll(e: WheelEvent) {
		if (!scrolling) {
			requestAnimationFrame(() => {
				container.scrollLeft += e.deltaY;
				scrolling = false;
			});
			scrolling = true;
		}
	}
</script>

<div
	class="w-full overflow-x-auto pb-8 hide-scrollbar relative"
	bind:this={container}
	on:wheel={handleScroll}
>
	{#if visible}
		<!-- Add flex and justify-center here -->
		<div class="flex justify-center min-w-full">
			<!-- Wrap the scrolling content -->
			<div class="flex gap-12 px-4 py-2" in:fly={{ x: 20, duration: 800 }}>
				{#each spaceStacks as stack, i}
					<a
						href={stack.url}
						target="_blank"
						rel="noopener noreferrer"
						class="flex flex-col items-center gap-3 group"
						in:fly={{ y: 20, duration: 400, delay: i * 100 }}
					>
						<div
							class="w-16 h-16 rounded-xl bg-card border p-3
                     flex items-center justify-center
                     transition-all duration-300
                     group-hover:scale-110 group-hover:rotate-3
                     group-hover:shadow-lg group-hover:border-primary/20"
						>
							<img
								src={stack.icon}
								alt={stack.name}
								class="w-full h-full object-contain"
								onerror="this.innerText = '{stack.fallback}'"
							/>
						</div>
						<span class="text-sm font-medium">{stack.name}</span>
						<span
							class="text-xs text-muted-foreground opacity-0
                     group-hover:opacity-100 transition-opacity"
						>
							{stack.description}
						</span>
					</a>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Gradient Edges -->
	<div
		class="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent"
	/>
	<div
		class="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent"
	/>
</div>

<style>
	.hide-scrollbar {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
