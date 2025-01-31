<!-- $lib/components/cta/buy/EarlyAccessButton.svelte -->
<script lang="ts">
  import { ArrowUp } from "lucide-svelte";
  import { ShoppingCart } from "lucide-svelte";
  import { cn } from '$lib/utils';
  import { drawerStore } from '$lib/stores/earlyAccessStore';
  import { slide, fly } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';
  
  export let size: "default" | "lg" = "default";
  export let className = "";
  export let fullWidth = false;
  export let source = "default";
  export let iconOnly = false;
  export let text = "Get Access";
  export let showPrice = false;
  export let price = "$59";
  export let useCart = false;
  
  let isHovered = false;
  let buttonElement: HTMLButtonElement;
  
  const dimensions = size === "lg" ? {
    height: "h-12",
    width: "w-12",
    icon: "w-6 h-6",
    text: "text-lg"
  } : {
    height: "h-10",
    width: "w-10",
    icon: "w-5 h-5",
    text: "text-base"
  };
  
  function handleClick() {
    drawerStore.open(source);
  }
</script>

<button
  bind:this={buttonElement}
  class={cn(
    // Base styles
    "relative inline-flex items-center justify-center",
    "rounded-lg font-medium",
    "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
    
    // Dimensions
    dimensions.height,
    iconOnly ? dimensions.width : "px-4",
    fullWidth && "w-full max-w-md",
    
    // Transitions for container expansion
    "transition-[width,transform,box-shadow] duration-300 ease-out",
    "overflow-visible",
    isHovered && iconOnly && "w-auto px-4",
    
    // Hover effects
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
        <ShoppingCart class={cn("text-white", dimensions.icon)} />
      {:else}
        <img 
          src="/icons/google-drive.svg" 
          alt="Google Drive"
          class={dimensions.icon}
        />
      {/if}
    </div>
    
    <!-- Text content with transition -->
    {#if !iconOnly || isHovered}
      <div 
        class="flex items-center whitespace-nowrap"
      >
        <span class={dimensions.text}>{text}</span>
        
        {#if showPrice}
          <span class="ml-3 text-white/50 font-normal">{price}</span>
        {/if}
      </div>
    {/if}

    <!-- Arrow with fly animation -->
    {#if isHovered}
      <div 
        in:fly|local={{y: 20, duration: 200, delay: 100}}
        out:fly|local={{y: 20, duration: 200}}
        class="flex items-center"
      >
        <ArrowUp 
          class={cn(
            "w-4 h-4 transition-transform duration-300",
            "translate-y-0.5",
            isHovered && "-translate-y-0.5"
          )}
        />
      </div>
    {/if}
  </div>

  <!-- Glow effect -->
  <div
    class={cn(
      "absolute inset-0 -z-10",
      "rounded-lg opacity-0 transition-opacity duration-300",
      "bg-gradient-to-r from-[#3644FE]/30 to-[#B345ED]/30",
      "blur-xl",
      isHovered && "opacity-100"
    )}
  />
</button>