<!-- src/lib/components/cta/buy/BuyButton.svelte -->
<script lang="ts">
  import { ShoppingCart } from "lucide-svelte";
  import { cn } from '$lib/utils';
  import { buyStore } from '$lib/stores/buyStore';
  
  export let size: "xs" | "sm" | "default" | "lg" = "default";
  export let className = "";
  export let fullWidth = false;
  export let iconOnly = false;
  export let text = "Get Access";
  export let showPrice = false;
  export let price = "$89";
  export let source = "default";
  export let useCart = false;
  
  const dimensions = {
    xs: {
      height: "h-8",
      width: "w-8",
      icon: "w-3.5 h-3.5",
      text: "text-xs"
    },
    sm: {
      height: "h-9",
      width: "w-9",
      icon: "w-4 h-4",
      text: "text-sm"
    },
    default: {
      height: "h-10",
      width: "w-10",
      icon: "w-5 h-5",
      text: "text-base"
    },
    lg: {
      height: "h-12",
      width: "w-12",
      icon: "w-6 h-6",
      text: "text-lg"
    }
  };
  
  function handleClick() {
    buyStore.openDrawer(source);
  }
</script>

<button
  class={cn(
    "relative inline-flex items-center justify-center",
    iconOnly ? "rounded-full" : "rounded-full",
    "font-medium",
    "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
    dimensions[size].height,
    iconOnly ? dimensions[size].width : "pl-3.5 pr-6",
    fullWidth && "w-full max-w-md",
    "transition-all duration-300 ease-out active:scale-95",
    "hover:shadow-lg hover:shadow-[#3644FE]/20 dark:hover:shadow-[#B345ED]/20",
    "overflow-hidden isolate",
    className
  )}
  on:click|preventDefault|stopPropagation={handleClick}
  data-buy-button
>
  <!-- Background glow on hover -->
  <div 
    class="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300
           bg-gradient-to-r from-[#3644FE]/20 to-[#B345ED]/20 -z-10" 
  />

  <!-- Content wrapper -->
  <div class="relative flex items-center justify-center text-white gap-3">
    <!-- Icon -->
    <div class="flex items-center justify-center {iconOnly ? 'w-full' : ''}">
      {#if useCart}
        <ShoppingCart class={cn("text-white", dimensions[size].icon)} />
      {:else}
        <img 
          src="/icons/google-drive.svg" 
          alt="Google Drive"
          class={dimensions[size].icon}
        />
      {/if}
    </div>
    
    <!-- Text content -->
    {#if !iconOnly}
      <div class="flex items-center whitespace-nowrap">
        <span class={dimensions[size].text}>{text}</span>
        
        {#if showPrice}
          <span class="ml-3 text-white/50 font-normal">{price}</span>
        {/if}
      </div>
    {/if}
  </div>
</button>