<!-- src/lib/pages/pricing/content/plans/PlanCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import type { Plan } from '../../data/plans';
  // import type { Plan } from '../../types';
  
  export let plan: Plan;

  $: priceDisplay = getPriceDisplay(plan.price);

  function getPriceDisplay(price: Plan['price']) {
    if (!price.amount) return 'In Development';
    
    const amount = `$${price.amount}`;
    const period = price.period === 'one-time' ? ' one-time' : 
                  price.period === 'monthly' ? '/month' : 
                  '/year';
                  
    return { amount, period };
  }
</script>

<div class="relative p-8 bg-card/50 border rounded-xl space-y-6">
  {#if plan.badge}
    <div class="absolute -top-3 left-1/2 -translate-x-1/2">
      <div class="px-3 py-1 text-sm bg-primary/10 text-primary 
                  border border-primary/20 rounded-full">
        {plan.badge}
      </div>
    </div>
  {/if}

  <div class="space-y-2">
    <h3 class="text-2xl font-medium">{plan.name}</h3>
    <p class="text-muted-foreground">{plan.description}</p>
  </div>

  <div class="flex items-baseline gap-x-2">
    {#if typeof priceDisplay === 'string'}
      <span class="text-2xl text-muted-foreground">{priceDisplay}</span>
    {:else}
      <span class="text-4xl font-light">{priceDisplay.amount}</span>
      <span class="text-muted-foreground">{priceDisplay.period}</span>
    {/if}
  </div>

  <div class="space-y-4">
    <ul class="space-y-3">
      {#each plan.features as feature}
        <li class="flex items-start gap-x-3">
          <span class="text-primary shrink-0 mt-1">✓</span>
          <span>{feature}</span>
        </li>
      {/each}
    </ul>
  </div>

  <Button 
    variant={plan.cta.variant} 
    size="lg" 
    class="w-full"
    href={plan.cta.href}
  >
    {plan.cta.text}
  </Button>
</div>