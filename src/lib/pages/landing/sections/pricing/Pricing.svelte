<!-- src/lib/pages/landing/sections/pricing/Pricing.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import PricingGrid from "$lib/components/cta/pricing/PricingGrid.svelte";
</script>

  <div class="container max-w-4xl">
    <PricingGrid />
  </div>
  
  <div class="mt-16 text-center">
    <p class="text-sm text-muted-foreground mb-4">
      🔒 Secured by Gumroad • 30-day satisfaction guarantee
    </p>
    <div class="flex items-center justify-center gap-8">
      <img src="/logos/stripe.svg" alt="Stripe" class="h-6 opacity-50" />
      <img src="/logos/visa.svg" alt="Visa" class="h-6 opacity-50" />
      <img src="/logos/mastercard.svg" alt="Mastercard" class="h-6 opacity-50" />
    </div>
  </div>
