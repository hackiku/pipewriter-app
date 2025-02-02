<!-- src/lib/pages/landing/sections/hero/Hero.svelte -->
<script lang="ts">
	import { FileText } from "lucide-svelte";
	import BuyButton from "$lib/components/cta/buy/BuyButton.svelte";
	import StickerBackground from "./StickerBackground.svelte";
	import ClientAvatars from "$lib/components/proof/avatars/ClientAvatars.svelte";
	export let HEADLINE: string;
</script>

<div class="relative h-full flex items-start justify-center pt-[20vh]">
	<StickerBackground opacity="0.6" />

	<div class="flex flex-col gap-6 items-center text-center">
		<!-- <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
                bg-primary/10 text-primary border border-primary/20 mb-6">
      <FileText class="w-4 h-4" />
      <span class="text-sm font-medium">Write in Google Docs</span>
    </div> -->

		<h1
			class="{HEADLINE} text-[7vh] md:text-[8vh] lg:text-[12vh]
              font-medium leading-[1.1] tracking-tight
              max-w-[20ch] mx-auto"
		>
			UX App for Writers
		</h1>

		<p
			class="text-[4.5vw] sm:text-[3vw] md:text-[2vw] lg:text-[2vw]
              text-muted-foreground leading-relaxed
              max-w-[40ch] mb-2"
		>
			Wireframes in Google Docs + AI code. Protoype where you write and charge
			more for deliverables.
		</p>

		<BuyButton
			size="lg"
			text="Early Access"
			showPrice={false}
			source="hero"
			price="— $97"
		/>

		<ClientAvatars
			mode="writer"
			count={46}
			label="writers"
		/>
	</div>
</div>
