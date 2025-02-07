<!-- src/lib/pages/landing/sections/pricing/Pricing.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ChevronDown, FileText } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import PricingGrid from "$lib/components/cta/pricing/PricingGrid.svelte";
  import CompareTable from "$lib/components/cta/pricing/compare/CompareTable.svelte";
  import { features } from '$data/pricing/comparison';
  
  let showComparison = false;

  // Show first 3 rows by default for optimal conversion
  $: visibleFeatures = showComparison ? features : features.slice(0, 3);
</script>

<div class="space-y-16">
  <!-- Main Pricing Grid -->
  <div class="container max-w-4xl">
    <PricingGrid />

    <!-- Trust Signals -->
    <div class="mt-16 text-center">
      <p class="text-sm text-muted-foreground mb-4">
        🔒 Secured by Gumroad • 30-day satisfaction guarantee
      </p>
      <div class="flex items-center justify-center gap-8">
        <img src="/logos/stripe.svg" alt="Stripe" class="h-6 opacity-50" />
        <img src="/logos/visa.svg" alt="Visa" class="h-6 opacity-50" />
        <img src="/logos/mastercard.svg" alt="Mastercard" class="h-6 opacity-50" />
      </div>
    </div>
  </div>

  <!-- Feature Comparison -->
  <div class="relative">
    <!-- Comparison Header -->
    <div class="text-center mb-12">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
                  bg-primary/10 text-primary border border-primary/20 mb-6">
        <FileText class="w-4 h-4" />
        <span class="text-sm font-medium">Feature Comparison</span>
      </div>
      <h2 class="text-[5vh] md:text-[6vh] lg:text-[7vh] 
                font-medium leading-[1.1] tracking-tight
                max-w-[16ch] mx-auto">
        Compare Features
      </h2>
    </div>

    <!-- Comparison Table -->
    <div class="relative">
      <div class="-mx-4 sm:-mx-6 md:-mx-12 lg:-mx-16 xl:-mx-24 2xl:-mx-32 
                  overflow-x-auto scrollbar-thin scrollbar-thumb-border">
        <div class="min-w-[800px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <CompareTable features={visibleFeatures} />
        </div>
      </div>

      <!-- Gradient Overlay & Show More -->
      {#if !showComparison}
        <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent">
          <div class="absolute left-1/2 -translate-x-1/2 bottom-0">
            <Button 
              variant="ghost" 
              size="lg"
              class="gap-2 hover:bg-transparent"
              on:click={() => showComparison = true}
            >
              <span>Compare all features</span>
              <ChevronDown class="transition-transform" />
            </Button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Custom scrollbar styling */
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  .scrollbar-thumb-border::-webkit-scrollbar {
    height: 6px;
  }
  .scrollbar-thumb-border::-webkit-scrollbar-track {
    background: transparent;
  }
  .scrollbar-thumb-border::-webkit-scrollbar-thumb {
    background-color: var(--border);
    border-radius: 3px;
  }
</style>