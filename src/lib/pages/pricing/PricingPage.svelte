<!-- src/lib/pages/pricing/PricingPage.svelte -->
<script lang="ts">
	import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import Hero from './content/hero/Hero.svelte';
  import Plans from './content/plans/Plans.svelte';
  import Compare from './content/compare/Compare.svelte';
  import FAQ from './content/faq/FAQ.svelte';
</script>


<!-- <div class="fixed inset-0 pointer-events-none z-0">
	<BackgroundPattern size="sm" opacity="high" gradient={true} />
</div> -->

<main class="min-h-screen bg-gradient-to-b from-background to-background/95">
  <Hero />
  <Plans />
  <Compare />
  <FAQ />
</main>