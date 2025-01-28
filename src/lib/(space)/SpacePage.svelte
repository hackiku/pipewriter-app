<!-- src/lib/(space)/SpacePage.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { Rocket, Stars } from "lucide-svelte";
  // import { spaceStore } from "./stores/spaceStore";
  import SpaceNav from "./components/nav/SpaceNav.svelte";

  // chute
  import Scene from "./components/chute/Scene.svelte";
  import Controls from "./components/chute/Controls.svelte";
  import BeforeAfter from "./components/repack/BeforeAfter.svelte";
  
  // ./content/
  import Hero from "./content/hero/Hero.svelte";
  import Repack from './content/repack/Repack.svelte';
  import Features from "./content/features/Features.svelte";
  import About from "./content/about/About.svelte";
  import Products from "./content/products/Products.svelte";
  import Testimonials from "./components/proof/Testimonials.svelte";
  import CTA from "./components/cta/CTA.svelte";
  import LogosMarquee from "$lib/components/proof/LogosMarquee.svelte";

  let startAnimation: () => void;
  let pauseAnimation: () => void;
</script>

<SpaceNav />

<!-- Viewport Size Indicator -->
<div class="fixed top-0 right-0 p-2 m-2 bg-black/20 text-white/50 rounded z-50 pointer-events-none text-sm font-mono">
  <span class="hidden xs:inline sm:hidden">sm {384}px</span>
  <span class="hidden sm:inline md:hidden">md {640}px</span>
  <span class="hidden md:inline lg:hidden">lg {768}px</span>
  <span class="hidden lg:inline xl:hidden">xl {1024}px</span>
  <span class="hidden xl:inline 2xl:hidden">2xl {1280}px</span>
  <span class="hidden 2xl:inline">3xl {1536}px</span>
</div>

<div class="fixed inset-0 z-0 w-full h-screen pointer-events-none
	border overflow-hidden border-red-800/30">
	<Scene bind:startAnimation bind:pauseAnimation/>
</div>


<main class="flex flex-col relative min-h-screen overflow-x-clip __bg-zinc-300/40 __dark:bg-zinc-950 text-foreground">
  <!-- <Scene bind:startAnimation /> -->
  <Controls {startAnimation} {pauseAnimation} />
	<!-- <div class="fixed inset-0 z-0 w-full h-screen pointer-events-none
		border overflow-hidden border-red-800/30">
		<Scene bind:startAnimation bind:pauseAnimation/>
	</div> -->

  <!-- Hero Section -->
  <section class="relative h-[90vh]">
    <div class="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 h-[65vh] grid lg:grid-cols-2 items-start">
      <div class="relative z-10 h-full pt-28">
        <Hero />
      </div>
    </div>
  </section>

  <section class="relative -mt-[10vh] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
    <Repack />
  </section>

  <section>
    <Features />
  </section>
  
  <section class="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
    <Testimonials />
  </section>

  <!-- About & Products -->
  <section class="relative bg-zinc-950/[0.05] dark:bg-white/[0.03]">
    <div class="absolute inset-x-0 top-0 flex justify-center">
      <div class="flex-1 border-t border-border/50" />
      <div class="w-32 -translate-y-6">
        <div class="relative h-16 -translate-y-10 bg-zinc-950/[0.05] dark:bg-white/[0.03] border-t border-x border-border/50 rounded-t-full" />
        <div class="absolute top-6 z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center">
          <span class="text-lg font-serif italic">?</span>
        </div>
        <p class="text-xl font-medium text-muted-foreground text-center mt-2">
          What's with the space?
        </p>
      </div>
      <div class="flex-1 border-t border-border/50" />
    </div>

    <div class="pb-24">
      <About />
      <Products />
    </div>
  </section>

  <!-- CTA Section -->
  <section class="relative border-t py-20">
    <div class="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
      <div class="max-w-2xl mx-auto text-center space-y-4 mb-16">
        <h2 class="text-5xl font-normal">Let the Spice Flow</h2>
        <p class="text-2xl text-muted-foreground">
          Book a free discovery call.
        </p>
      </div>
      <CTA />
    </div>
    <LogosMarquee />
  </section>
</main>