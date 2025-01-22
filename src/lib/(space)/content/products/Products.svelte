<!-- src/lib/pages/space/components/products/Products.svelte -->
<script lang="ts">
	import { Rocket } from "lucide-svelte";
	import { onDestroy } from "svelte";
	import { products } from "../../data/products";
	import { spaceStore } from "../../stores/spaceStore";
	import ProductCard from "./ProductCard.svelte";
	import ProjectsMarquee from "./ProjectsMarquee.svelte";

	onDestroy(() => {
		spaceStore.setActiveProduct(null);
	});
</script>

<!-- Section Heading -->
<div class="flex flex-col items-center text-center gap-4 mb-12">

<div class="container max-w-4xl mx-auto">
	<div class="relative mt-24 flex flex-col items-center">
		{#each products as product, i}
			<div class="w-full relative {i !== 0 ? '-mt-[8rem] sm:-mt-[18rem]' : ''}">
				<ProductCard {product} index={i} />
			</div>
		{/each}
	</div>
</div>


<div class="mt-24">

	<h2 class="text-3xl">And so on & so forth</h2>
</div>


	<ProjectsMarquee />
</div>

