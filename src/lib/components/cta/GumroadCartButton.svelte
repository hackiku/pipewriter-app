<!-- lib/components/cta/GumroadCartButton.svelte -->
<script lang="ts">
  import { ShoppingCart } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  
  export let price = "$59";
  export let text = "Add to Cart";
  export let href = "https://app.gumroad.com/checkout?product=qmifdo&quantity=1";
  export let className = "";
</script>

<a 
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class={cn(
    "relative inline-flex items-center gap-3",
    "bg-[#FF90E8] hover:bg-[#FF90E8]/80 text-black font-medium",
    "px-4 py-2 text-base rounded-lg border-2 border-black",
    "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    "hover:translate-x-[2px] hover:translate-y-[2px]",
    "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
    "transition-all duration-200",
    className
  )}>
  <ShoppingCart class="w-4 h-4" />
  {text}<span class="opacity-40">— {price}</span>
</a>