<!-- $lib/iframe/layout/Dropper.svelte -->
<script lang="ts">
	import { fade, slide, fly } from "svelte/transition";
	import { getElement } from "../elements";
	import type { ElementObject } from "../elements";
	import { createEventDispatcher } from "svelte";
	import ElementCard from "../components/ElementCard.svelte";
	import DropperBar from "../components/DropperBar.svelte";
	import { showInfo, elementsTheme, zenMode } from "../stores";

	export let elements: Record<string, ElementObject>;
	export let callGAS: (action: string, params: Record<string, any>) => void;

	const dispatch = createEventDispatcher();

	// Filter elements based on current theme
	$: filteredElements = Object.values(elements).filter((element) => {
		if ($elementsTheme === "dark") {
			// In dark theme, only show dark variants
			return element.id.endsWith("-dark");
		} else {
			// In light/gray theme, exclude dark variants
			return !element.id.endsWith("-dark");
		}
	});

	// Group filtered elements by category
	$: groupedByCategory = filteredElements.reduce(
		(acc, el) => {
			// Extract the base category (remove -dark suffix if present)
			const category = el.category;
			if (!acc[category]) acc[category] = [];
			acc[category].push(el);
			return acc;
		},
		{} as Record<string, ElementObject[]>,
	);

	async function selectElement(elementId: string) {
		console.log(`Selecting element: ${elementId}`);
		const element = getElement(elementId);
		if (element) {
			try {
				const result = await callGAS("getElement", { elementId: element.id });
				console.log(`Element fetched successfully: ${elementId}`, result);
				dispatch("elementSelected", { elementId: element.id, result });
			} catch (error) {
				console.error(`Failed to fetch element: ${elementId}`, error);
				dispatch("elementError", {
					elementId: element.id,
					error: error.message,
				});
			}
		} else {
			console.error(`Element not found: ${elementId}`);
		}
	}
</script>

<div class="relative h-full z-0">
	<div class="overflow-y-auto h-full pb-8 pt-2">
		{#if Object.entries(groupedByCategory).length > 0}
			{#each Object.entries(groupedByCategory) as [category, categoryElements]}
				<div class="category-section mb-2">
					{#if $showInfo}
						<h3 class="text-xs font-normal text-gray-400 mb-1">
							{category.replace("-", " ")}
						</h3>
					{/if}
					<div class="grid grid-cols-3 gap-2">
						{#each categoryElements as element (element.id)}
							<ElementCard
								{element}
								onSelect={selectElement}
								theme={$elementsTheme}
							/>
						{/each}
					</div>
				</div>
			{/each}
		{:else}
			<p>No elements available.</p>
		{/if}
	</div>

	{#if !$zenMode}
		<div in:slide={{ duration: 100, axis: "y" }} out:fly={{ duration: 200 }}>
			<DropperBar />
		</div>
	{/if}
</div>
