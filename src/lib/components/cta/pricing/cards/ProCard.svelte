<!-- src/lib/components/cta/pricing/cards/ProCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Check, ArrowRight, Star } from "lucide-svelte";
  import ProductStat from '../ProductStat.svelte';
  
  export let className = '';
  
  const features = [
    '80+ UX Copy Components & Patterns',
    'AI Component Generator',
    'Automatic HTML & CSS Export',
    'Premium Support & Updates',
    'Private Discord Community',
    'Commercial License'
  ];
</script>

<div class="relative p-8 rounded-xl border border-primary/20 
            bg-zinc-950 hover:bg-zinc-950/90
            transition-all duration-300 {className}">
  <!-- Badge -->
  <div class="absolute -top-3 left-1/2 -translate-x-1/2">
    <div class="px-3 py-1 text-sm font-medium
                bg-primary text-primary-foreground
                rounded-full shadow-sm">
      Most Popular
    </div>
  </div>
  
  <div class="relative space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h3 class="text-3xl font-semibold">Pro Suite</h3>
      <div class="flex gap-3">
        <ProductStat
          count="80"
          icon="/tools/gdocs.svg"
          iconAlt="Google Docs"
          variant="primary"
          size="sm"
        />
        <ProductStat
          count="8"
          icon="/tools/appsscript.svg"
          iconAlt="Apps Script"
          variant="primary"
          size="sm"
        />
      </div>
    </div>

    <!-- Price -->
    <div class="flex items-baseline gap-x-2">
      <span class="text-5xl font-bold tracking-tight">$57</span>
      <span class="text-lg text-muted-foreground">/one-time</span>
      <span class="ml-3 text-sm line-through text-muted-foreground">$97</span>
      <span class="ml-2 text-sm text-primary font-medium">Save 40%</span>
    </div>

    <!-- Features -->
    <div>
      <ul class="space-y-3">
        {#each features as feature}
          <li class="flex items-start gap-x-3 group">
            <Check class="h-5 w-5 text-primary shrink-0 
                         group-hover:scale-110 transition-transform" />
            <span class="leading-tight">{feature}</span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- CTA -->
    <Button 
      variant="default"
      size="lg" 
      class="w-full group bg-primary hover:bg-primary/90"
    >
      Get Pro Access
      <ArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
</div>

