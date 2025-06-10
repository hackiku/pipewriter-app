<!-- src/lib/pages/pricing/sections/compare/CompareTable.svelte -->
<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Check, X, Info } from "lucide-svelte";
  import { featureCategories } from "../../data/features";
  
  const plans = [
    { id: "free", name: "Free", highlight: false },
    { id: "pro", name: "Pro", highlight: true },
    { id: "bundle", name: "Bundle", highlight: false }
  ];

  function getFeatureValue(feature: any, planId: string): boolean {
    switch(planId) {
      case 'free': return feature.free;
      case 'pro': return feature.pro;
      case 'bundle': return feature.bundle;
      default: return false;
    }
  }
</script>

<div class="container mx-auto">
  
  <!-- Comparison Table -->
  <div class="max-w-6xl mx-auto">
    <div class="overflow-x-auto">
      <table class="w-full">
        
        <!-- Header Row -->
        <thead>
          <tr class="border-b border-border/50">
            <th class="text-left py-6 px-4 w-2/5">
              <span class="text-lg font-medium text-muted-foreground">Features</span>
            </th>
            {#each plans as plan}
              <th class="text-center py-6 px-4">
                <div class="space-y-2">
                  <div class="text-xl font-semibold
                              {plan.highlight ? 'text-primary' : 'text-foreground'}">
                    {plan.name}
                  </div>
                  {#if plan.highlight}
                    <div class="inline-flex px-2 py-1 text-xs font-medium rounded-full
                                bg-primary/10 text-primary">
                      Most Popular
                    </div>
                  {/if}
                </div>
              </th>
            {/each}
          </tr>
        </thead>

        <!-- Feature Categories -->
        <tbody>
          {#each featureCategories as category, categoryIndex}
            
            <!-- Category Header -->
            <tr class="bg-muted/20">
              <td colspan="4" class="py-4 px-4">
                <h3 class="font-semibold text-lg">{category.name}</h3>
              </td>
            </tr>
            
            <!-- Category Features -->
            {#each category.features as feature, featureIndex}
              <tr class="border-b border-border/20 hover:bg-muted/10 transition-colors">
                
                <!-- Feature Name with Tooltip -->
                <td class="py-4 px-4">
                  <Tooltip.Root>
                    <Tooltip.Trigger class="text-left">
                      <span class="font-medium border-b border-dotted border-muted-foreground/50 
                                   hover:border-primary cursor-help transition-colors">
                        {feature.name}
                      </span>
                    </Tooltip.Trigger>
                    <Tooltip.Content side="right" class="max-w-xs">
                      <p class="text-sm">{feature.description}</p>
                    </Tooltip.Content>
                  </Tooltip.Root>
                </td>
                
                <!-- Plan Support Indicators -->
                {#each plans as plan}
                  <td class="py-4 px-4 text-center">
                    {#if getFeatureValue(feature, plan.id)}
                      <div class="inline-flex items-center justify-center w-6 h-6 
                                  rounded-full bg-green-100 dark:bg-green-900/30">
                        <Check class="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                    {:else}
                      <div class="inline-flex items-center justify-center w-6 h-6 
                                  rounded-full bg-muted">
                        <X class="w-4 h-4 text-muted-foreground/50" />
                      </div>
                    {/if}
                  </td>
                {/each}
                
              </tr>
            {/each}
            
            <!-- Spacer between categories -->
            {#if categoryIndex < featureCategories.length - 1}
              <tr>
                <td colspan="4" class="py-2"></td>
              </tr>
            {/if}
            
          {/each}
        </tbody>
        
      </table>
    </div>

    <!-- Bottom Actions -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t border-border/50">
      <a href="https://workspace.google.com/marketplace/app/pipewriter/123456789"
         class="inline-flex items-center justify-center px-8 py-3 rounded-lg border
                hover:bg-muted transition-colors text-center">
        Start Free
      </a>
      <a href="https://workspace.google.com/marketplace/app/pipewriter/123456789"
         class="inline-flex items-center justify-center px-8 py-3 rounded-lg
                bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white
                hover:shadow-lg transition-all text-center font-medium">
        Start 14-Day Trial
      </a>
      <a href="/early"
         class="inline-flex items-center justify-center px-8 py-3 rounded-lg border
                hover:bg-muted transition-colors text-center">
        Get Bundle
      </a>
    </div>
    
  </div>
</div>