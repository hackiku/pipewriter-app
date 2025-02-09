<!-- src/lib/pages/landing/sections/hero/Hero.svelte -->
<script lang="ts">
	import { FileText } from "lucide-svelte";
	import BuyButton from "$lib/components/cta/buy/BuyButton.svelte";
	import StickerBackground from "./StickerBackground.svelte";
	// import ClientAvatars from "$lib/components/proof/avatars/ClientAvatars.svelte";
	import UserAvatars from "$lib/components/proof/avatars/UserAvatars.svelte";
	export let HEADLINE: string;
</script>

<div class="relative h-full flex items-start justify-center pt-[22vh]">
	
	<div class="-z-10">
		<StickerBackground opacity="0.6" />
	</div>

	<div class="flex flex-col gap-4 items-center text-center">


		<h1
			class="{HEADLINE} text-[7vh] md:text-[10vh] lg:text-[12vh]
              font-medium leading-[1.1] tracking-tight
              max-w-[20ch] mx-auto"
		>
			UX App for Writers
		</h1>

		<!-- <p
			class="text-[4.5vw] sm:text-[3vw] md:text-[2vw] lg:text-[2vw]
              text-muted-foreground leading-relaxed
              max-w-[40ch] mb-2"
		> -->
		<p
			class="text-xl sm:text-[3vw] md:text-2xl lg:text-[2.5vw]
              text-muted-foreground md:leading-relaxed
              max-w-[40ch] mb-4"
		>
			Wireframes in Google Docs + AI workflows. Prototype where you write and charge
			more for deliverables.
		</p>

		<BuyButton
			size="lg"
			text="Early Access"
			showPrice={false}
			source="hero"
			price="— $97"
		/>

		<!-- <ClientAvatars
			mode="writer"
			count={46}
			label="writers"
		/> -->
		
		<UserAvatars 
			initialMode="reading"
			switchInterval={3000}
			/>


	</div>
</div>
