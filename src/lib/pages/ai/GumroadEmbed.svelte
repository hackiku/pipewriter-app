<!-- src/lib/pages/ai/GumroadEmbed.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ShoppingCart } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  
  let isVisible = false;
  let isSticky = false;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        isVisible = true;
        isSticky = !e.isIntersecting;
      },
      { threshold: [0.1] }  // Trigger when even a small part is visible
    );
    
    // Small delay to ensure proper mounting
    setTimeout(() => {
      const target = document.querySelector('#sticky-trigger');
      if (target) observer.observe(target);
    }, 0);
    
    return () => observer.disconnect();
  });
</script>

<div class="relative">
  <!-- Sticky banner -->
  <section 
    class={cn(
      "w-full transition-all duration-300 border-t opacity-0 -translate-y-4",
      isVisible && "opacity-100 translate-y-0",
      isSticky ? 
        "fixed top-0 left-0 w-full shadow-lg bg-background/80 backdrop-blur-sm z-[100]" : 
        "bg-muted/30 dark:bg-muted/10 relative"
    )}
    style="background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0);
           background-size: 24px 24px;"
  >
    <div class={cn("container", isSticky ? "py-6" : "py-12")}>
      <div class="max-w-4xl mx-auto">
        <div class={cn("flex justify-between", isSticky ? "items-center" : "items-end")}>
          <div>
            <h2 class={cn("font-bold mb-2", isSticky ? "text-2xl" : "text-4xl md:text-5xl")}>
              Get Started Today
            </h2>
            <p class={cn("text-muted-foreground", isSticky ? "text-base" : "text-xl")}>
              Join the first wave of writer-first wireframers
            </p>
          </div>
          
          <div class="flex flex-col items-end gap-4">
            <button class="group relative inline-flex items-center gap-4 bg-[#FF90E8] hover:bg-[#FF90E8]/90 
                           text-black font-medium px-6 py-3 text-lg transition-all
                           rounded border-2 border-black dark:border-white
                           translate-x-[3px] translate-y-[3px]
                           hover:translate-x-[4px] hover:translate-y-[4px]">
              <div class="absolute inset-0 bg-black dark:bg-white -z-10
                          translate-x-[3px] translate-y-[3px]
                          group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />
              
              <ShoppingCart class="w-5 h-5" />
              <span class="border-l-2 border-black/20 dark:border-white/20 pl-4">
                Add to Cart
              </span>
              <span class="opacity-50">— $59</span>
            </button>
            
            <p class="text-base text-muted-foreground">
              Beta Launch Special — One-Time Price
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Trigger element just above the embed -->
  <div id="sticky-trigger" class="h-1" />

  <!-- Gumroad embed -->
  <div class="container py-24">
    <div class="max-w-4xl mx-auto">
      <div class="bg-background rounded-xl border shadow-lg p-8">
        <script src="https://gumroad.com/js/gumroad-embed.js"></script>
        <div class="gumroad-product-embed">
          <a href="https://pipewriter.gumroad.com/l/wires-for-writers">Loading...</a>
        </div>
      </div>
    </div>
  </div>
</div>