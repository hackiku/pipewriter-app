<!-- src/lib/components/cta/pricing/compare/CompareTable.svelte -->
<script lang="ts">
  import type { Feature } from "$data/pricing/comparison";
  import { cn } from "$lib/utils";
  import FeatureTooltip from "./FeatureTooltip.svelte";
  
  export let features: Feature[];

  const plans = [
    { id: "free", name: "Free", price: "$0" },
    { id: "pro", name: "Pro", price: "$57", popular: true },
    { id: "figma", name: "Figma", price: "$15/mo" },
    { id: "manual", name: "Manual", price: "$0" }
  ];

  function getValue(value: boolean | string): string {
    if (typeof value === 'boolean') {
      return value ? "✓" : "−";
    }
    return value;
  }

  function getValueClass(value: boolean | string): string {
    if (typeof value === 'boolean') {
      return value ? "text-primary font-medium" : "text-muted-foreground/40";
    }
    return "text-primary font-medium";
  }
</script>

<div class="relative rounded-xl border border-border/50 overflow-hidden">
  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="border-b border-border/50 bg-muted/50">
        <th class="p-6 text-xl font-medium">Compare</th>
        {#each plans as plan}
          <th class="p-6 text-center relative">
            {#if plan.popular}
              <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                <div class="px-3 py-1 text-xs font-medium bg-primary/10 text-primary
                           rounded-full border border-primary/20">
                  Most Popular
                </div>
              </div>
            {/if}
            <div class="space-y-1">
              <div class="text-lg font-medium">{plan.name}</div>
              <div class="text-2xl font-light tracking-tight text-muted-foreground">
                {plan.price}
              </div>
            </div>
          </th>
        {/each}
      </tr>
    </thead>
    
    <tbody>
      {#each features as feature, i}
        <tr class={cn(
          "border-border/50",
          i !== features.length - 1 && "border-b",
          i % 2 === 0 ? "bg-background" : "bg-muted/30"
        )}>
          <td class="p-6">
            <div class="flex items-center gap-2">
              <span class="font-medium">{feature.name}</span>
              <FeatureTooltip tooltip={feature.tooltip} />
            </div>
          </td>
          <td class="p-6 text-center">
            <span class={getValueClass(feature.free)}>
              {getValue(feature.free)}
            </span>
          </td>
          <td class="p-6 text-center">
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
    </tbody>
  </table>
</div>