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
	
	<div class="-z-10 hidden md:block">
		<StickerBackground opacity="0.6" />
	</div>

	<div class="flex flex-col gap-4 items-center text-center">

		<h1
			class="{HEADLINE} text-[4em] sm:text-[4.5em] md:text-[5em] lg:text-[5.5em]
              font-medium leading-[1.1] tracking-tight
              max-w-[20ch] mx-auto"
		>
			UX App for Writers
			<br />
			<span class="hidden md:block">in Google Docs</span>
		</h1>
		<span class="{HEADLINE} -mt-2 font-medium md:hidden text-4xl __font-bold sm:text-5xl md:text-6xl lg:text-6xl">(in Google Docs)</span>

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
			Prototype right where you write, with native add-on + templates.
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
		
	</div>
	
	<div class="absolute bottom-20 md:right-[15%] md:bottom-[18vh] md:-rotate-6">
		<UserAvatars 
			initialMode="reading"
			switchInterval={3000}
		/>

	</div>

</div>