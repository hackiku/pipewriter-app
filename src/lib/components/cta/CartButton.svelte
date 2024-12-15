<!-- lib/components/cta/CartButton.svelte -->
<script lang="ts">
  import { ShoppingCart, ArrowRight } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  
  export let price = "$59";
  export let text = "Add to Cart";
  export let href = "https://app.gumroad.com/checkout?product=qmifdo&quantity=1";
  export let className = "";
  export let size: "default" | "lg" = "default";
  export let showIcon = true;
  export let showPrice = true;
</script>

<a 
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class={cn(
    // Base styles
    "relative group overflow-hidden",
    "inline-flex items-center gap-3",
    "font-medium rounded-lg",
    "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
    // Sizing
    size === "lg" ? "h-12 text-lg px-8" : "h-10 text-base px-6",
    // Shadow & hover effects
    "shadow-[4px_4px_0px_0px_rgba(54,68,254,0.7)]",
    "hover:shadow-none",
    "hover:translate-x-[4px] hover:translate-y-[4px]",
    "hover:ring-2 hover:ring-[#B345ED]/30",
    "dark:shadow-[4px_4px_0px_0px_rgba(179,69,237,0.3)]",
    "dark:hover:ring-[#3644FE]/50",
    // Transition
    "transition-all duration-200",
    className
  )}>
  <!-- Background gradient animation -->
  <span 
    class="absolute inset-0 bg-gradient-to-r from-[#B345ED] to-[#3644FE] 
           opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  />
  
  <!-- Content -->
  <div class="relative z-10 flex items-center justify-center text-white w-full">
    <div class="flex items-center gap-2">
      {#if showIcon}
        <ShoppingCart class="w-4 h-4" />
      {/if}
      <span>{text}</span>
      
      {#if showPrice}
        <!-- Price/Arrow Switch -->
        <div class="relative">
          <span class="inline-flex transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2 opacity-40">
            — {price}
          </span>
          <ArrowRight 
            class="absolute right-0 top-0 w-4 h-4 
                   transition-all duration-300
                   translate-y-2 translate-x-2 opacity-0
                   group-hover:translate-y-[4px] group-hover:translate-x-[4px] group-hover:opacity-100" 
          />
        </div>
      {/if}
    </div>
  </div>
</a>