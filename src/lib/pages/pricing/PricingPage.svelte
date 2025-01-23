<!-- lib/pages/pricing/PricingPage.svelte -->
<script lang="ts">
  import Hero from './content/hero/Hero.svelte';
  import Plans from './content/plans/Plans.svelte';
  import Compare from './content/compare/Compare.svelte';
  import FAQ from './content/faq/FAQ.svelte';
</script>

<div class="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white">
  hero
	<Hero />
  <Plans />
  <Compare />
  <!-- <FAQ /> -->
</div>