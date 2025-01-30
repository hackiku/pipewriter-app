<!-- src/lib/pages/LandingPage.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
	import { dev } from "$app/environment"
  import { Rocket, Stars } from "lucide-svelte";
  // import { spaceStore } from "./stores/spaceStore";

  // ./sections/
  import Hero from "./sections/hero/Hero.svelte";
  import Features from "./sections/features/Features.svelte";
  import Proof from "./sections/proof/Proof.svelte";
  import Pricing from "./sections/pricing/Pricing.svelte";

</script>


<!-- Viewport Size Indicator -->
{#if dev}
	<div class="fixed top-0 right-0 p-2 m-2 bg-black/20 text-white/50 rounded z-50 pointer-events-none text-sm font-mono">
		<span class="hidden xs:inline sm:hidden">sm {384}px</span>
		<span class="hidden sm:inline md:hidden">md {640}px</span>
		<span class="hidden md:inline lg:hidden">lg {768}px</span>
		<span class="hidden lg:inline xl:hidden">xl {1024}px</span>
		<span class="hidden xl:inline 2xl:hidden">2xl {1280}px</span>
		<span class="hidden 2xl:inline">3xl {1536}px</span>
	</div>
{/if}

<main class="flex flex-col relative min-h-screen overflow-x-clip __bg-zinc-300/40 __dark:bg-zinc-950 text-foreground">

  <section class="relative py-24
		max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
		<Hero />
  </section>
	
	
	<section class="relative py-24 border
		max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
		<Features />
  </section>
  
  <section class="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
    <Proof />
  </section>


  <!-- CTA Section -->
  <section class="relative border-t py-20">
		<Pricing />
  </section>
</main>