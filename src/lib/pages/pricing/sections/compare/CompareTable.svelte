<!-- src/lib/pages/pricing/sections/compare/CompareTable.svelte -->

<script lang="ts">
  import type { Feature } from "../../data/features";
  import { cn } from "$lib/utils";
  
  export let features: Feature[];

  const plans = [
    { id: "lite", name: "Lite", price: "$1" },
    { id: "suite", name: "Suite", price: "$97" },
    { id: "waitlist", name: "Web App", price: "Soon" }
  ];

  function Check(value: boolean) {
    if (value) {
      return "✓";
    }
    return "−";
  }
</script>

<div class="relative">
  <div class="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
  
  <div class="relative overflow-x-auto rounded-xl border border-border/50">
    <table class="w-full text-left">
      <thead>
        <tr class="border-b border-border/50">
          <th class="p-6 text-xl font-light">Features</th>
          {#each plans as plan}
            <th class="p-6 text-center">
              <div class="space-y-1">
                <div class="text-xl font-light">{plan.name}</div>
                <div class="text-2xl font-light tracking-tight">
                  {plan.price}
                </div>
              </div>
            </th>
          {/each}
        </tr>
      </thead>
      
      <tbody class="text-muted-foreground">
        {#each features as feature, i}
          <tr class={cn(
            "border-border/50",
            i !== features.length - 1 && "border-b"
          )}>
            <td class="p-6">
              <div class="space-y-1 max-w-md">
                <div class="text-foreground font-medium">{feature.name}</div>
                <div class="text-sm leading-relaxed">{feature.description}</div>
              </div>
            </td>
            <td class="p-6 text-center">
              <span class={feature.writer ? "text-primary text-lg" : "text-muted-foreground/50"}>
                {Check(feature.writer)}
              </span>
            </td>
            <td class="p-6 text-center">
              <span class={feature.agency ? "text-primary text-lg" : "text-muted-foreground/50"}>
                {Check(feature.agency)}
              </span>
            </td>
            <td class="p-6 text-center">
              <span class={feature.enterprise ? "text-primary text-lg" : "text-muted-foreground/50"}>
                {Check(feature.enterprise)}
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .bg-grid-white {
    background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  }
</style>