<!-- src/lib/pages/landing/sections/pricing/Pricing.svelte -->
<script lang="ts">
  import PricingCard from "$lib/components/cta/pricing/PricingCard.svelte";  
  import { plans } from '$data/pricing';
</script>

<div class="container max-w-5xl">
  <div class="text-center mb-16">
    <h2 class="text-4xl font-medium mb-4">Simple Pricing</h2>
    <p class="text-xl text-muted-foreground">
      Start with a $1 trial or go all-in with the complete toolkit.
    </p>
  </div>

  <div class="grid md:grid-cols-2 gap-8">
    {#each plans as plan (plan.id)}
      <PricingCard {plan} />
    {/each}
  </div>

  <div class="mt-16 text-center">
    <p class="text-sm text-muted-foreground">
      All plans include a 30-day money-back guarantee. Questions? 
      <a href="/contact" class="text-primary hover:underline">Get in touch</a>.
    </p>
  </div>
</div>