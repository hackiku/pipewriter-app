<!-- content/plans/PlanCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import type { Plan } from "../../data/plans";
  
  export let plan: Plan;
  export let isAnnual = true;

  $: price = isAnnual ? plan.price.annual : plan.price.monthly;
  $: period = isAnnual ? "/year" : "/month";
</script>

<div class="relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
  {#if plan.badge}
    <div class="absolute -top-3 left-1/2 -translate-x-1/2">
      <span class="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
        {plan.badge}
      </span>
    </div>
  {/if}

  <div class="space-y-4">
    <div class="space-y-2">
      <h3 class="text-2xl font-medium">{plan.name}</h3>
      <p class="text-zinc-400">{plan.description}</p>
    </div>

    <div class="flex items-baseline gap-x-2">
      {#if price !== null}
        <span class="text-4xl font-light">${price}</span>
        <span class="text-zinc-400">{period}</span>
      {:else}
        <span class="text-4xl font-light">Custom</span>
      {/if}
    </div>

    <div class="pt-4 space-y-2">
      {#each plan.features as feature}
        <div class="flex items-start gap-x-2">
          <div class="w-5 h-5 text-primary">✓</div>
          <span>{feature}</span>
        </div>
      {/each}
    </div>

    <Button variant="default" size="lg" class="w-full mt-6">
      {plan.cta}
    </Button>
  </div>
</div>