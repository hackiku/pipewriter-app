<!-- src/lib/pages/space/components/products/Products.svelte -->
<script lang="ts">
	import { Rocket } from "lucide-svelte";
	import { onDestroy } from "svelte";
	import { products } from "../../data/products";
	import { spaceStore } from "../../stores/spaceStore";
	import ProductCard from "./ProductCard.svelte";
	import MasonryPortfolio from "./MasonryPortfolio.svelte";
	import ProjectsMarquee from "./ProjectsMarquee.svelte";

	// const testProduct = products

	onDestroy(() => {
		spaceStore.setActiveProduct(null);
	});
</script>

<!-- Section Heading -->
<div class="flex flex-col items-centerx gap-4 my-12">
	<h3
		class="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed tracking-wide"
	>
		Space Products
</h3>

	<!-- <MasonryPortfolio {product} index={i} /> -->
	<MasonryPortfolio />

	<div class="max-w-3xl">
		<ProductCard product={products[2]} index={2} />
	</div>
	<!-- <ProductCard product={products.find(p => p.title === "Wing Designer")} index={2} /> -->

	<div class="mt-24s">
		<h2 class="text-xl">"Deploy in a weekend" they said</h2>
	</div>
	<ProjectsMarquee />
</div>
