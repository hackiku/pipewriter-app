<!-- src/lib/pages/landing/LandingPage.svelte -->
<script lang="ts">
  import { dev } from "$app/environment";
  import { Circle } from 'lucide-svelte';
  import Hero from "./sections/hero/Hero.svelte";
  import Demo from "./sections/demo/Demo.svelte";
  // import DocsDemo from "$lib/components/demo/docs/DocsDemo.svelte";
  import Features from "./sections/features/Features.svelte";
  import Proof from "./sections/proof/Proof.svelte";
  import Pricing from "./sections/pricing/Pricing.svelte";
  import AppDemo from "$lib/components/demo/app/AppDemo.svelte";


  // import Frame from '$lib/iframe/Frame.svelte';

</script>


<main class="flex flex-col relative min-h-screen overflow-x-clip text-foreground">
  <!-- Hero Section -->
  <section class="relative pt-32 md:pt-40 h-[90vh] max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <Hero /> 
  </section>

  <!-- Demo Section -->
  <section class="relative -mt-[10vh] max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <Demo />
    <!-- <DocsDemo /> -->
  </section>
  
  <!-- Features Section -->
  <section class="relative py-24 border-t max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <h2 class="text-[5vh] md:text-[6vh] lg:text-[7vh] 
              font-medium leading-[1.1] tracking-tight mb-16
              max-w-[20ch] mx-auto text-center">
      10x Your Copy Decks in Google Docs
    </h2>

    <Features />
  </section>

  <!-- App Demo Section -->
  <section class="relative py-24 border-t max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <!-- Browser Mock -->
    <div class="relative rounded-xl overflow-hidden border bg-zinc-950 text-white">
      <!-- Browser Chrome -->
      <div class="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900">
        <div class="flex gap-1.5">
          <Circle class="w-3 h-3 fill-red-500 text-red-500" />
          <Circle class="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <Circle class="w-3 h-3 fill-green-500 text-green-500" />
        </div>
      </div>

      <!-- App Content -->
      <div class="min-h-[80vh]">
        <AppDemo />
      </div>
    </div>
  </section>
	
	<div class="border border-dashed border-red-500/40 m-6 rounded-3xl">
		<AppDemo />
	</div>

  <!-- Social Proof -->
  <section class="py-24">
    <Proof />
  </section>

  <!-- Pricing -->
  <section class="relative border-t py-20">
    <Pricing />
  </section>
</main>