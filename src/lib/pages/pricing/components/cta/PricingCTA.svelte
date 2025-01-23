<!-- components/cta/PricingCTA.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { pricingStore } from "../../stores/pricingStore";

  export let plan: string;
  export let price: number | null;
  
  const handleClick = () => {
    pricingStore.selectPlan(plan);
    if (price === null) {
      // Handle enterprise contact flow
      window.location.href = '/contact';
    } else {
      // Handle standard checkout flow
      window.location.href = `/checkout?plan=${plan}`;
    }
  };
</script>

<div class="flex flex-col items-center space-y-6 py-12 px-4 bg-zinc-900/30 rounded-xl border border-zinc-800">
  <div class="text-center space-y-2">
    <h3 class="text-2xl font-medium">Ready to Launch?</h3>
    <p class="text-zinc-400">
      {#if price === null}
        Get in touch for a custom solution tailored to your needs
      {:else}
        Start your journey with our {plan} plan today
      {/if}
    </p>
  </div>

  <Button 
    variant="default" 
    size="lg" 
    class="min-w-[200px]"
    on:click={handleClick}
  >
    {price === null ? 'Contact Sales' : 'Get Started'}
  </Button>

  <p class="text-sm text-zinc-500">
    30-day money back guarantee • Cancel anytime
  </p>
</div>