<!-- src/lib/pages/ai/PricingBar.svelte -->
<script lang="ts">
  import { ShoppingCart, ExternalLink } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  
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
          <a 
            href="https://app.gumroad.com/checkout?product=qmifdo&quantity=1"
            target="_blank"
            rel="noopener noreferrer"
            class="relative inline-flex items-center gap-3 bg-[#FF90E8] hover:bg-[#FF90E8]/80 
                   text-black font-medium px-4 py-2 text-base
                   rounded-lg border-2 border-black
                   transition-all duration-200
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                   hover:translate-x-[2px] hover:translate-y-[2px]
                   active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
            <ShoppingCart class="w-4 h-4" />
            Add to Cart<span class="opacity-40">— $59</span>
						
          </a>
          
          <a 
            href="https://pipewriter.gumroad.com/l/wires-for-writers"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center w-10 h-10 bg-white 
                   rounded-lg border border-black
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                   hover:translate-x-[2px] hover:translate-y-[2px]
                   active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                   transition-all duration-200">
            <ExternalLink class="w-4 h-4 dark:text-black ml-1 mb-0.5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</section>