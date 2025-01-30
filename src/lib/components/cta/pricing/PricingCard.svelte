<!-- src/lib/components/cta/pricing/PricingCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Check } from "lucide-svelte";
  import type { Plan } from '$data/pricing/types';
  
  export let plan: Plan;
  export let className = '';

  $: priceDisplay = getPriceDisplay(plan.price);

  function getPriceDisplay(price: Plan['price']) {
    if (!price.amount) return 'In Development';
    
    const amount = `$${price.amount}`;
    const period = price.period === 'one-time' ? 'one-time' : 
                  price.period === 'monthly' ? '/month' : 
                  '/year';
                  
    return { amount, period };
  }
</script>

<div class="relative p-8 bg-card text-card-foreground rounded-xl border {className}">
  {#if plan.badge}
    <div class="absolute -top-3 left-1/2 -translate-x-1/2">
      <div class="px-3 py-1 text-sm bg-primary text-primary-foreground 
                  rounded-full shadow-sm">
        {plan.badge}
      </div>
    </div>
  {/if}

  <!-- Header -->
  <div class="space-y-2">
    <h3 class="text-2xl font-medium">{plan.name}</h3>
    <p class="text-muted-foreground">{plan.description}</p>
  </div>

  <!-- Price -->
  <div class="flex items-baseline gap-x-2 mt-6">
    {#if typeof priceDisplay === 'string'}
      <span class="text-2xl text-muted-foreground">{priceDisplay}</span>
    {:else}
      <span class="text-4xl font-light">{priceDisplay.amount}</span>
      <span class="text-muted-foreground">{priceDisplay.period}</span>
    {/if}
  </div>

  <!-- Features -->
  <div class="mt-8 space-y-4">
    <ul class="space-y-3">
      {#each plan.features as feature}
        <li class="flex items-start gap-x-3">
          <Check class="h-5 w-5 text-primary shrink-0" />
          <span>{feature}</span>
        </li>
      {/each}
    </ul>
  </div>

  <!-- CTA -->
  <div class="mt-8">
    <Button 
      variant={plan.cta.variant} 
      size="lg" 
      class="w-full"
      href={plan.cta.href}
    >
      {plan.cta.text}
    </Button>
  </div>
</div>

