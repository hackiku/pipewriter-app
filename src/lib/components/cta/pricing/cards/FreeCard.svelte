<!-- src/lib/components/cta/pricing/cards/FreeCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Check, ArrowRight } from "lucide-svelte";
  import ProductStat from '../ProductStat.svelte';
  import type { Plan } from '$data/pricing/types';
  
  const plan: Plan = {
    id: 'free',
    name: 'Starter',
    description: 'Get started with our free UX writing template',
    price: {
      amount: 0,
      period: 'one-time'
    },
    features: [
      'Basic UX writing template',
      'Sample microcopy patterns',
      'Community support'
    ],
    cta: {
      text: 'Get Free Template',
      variant: 'outline',
      href: 'https://docs.google.com/document/d/xyz'
    }
  };
</script>

<div class="relative p-8 rounded-xl border bg-zinc-950 group
            hover:bg-zinc-950/80 transition-all duration-300">
  <!-- Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 
              rounded-xl pointer-events-none" />
              
  <!-- Content -->
  <div class="relative">
    <!-- Header -->
    <div class="flex items-center justify-between w-full mb-6">
      <h3 class="text-3xl font-semibold">
        {plan.name}
      </h3>

      <ProductStat
        count="1"
        icon="/tools/google-docs.svg"
        iconAlt="Google Docs"
        variant="primary"
        size="sm"
      />
    </div>

    <!-- Price -->
    <div class="flex items-baseline gap-x-2 mb-6">
      <span class="text-5xl font-bold tracking-tight">${plan.price.amount}</span>
      <span class="text-lg text-muted-foreground">/forever</span>
    </div>

    <!-- Description -->
    <p class="text-muted-foreground mb-8">
      {plan.description}
    </p>

    <!-- Features -->
    <div class="mb-8">
      <ul class="space-y-3">
        {#each plan.features as feature}
          <li class="flex items-start gap-x-3 group">
            <Check class="h-5 w-5 text-primary shrink-0" />
            <span class="leading-tight">{feature}</span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- CTA -->
    <Button 
      variant={plan.cta.variant}
      size="lg" 
      class="w-full group border-primary/20 hover:border-primary/40
             bg-transparent hover:bg-primary/5"
      href={plan.cta.href}
    >
      {plan.cta.text}
      <ArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
</div>