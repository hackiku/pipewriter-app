
<!-- src/lib/pages/ai/PricingBar.svelte -->
<script lang="ts">
  import { ShoppingCart } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  
  export let isSticky = false;
</script>

<section 
  class={cn(
    "w-full bg-background transition-all duration-300 border-t",
    isSticky && "fixed top-0 left-0 shadow-lg bg-background/80 backdrop-blur-sm z-50"
  )}
  style="background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0);
         background-size: 24px 24px;"
>
  <div class="container py-3 md:py-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between sm:items-center text-center sm:text-left gap-6 sm:gap-0">
        <div>
          <h2 class="text-2xl font-bold mb-2s">
            Get Started Today
          </h2>
          <p class="text-muted-foreground hidden sm:block">
            Join the first wave of writer-first wireframers
          </p>
        </div>
        
        <div class="flex flex-col items-center sm:items-end gap-4">
          <a 
            href="https://app.gumroad.com/checkout?product=qmifdo&quantity=1"
            target="_blank"
            rel="noopener noreferrer"
            class="relative inline-flex items-center gap-4 bg-[#FF90E8] hover:bg-[#FF90E8]/80 
                   text-black font-medium px-4 sm:px-6 py-3 text-base sm:text-lg
                   rounded border-2 border-black w-fit
                   transition-all duration-200
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                   hover:translate-x-[2px] hover:translate-y-[2px]
                   active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
            <ShoppingCart class="w-5 h-5" />
            <span class="border-l-2 border-black/20 pl-4">
              Add to Cart
            </span>
            <span class="opacity-50">— $59</span>
          </a>
          
          <p class="text-base text-muted-foreground text-center sm:text-right">
            Early Access Special -
						<a href="https://pipewriter.gumroad.com/l/wires-for-writers" target="_blank" class="text-black dark:text-white font-semibold hover:underline">Explore →</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>