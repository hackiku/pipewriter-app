<!-- src/lib/components/cta/pricing/PricingCard.svelte -->

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Check, ArrowRight } from "lucide-svelte";
  import type { Plan } from '$data/pricing/types';
  import ProductStat from './ProductStat.svelte';
  
  export let plan: Plan;
  export let className = '';

  $: priceDisplay = getPriceDisplay(plan.price);
  $: isMainPlan = plan.id === 'suite';

  function getPriceDisplay(price: Plan['price']) {
    if (!price.amount) return 'In Development';
    
    const amount = `$${price.amount}`;
    const period = price.period === 'one-time' ? 'one-time' : 
                  price.period === 'monthly' ? '/month' : 
                  '/year';
                  
    return { amount, period };
  }
</script>

<div class="relative p-8 rounded-xl border transition-all duration-300 {className}">
  <!-- Badge (if exists) -->
  {#if plan.badge}
    <div class="absolute -top-3 left-1/2 -translate-x-1/2">
      <div class="px-3 py-1 text-sm font-medium
                  bg-primary text-primary-foreground
                  rounded-full shadow-sm">
        {plan.badge}
      </div>
    </div>
  {/if}

  <!-- Header -->
  <div class="mb-6">
    <h3 class="text-3xl font-semibold mb-2">
      {plan.name}
    </h3>
  </div>

  <!-- Price -->
  <div class="flex items-baseline gap-x-2 mb-6">
    {#if typeof priceDisplay === 'string'}
      <span class="text-2xl text-muted-foreground">{priceDisplay}</span>
    {:else}
      <span class="text-5xl font-bold tracking-tight">{priceDisplay.amount}</span>
      <span class="text-lg text-muted-foreground">/{priceDisplay.period}</span>
      {#if isMainPlan}
        <span class="ml-3 text-sm line-through text-muted-foreground">$149</span>
        <span class="ml-2 text-sm text-primary font-medium">Save 40%</span>
      {/if}
    {/if}
  </div>

  <!-- Stats Row -->
  {#if isMainPlan}
    <div class="flex gap-3 mb-6">
      <ProductStat
        count="80"
        icon="/tools/google-docs.svg"
        iconAlt="Google Docs"
        variant="primary"
        size="sm"
      />
      <ProductStat
        count="8"
        icon="/tools/google-apps-script.svg"
        iconAlt="Apps Script"
        variant="primary"
        size="sm"
      />
    </div>
  {/if}

  <!-- Description -->
  <p class="text-muted-foreground mb-8">{plan.description}</p>

  <!-- Features -->
  {#if isMainPlan}
    <div class="mb-8">
      <ul class="space-y-3">
        {#each plan.features as feature}
          <li class="flex items-start gap-x-3 group">
            <Check class="h-5 w-5 text-primary shrink-0 
                         group-hover:scale-110 transition-transform" />
            <span class="leading-tight">{feature}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <!-- CTA -->
  <Button 
    variant={plan.cta.variant} 
    size="lg" 
    class="w-full group"
    href={plan.cta.href}
  >
    {plan.cta.text}
    <ArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </Button>
</div>