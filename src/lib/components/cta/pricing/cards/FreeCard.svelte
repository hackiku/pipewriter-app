<!-- src/lib/components/cta/pricing/cards/FreeCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Check, ArrowRight } from "lucide-svelte";
  import ProductStat from '../ProductStat.svelte';
  
  export let className = '';
  
  const features = [
    'Basic UX writing template',
    'Community support',
    'Sample microcopy patterns',
    'Access to tutorial videos'
  ];
</script>

<div class="relative p-8 rounded-xl border bg-card hover:bg-card/80 
            transition-all duration-300 {className}">
  <div class="relative space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h3 class="text-3xl font-semibold">Free Template</h3>
      <ProductStat
        count="1"
        icon="/tools/gdocs.svg"
        iconAlt="Google Docs"
        variant="muted"
        size="sm"
      />
    </div>

    <!-- Price -->
    <div class="flex items-baseline gap-x-2">
      <span class="text-5xl font-bold tracking-tight">$0</span>
      <span class="text-lg text-muted-foreground">/forever</span>
    </div>

    <!-- Features -->
    <div>
      <ul class="space-y-3">
        {#each features as feature}
          <li class="flex items-start gap-x-3">
            <Check class="h-5 w-5 text-muted-foreground shrink-0" />
            <span class="text-muted-foreground">{feature}</span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- CTA -->
    <Button 
      variant="outline" 
      size="lg" 
      class="w-full group"
      href="https://docs.google.com/document/d/xyz"
    >
      Get Free Template
      <ArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
</div>

