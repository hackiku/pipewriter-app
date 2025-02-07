<!-- src/lib/components/cta/pricing/compare/CompareTable.svelte -->
<script lang="ts">
  import type { FeatureCategory } from "$data/pricing/comparison";
  import { featureCategories, PLANS } from "$data/pricing/comparison";
  import { cn } from "$lib/utils";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Button } from "$lib/components/ui/button";
  
  export let categories: FeatureCategory[] = featureCategories;
  export let showAll = false;

  function getValue(value: boolean | string): string {
    if (typeof value === 'boolean') {
      return value ? "✓" : "−";
    }
    return value;
  }

  function getValueClass(value: boolean | string): string {
    if (typeof value === 'boolean') {
      return cn(
        "font-medium",
        value ? "text-primary" : "text-muted-foreground/40"
      );
    }
    return "text-primary font-medium";
  }
</script>

<div class="relative rounded-xl overflow-hidden">
  <table class="w-full text-left border-collapse divide-y divide-border/50">
    <thead class="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <!-- Plans Row -->
      <tr class="border-b border-border/50">
        <th class="w-[30%] p-6" /> <!-- Empty corner cell -->
        {#each PLANS as plan}
          <th class="p-6 text-center relative w-[17.5%]">
            {#if plan.popular}
              <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                <div class="px-3 py-1 text-xs font-medium bg-primary/10 text-primary
                           rounded-full border border-primary/20">
                  Most Popular
                </div>
              </div>
            {/if}
            <div class="space-y-4">
              <div class="text-lg font-medium">{plan.name}</div>
              <div class="text-2xl font-medium tracking-tight">
                {plan.price}
              </div>
              {#if !plan.disabled}
                <Button 
                  variant={plan.popular ? "default" : "outline"}
                  size="sm"
                  class="w-full"
                  href={plan.id === 'pro' ? '/early' : undefined}
                  on:click={() => {
                    if (plan.id === 'free') {
                      // Trigger free modal
                    }
                  }}
                >
                  {plan.actionText}
                </Button>
              {/if}
            </div>
          </th>
        {/each}
      </tr>
    </thead>
    
    <tbody class="divide-y divide-border/30">
      {#each categories as category}
        <!-- Category Header -->
        <tr class="bg-muted/30">
          <td colspan="5" class="p-4 text-sm font-medium text-muted-foreground">
            {category.name}
          </td>
        </tr>
        
        <!-- Features -->
        {#each category.features as feature}
          <tr class="group hover:bg-muted/30 transition-colors">
            <td class="p-6">
              <Tooltip.Root>
                <Tooltip.Trigger>
                  <span class="border-dotted border-b border-muted-foreground cursor-help">
                    {feature.name}
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Content class="max-w-xs" side="top">
                  {feature.tooltip}
                </Tooltip.Content>
              </Tooltip.Root>
            </td>
            
            <td class="p-6 text-center">
              <span class={getValueClass(feature.free)}>
                {getValue(feature.free)}
              </span>
            </td>
            <td class="p-6 text-center bg-primary/[0.02]">
              <span class={getValueClass(feature.pro)}>
                {getValue(feature.pro)}
              </span>
            </td>
            <td class="p-6 text-center">
              <span class={getValueClass(feature.figma)}>
                {getValue(feature.figma)}
              </span>
            </td>
            <td class="p-6 text-center">
              <span class={getValueClass(feature.manual)}>
                {getValue(feature.manual)}
              </span>
            </td>
          </tr>
        {/each}
      {/each}
    </tbody>
  </table>
</div>

<style>
  /* Add smooth transitions */
  tr {
    transition: background-color 0.2s ease;
  }
  
  /* Ensure sticky header works properly */
  thead {
    position: sticky;
    top: 0;
    z-index: 10;
  }
</style>