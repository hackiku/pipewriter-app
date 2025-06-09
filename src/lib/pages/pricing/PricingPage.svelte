<!-- src/lib/pages/pricing/PricingPage.svelte -->
<script lang="ts">
  import Hero from './sections/hero/Hero.svelte';
  import Plans from './sections/plans/Plans.svelte';
  import Benefits from './sections/benefits/Benefits.svelte';
  import Compare from './sections/compare/Compare.svelte';
  import FAQ from './sections/faq/FAQ.svelte';
  import BackgroundGrid from "$lib/components/BackgroundGrid.svelte";
  import { onDestroy } from 'svelte';
  import { pricingStore } from './stores/pricingStore';
  
  // Reset store when leaving page
  onDestroy(() => {
    pricingStore.reset();
  });
</script>

<!-- Background -->
<div class="bg-landing dark:bg-[#040D12] fixed inset-0 min-w-screen min-h-screen overflow-hidden -z-10">
  <BackgroundGrid gridSize="44" speed="10s" opacity="0.3" />
</div>

<main class="min-h-screen bg-gradient-to-b from-background/90 to-background/95 relative">
  
  <!-- Hero Section -->
  <Hero />
  
  <!-- Plans Section -->
  <Plans />
  
  <!-- Benefits Section -->
  <!-- <Benefits /> -->
  
  <!-- Comparison Section -->
  <!-- <Compare /> -->
  
  <!-- FAQ Section -->
  <FAQ />
  
</main>