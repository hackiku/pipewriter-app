<!-- src/lib/components/cta/pricing/cards/ProCard.svelte -->
<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Check, ArrowRight, Lock } from "lucide-svelte";
	import ProductStat from "../components/ProductStat.svelte";
	import CartButton from "$lib/components/cta/buy/CartButton.svelte";

	export let className = "";

	const features = [
		"Wireframes in Google Docs",
		"90+ UI components (tables)",
		"Export to HTML/CSS",
		"AI prompts & workflows",
	];
</script>


<!-- <div
  class="relative p-10 rounded-xl
         border border-primary/20
         bg-gradient-to-b from-card/95 to-card/90
         dark:from-[#0F1520] dark:to-[#0A0F16]
         hover:shadow-xl hover:shadow-primary/10
         hover:border-primary/30
         transition-all duration-300 {className}"
> -->
<div
  class="relative p-10 rounded-xl
         border border-primary/20
         bg-gradient-to-r from-[#3644FE]/10 to-[#B345ED]/10
				 ___bg-gradient-to-b __from-card/95 __to-card/90
         __dark:from-[#0F1520] __dark:to-[#0A0F16]
         hover:shadow-xl hover:shadow-primary/10
         hover:border-primary/30
         transition-all duration-300 {className}"
>


<!-- <div
	class="relative p-10 rounded-xl border border-primary/20
            bg-card hover:bg-card/90
            transition-all duration-300 {className}"
> -->
	<!-- Most Popular Badge -->
	<div class="absolute -top-3 left-1/2 -translate-x-1/2">
		<div
			class="px-3 py-1 text-sm font-medium bg-primary/10 text-primary
                rounded-full border border-primary/20"
		>
			Most Popular
		</div>
	</div>

	<!-- <div class="absolute top-2 right-4 flex gap-2">
		<div class="flex justify-center gap-3">
			<ProductStat count="13" icon="docs" />
			<ProductStat count="8" icon="scripts" />
		</div>
	</div> -->

	<!-- Main Content -->
	<div class="space-y-1s max-w-lg">
		<!-- Title & Description -->
		<div class="flex justify-between items-center mb-12">
			<h3 class="text-2xl font-semibold">Docs Pro</h3>

			<div class="flex justify-center gap-3 h-full">
				<ProductStat count="13" icon="docs" />
				<ProductStat count="8" icon="scripts" />
			</div>
		</div>

		<!-- Pricing -->
		<div class="relative ml-8 mb-8">
			<div class="flex items-baseline gap-2">
				<span class="text-5xl font-semibold">$57</span>
				<span class="text-xl text-muted-foreground">lifetime</span>
			</div>
			<div class="absolute -top-4 -left-10 rotate-[-12deg]">
				<span class="text-3xl font-medium text-foreground/40 relative">
					$97
					<div
						class="absolute inset-0 w-[120%] -left-[10%] top-1/2 h-[3px]
											bg-foreground/40 rotate-[-8deg]"
					/>
				</span>
			</div>
		</div>

		<div class="flex flex-col justify-between">
		<!-- Features List -->
		<ul class="space-y-3 mb-8">
			{#each features as feature}
				<li class="flex items-center gap-3 group">
					<div
						class="h-5 w-5 rounded-full bg-gradient-to-r from-[#3644FE] to-[#B345ED]
                      flex items-center justify-center shrink-0
                      group-hover:scale-110 transition-transform"
					>
						<Check class="h-3 w-3 text-white" />
					</div>
					<span
						class="text-lg font-medium text-muted-foreground group-hover:text-foreground
                       transition-colors"
					>
						{feature}
					</span>
				</li>
			{/each}
		</ul>

		<!-- CTA Button -->
			<CartButton text="Get Pro Access" />
			<!-- Secured by -->
			<div class="mt-4 text-center">
				<span
					class="text-xs text-muted-foreground flex items-center justify-center gap-1.5"
				>
					<Lock class="w-3 h-3" />
					Secured by Gumroad
				</span>
			</div>
		</div>
	</div>
</div>
