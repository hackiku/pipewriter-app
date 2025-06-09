<!-- src/lib/pages/pricing/sections/plans/PlanCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Check } from "lucide-svelte";
  import type { Plan } from '../../types';
  
  export let plan: Plan;
  export let isAnnual = false;

  $: priceDisplay = getPriceDisplay(plan.price, isAnnual);
  $: isPopular = plan.highlight || plan.id === 'pro';
  
  function getPriceDisplay(price: Plan['price'], annual: boolean) {
    if (price.amount === 0) {
      return { amount: 'Free', period: '' };
    }
    
    if (price.period === 'one-time') {
      return { 
        amount: `$${price.amount}`, 
        period: 'one-time',
        savings: price.savings
      };
    }
    
    if (annual && price.monthlyEquivalent) {
      return { 
        amount: `$${price.monthlyEquivalent}`, 
        period: '/month',
        billing: 'billed annually',
        savings: `Save $${(15 - price.monthlyEquivalent) * 12}/year`
      };
    }
    
    return { 
      amount: `$${price.amount}`, 
      period: price.period === 'monthly' ? '/month' : `/${price.period}` 
    };
  }
</script>

<div class="relative group">
  <!-- Popular badge -->
  {#if plan.badge && isPopular}
    <div class="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
      <div class="px-4 py-2 rounded-full text-sm font-medium
                  bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white
                  shadow-lg">
        {plan.badge}
      </div>
    </div>
  {/if}

  <!-- Card -->
  <div class="relative p-8 rounded-2xl border h-full flex flex-col
              {isPopular 
                ? 'border-transparent bg-gradient-to-b from-primary/5 to-primary/10 shadow-xl' 
                : 'border-border bg-card hover:border-primary/20'} 
              transition-all duration-300 group-hover:shadow-lg">
    
    <!-- Gradient border for popular plan -->
    {#if isPopular}
      <div class="absolute inset-0 rounded-2xl p-[1px] 
                  bg-gradient-to-b from-[#3644FE]/20 to-[#B345ED]/20 -z-10">
        <div class="absolute inset-[1px] rounded-2xl bg-background"></div>
      </div>
    {/if}

    <!-- Header -->
    <div class="text-center mb-8">
      <h3 class="text-2xl font-semibold mb-2">{plan.name}</h3>
      <p class="text-muted-foreground text-lg leading-relaxed">
        {plan.description}
      </p>
    </div>

    <!-- Pricing -->
    <div class="text-center mb-8">
      <div class="flex items-baseline justify-center gap-1 mb-2">
        <span class="text-5xl font-bold">{priceDisplay.amount}</span>
        {#if priceDisplay.period}
          <span class="text-xl text-muted-foreground">{priceDisplay.period}</span>
        {/if}
      </div>
      
      {#if priceDisplay.billing}
        <p class="text-sm text-muted-foreground">{priceDisplay.billing}</p>
      {/if}
      
      {#if priceDisplay.savings}
        <p class="text-sm font-medium text-primary mt-1">{priceDisplay.savings}</p>
      {/if}
    </div>

    <!-- Features -->
    <div class="flex-grow mb-8">
      <ul class="space-y-4">
        {#each plan.features as feature}
          <li class="flex items-start gap-3">
            <div class="mt-0.5 p-1 rounded-full 
                        {isPopular ? 'bg-primary text-primary-foreground' : 'bg-muted'}">
              <Check class="w-3 h-3" />
            </div>
            <span class="text-sm leading-relaxed">{feature}</span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- CTA -->
    <Button 
      variant={isPopular ? 'default' : plan.cta.variant}
      size="lg" 
      class="w-full {isPopular ? 'bg-gradient-to-r from-[#3644FE] to-[#B345ED] hover:shadow-lg' : ''}"
      href={plan.cta.href}
    >
      {plan.cta.text}
    </Button>

    <!-- Non-popular badge -->
    {#if plan.badge && !isPopular}
      <div class="absolute -top-3 right-4">
        <div class="px-3 py-1 rounded-full text-xs font-medium
                    bg-muted text-muted-foreground border">
          {plan.badge}
        </div>
      </div>
    {/if}
  </div>
</div>