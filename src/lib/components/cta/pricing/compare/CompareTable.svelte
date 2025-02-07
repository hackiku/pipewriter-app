<!-- src/lib/components/cta/pricing/compare/CompareTable.svelte -->
<script lang="ts">
  import type { FeatureCategory, Plan } from "$data/pricing/comparison";
  import { featureCategories, PLANS } from "$data/pricing/comparison";
  import { cn } from "$lib/utils";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Button } from "$lib/components/ui/button";
  import { ChevronDown, ChevronUp } from "lucide-svelte";
  
  export let categories: FeatureCategory[] = featureCategories;
  export let showAll = false;
  export let onToggleShowAll: () => void;

  // Sticky header control
  let tableContainer: HTMLElement;
  let tableHeader: HTMLElement;
  let isHeaderSticky = false;

  function updateHeaderSticky() {
    if (!tableContainer || !tableHeader) return;
    
    const containerRect = tableContainer.getBoundingClientRect();
    const headerRect = tableHeader.getBoundingClientRect();
    const containerBottom = containerRect.bottom;
    
    // Make header sticky until we reach table bottom
    isHeaderSticky = containerBottom > window.innerHeight;
  }

  // Value display helpers
  function getDisplayValue(value: string): string {
    if (value === "✓") return "✓";
    if (value === "✗") return "×";
    return value;
  }

  function getValueClass(value: string): string {
    return cn(
      "text-sm transition-colors font-medium",
      value === "✓" ? "text-primary" : 
      value === "✗" ? "text-muted-foreground/40" :
      "text-primary/90"
    );
  }
</script>

<svelte:window on:scroll={updateHeaderSticky} />

<div 
  class="relative rounded-xl overflow-hidden"
  bind:this={tableContainer}
>
  <div class="overflow-x-auto scrollbar-none">
    <table class="w-full text-left border-collapse divide-y divide-border/50">
      <thead 
        bind:this={tableHeader}
        class="transition-all duration-200"
        class:sticky-header={isHeaderSticky}
      >
        <!-- Plans Row -->
        <tr class="border-b border-border/50">
          <th class="w-[30%] p-4" />
          {#each PLANS as plan}
            <th class="p-4 text-center relative w-[17.5%]">
              {#if plan.popular}
                <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div class="px-3 py-1 text-xs font-medium bg-primary/10 text-primary
                             rounded-full border border-primary/20">
                    Most Popular
                  </div>
                </div>
              {/if}
              <div class="space-y-3">
                <div class="text-base font-medium">{plan.name}</div>
                <div class="text-xl font-medium tracking-tight">
                  {plan.price}
                </div>
                {#if plan.highlight}
                  <div class="text-xs text-primary/80">{plan.highlight}</div>
                {/if}
                {#if !plan.disabled && plan.actionText}
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
          <tr class="bg-muted/5">
            <td colspan={PLANS.length + 1} class="p-3 text-sm font-medium text-muted-foreground">
              {category.name}
            </td>
          </tr>
          
          <!-- Features -->
          {#each category.features as feature}
            <tr class="group hover:bg-muted/10 transition-colors">
              <td class="p-4">
                <Tooltip.Root>
                  <Tooltip.Trigger class="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <span class="border-dotted border-b border-muted-foreground/30 cursor-help">
                      {feature.name}
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Content 
                    class="max-w-xs"
                    side="top"
                    sideOffset={5}
                  >
                    {feature.tooltip}
                  </Tooltip.Content>
                </Tooltip.Root>
              </td>
              
              {#each feature.plans as value, i}
                <td class="p-4 text-center bg-opacity-10" class:bg-muted-foreground={PLANS[i].popular}>
                  <span class={getValueClass(value)}>
                    {getDisplayValue(value)}
                  </span>
                </td>
              {/each}
            </tr>
          {/each}
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Show More/Less Button -->
  <!-- <div class="mt-8 text-center">
    <Button 
      variant="ghost"
      on:click={onToggleShowAll}
      class="gap-2"
    >
      <span>Show {showAll ? 'less' : 'more'} features</span>
      <svelte:component this={showAll ? ChevronUp : ChevronDown} class="w-4 h-4" />
    </Button>
  </div> -->
</div>

<style>
  /* Hide scrollbar but keep functionality */
  .scrollbar-none {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }

  /* Sticky header styling */
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgb(var(--background));
    backdrop-filter: blur(8px);
  }
  
  /* Ensure proper sticky positioning */
  :global(.supports-[backdrop-filter]:sticky-header) {
    background: rgb(var(--background) / 0.9);
  }
</style>