<!-- src/lib/components/cta/PricingBar.svelte -->
<script lang="ts">
  import { cn } from '$lib/utils';
  import GumroadCartButton from './GumroadCartButton.svelte';
  import GumroadExternalButton from './GumroadExternalButton.svelte';
  
  export let isSticky = false;
</script>

<section 
  class={cn(
    "w-full bg-background transition-all duration-300 border-t",
    isSticky && "fixed top-0 left-0 shadow-lg bg-background/80 backdrop-blur-sm z-50"
  )}
>
  <div class="container py-5">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 class="text-2xl font-semibold">
          Lifetime Early Access
        </h2>
        
        <div class="flex items-center gap-3">
          <GumroadCartButton text="Add to Cart" price="$59" />
          <GumroadExternalButton />
        </div>
      </div>
    </div>
  </div>
</section>