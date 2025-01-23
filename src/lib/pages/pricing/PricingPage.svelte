<!-- src/lib/pages/pricing/PricingPage.svelte -->
<script lang="ts">
	import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import Hero from './sections/hero/Hero.svelte';
  import Plans from './sections/plans/Plans.svelte';
  import Benefits from './sections/benefits/Benefits.svelte';
  import Compare from './sections/compare/Compare.svelte';
  import FAQ from './sections/faq/FAQ.svelte';
</script>


<!-- <div class="fixed inset-0 pointer-events-none z-0">
	<BackgroundPattern size="sm" opacity="high" gradient={true} />
</div> -->

<main class="min-h-screen bg-gradient-to-b from-background to-background/95">
  <Hero />
  <Plans />
  <Benefits />
  <Compare />
  <FAQ />
</main>