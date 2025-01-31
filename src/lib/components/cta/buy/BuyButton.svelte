<!-- src/lib/components/cta/buy/BuyButton.svelte -->
<script lang="ts">
  import { ArrowUp, ShoppingCart } from "lucide-svelte";
  import { cn } from '$lib/utils';
  import { buyStore } from '$lib/stores/buyStore';
  import { fly } from 'svelte/transition';
  
  export let size: "xs" | "sm" | "default" | "lg" = "default";
  export let className = "";
  export let fullWidth = false;
  export let iconOnly = false;
  export let text = "Get Access";
  export let showPrice = false;
  export let price = "$89";
  export let source = "default";
  export let useCart = false;
  
  let isHovered = false;
  
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
    "rounded-lg font-medium",
    "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
    dimensions[size].height,
    iconOnly ? dimensions[size].width : "px-4",
    fullWidth && "w-full max-w-md",
    "transition-all duration-300 ease-out",
    "overflow-visible",
    isHovered && iconOnly && "w-auto px-4",
    "hover:ring-4 hover:ring-[#3644FE]/20 dark:hover:ring-[#B345ED]/20",
    className
  )}
  on:click|preventDefault|stopPropagation={handleClick}
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
>
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
    {#if !iconOnly || isHovered}
      <div class="flex items-center whitespace-nowrap">
        <span class={dimensions[size].text}>{text}</span>
        
        {#if showPrice}
          <span class="ml-3 text-white/50 font-normal">{price}</span>
        {/if}
      </div>
    {/if}

    <!-- Arrow animation -->
    {#if isHovered}
      <div 
        in:fly|local={{y: 20, duration: 200, delay: 100}}
        out:fly|local={{y: 20, duration: 200}}
      >
        <ArrowUp 
          class={cn(
            dimensions[size].icon,
            "transition-transform duration-300 -translate-y-0.5"
          )}
        />
      </div>
    {/if}
  </div>

  <!-- Hover glow -->
  {#if isHovered}
    <div 
      class="absolute inset-0 -z-10 rounded-lg 
             bg-gradient-to-r from-[#3644FE]/30 to-[#B345ED]/30 
             blur-xl"
    />
  {/if}
</button>