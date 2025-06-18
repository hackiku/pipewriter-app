<!-- src/lib/pages/landing/sections/hero/Hero.svelte -->
<script lang="ts">
	import { FileText, Hourglass } from "lucide-svelte";
	import BuyButton from "$lib/components/cta/buy/BuyButton.svelte";
	import GetStartedButton from "$lib/components/cta/signin/GetStartedButton.svelte";
	import StickerBackground from "./StickerBackground.svelte";
	// import ClientAvatars from "$lib/components/proof/avatars/ClientAvatars.svelte";
	import UserAvatars from "$lib/components/proof/avatars/UserAvatars.svelte";
	export let HEADLINE: string;
</script>

<div class="relative h-full flex items-start justify-center pt-[18vh]">
	
	<div class="-z-10">
		<StickerBackground opacity="0.6" />
	</div>

	<div class="flex flex-col gap-4 items-center text-center">

		<h1
			class="{HEADLINE} text-[3em] sm:text-[4.5em] md:text-[5em] lg:text-[5.5em]
              font-medium leading-[1.1] tracking-tight
              max-w-[20ch] mx-auto"
		>
			UX App for Writers <br />in Google Docs
		</h1>

		<!-- <p
			class="text-[4.5vw] sm:text-[3vw] md:text-[2vw] lg:text-[2vw]
              text-muted-foreground leading-relaxed
              max-w-[40ch] mb-2"
		> -->
		<p
			class="text-xl sm:text-[3vw] md:text-2xl lg:text-[2.25vw]
              text-muted-foreground md:leading-relaxed
              max-w-[30ch] mb-4"
		>
			Prototype right where you write with native add-on + templates.
		</p>

		<GetStartedButton
			size="lg"
			text="Early Access"
			source="hero"
		/>

		<div class="text-xs text-foreground/50">
			<!-- <Hourglass class="w-6 h-6" /> -->
			⏳ pending Google Marketplace approval
		</div>
		<!-- <ClientAvatars
			mode="writer"
			count={46}
			label="writers"
		/> -->
		
		<!-- <UserAvatars 
			initialMode="reading"
			switchInterval={3000}
			/> -->

	</div>
</div>