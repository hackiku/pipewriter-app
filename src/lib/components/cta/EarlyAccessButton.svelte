<!-- $lib/components/cta/EarlyAccessButton.svelte -->
<script lang="ts">
  import { ArrowUp } from "lucide-svelte";
  import { cn } from '$lib/utils';
  import { drawerStore } from '$lib/stores/earlyAccessStore';
  
  export let size: "default" | "lg" = "default";
  export let className = "";
  export let fullWidth = false;
  export let source = "default";
  export let iconOnly = false;
  export let text = "Get Bundle";
  export let showPrice = false;
  export let price = "$59";
  
  const baseHeight = size === "lg" ? "h-12" : "h-10";
  const baseWidth = size === "lg" ? "w-12" : "w-10";
  const baseIconSize = size === "lg" ? "w-6 h-6" : "w-5 h-5";
  const baseFontSize = size === "lg" ? "text-lg" : "text-base";
  
  function handleClick() {
    drawerStore.open(source);
  }
</script>

<button
  class={cn(
    "relative group overflow-hidden",
    "inline-flex items-center justify-center",
    "font-medium rounded-lg",
    "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
    baseHeight,
    iconOnly ? baseWidth : "px-4",
    fullWidth ? "w-full max-w-md" : "w-auto",
    "shadow-[4px_4px_0px_0px_rgba(54,68,254,0.7)]",
    "hover:shadow-none",
    "hover:translate-x-[4px] hover:translate-y-[4px]",
    "hover:ring-2 hover:ring-[#B345ED]/30",
    "dark:shadow-[4px_4px_0px_0px_rgba(179,69,237,0.3)]",
    "dark:hover:ring-[#3644FE]/50",
    "transition-all duration-200",
    className
  )}
  on:click|preventDefault|stopPropagation={handleClick}
>
  <!-- Background gradient animation -->
  <span 
    class="absolute inset-0 bg-gradient-to-r from-[#B345ED] to-[#3644FE] 
           opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  />
  
  <!-- Content -->
  <div class="relative z-10 flex items-center justify-center text-white w-full">
    {#if iconOnly}
      <div class="relative z-10 flex items-center justify-center text-white w-full">
        <img 
          src="/icons/google-drive.svg" 
          alt="Google Drive"
          class="{baseIconSize} transition-transform duration-300"
        />
        <div class="flex items-center gap-2 w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 whitespace-nowrap overflow-hidden transition-all duration-300">
          <span class="{baseFontSize}">{text}</span>
          {#if showPrice}
            <span class="text-white/40">— {price}</span>
          {/if}
          <ArrowUp class="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </div>
      </div>
    {:else}
      <div class="flex items-center justify-center gap-2">
        <img src="/icons/google-drive.svg" alt="Google Drive" class={baseIconSize} />
        <span class="whitespace-nowrap {baseFontSize}">{text}</span>
        {#if showPrice}
          <div class="relative">
            <span class="inline-flex transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2 opacity-40">
              — {price}
            </span>
            <ArrowUp 
              class="absolute right-0 top-0 w-4 h-4 
                     transition-all duration-300
                     translate-y-2 opacity-0
                     group-hover:translate-y-0 group-hover:opacity-100" 
            />
          </div>
        {/if}
      </div>
    {/if}
  </div>
</button>