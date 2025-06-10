<!-- src/lib/components/cta/signin/MarketplaceButton.svelte -->
<script lang="ts">
  import { ExternalLink } from "lucide-svelte";
  import { cn } from '$lib/utils';
  
  export let size: "xs" | "sm" | "default" | "lg" = "default";
  export let variant: "full" | "compact" | "icon" | "badge" = "full";
  export let className = "";
  export let text = "Available on Google Workspace Marketplace";
  export let href = "https://workspace.google.com/marketplace/app/pipewriter/123456789";
  export let source = "default";
  export let showLogo = true;
  export let showExternal = false;
  
  const dimensions = {
    xs: {
      height: "h-8",
      padding: "px-3",
      text: "text-xs",
      logo: "w-4 h-4"
    },
    sm: {
      height: "h-9",
      padding: "px-4", 
      text: "text-sm",
      logo: "w-5 h-5"
    },
    default: {
      height: "h-11",
      padding: "px-6",
      text: "text-base", 
      logo: "w-6 h-6"
    },
    lg: {
      height: "h-12",
      padding: "px-8",
      text: "text-lg",
      logo: "w-7 h-7"
    }
  };

  // Analytics tracking
  function handleClick() {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'marketplace_click', {
        source: source,
        variant: variant
      });
    }
  }
</script>

{#if variant === "icon"}
  <!-- Icon-only variant for navbar -->
  <a 
    {href}
    class={cn(
      "inline-flex items-center justify-center",
      "rounded-lg border border-border hover:border-primary/50",
      "bg-background hover:bg-muted transition-all duration-200",
      "group relative",
      dimensions[size].height,
      "aspect-square",
      className
    )}
    on:click={handleClick}
    title="Available on Google Workspace Marketplace"
    data-marketplace-button
  >
    <img 
      src="/icons/google-marketplace.svg"
      alt="Google Workspace"
      class={cn("transition-transform group-hover:scale-110", dimensions[size].logo)}
    />
  </a>

{:else if variant === "compact"}
  <!-- Compact square variant -->
  <a 
    {href}
    class={cn(
      "inline-flex flex-col items-center justify-center gap-2",
      "rounded-xl border border-border hover:border-primary/50",
      "bg-background hover:bg-muted transition-all duration-200",
      "p-4 group text-center aspect-square",
      className
    )}
    on:click={handleClick}
    data-marketplace-button
  >
    {#if showLogo}
      <img 
        src="/icons/google-workspace.svg" 
        alt="Google Workspace"
        class="w-8 h-8 transition-transform group-hover:scale-110"
      />
    {/if}
    <div class="space-y-1">
      <div class="text-xs font-medium">Available on</div>
      <div class="text-xs text-muted-foreground">Workspace Marketplace</div>
    </div>
  </a>

{:else if variant === "badge"}
  <!-- Badge variant for footer/sidebar -->
  <a 
    {href}
    class={cn(
      "inline-flex items-center gap-2",
      "px-3 py-2 rounded-full border",
      "bg-background hover:bg-muted transition-all duration-200",
      "text-xs font-medium group",
      className
    )}
    on:click={handleClick}
    data-marketplace-button
  >
    {#if showLogo}
      <img 
        src="/icons/google-workspace.svg" 
        alt="Google Workspace"
        class="w-4 h-4"
      />
    {/if}
    <span>Workspace Marketplace</span>
    {#if showExternal}
      <ExternalLink class="w-3 h-3 opacity-70 group-hover:opacity-100" />
    {/if}
  </a>

{:else}
  <!-- Full button variant -->
  <a 
    {href}
    class={cn(
      "inline-flex items-center justify-center gap-3",
      "rounded-lg border border-border hover:border-primary/50",
      "bg-background hover:bg-muted transition-all duration-200",
      "group font-medium",
      dimensions[size].height,
      dimensions[size].padding,
      className
    )}
    on:click={handleClick}
    data-marketplace-button
  >
    {#if showLogo}
      <img 
        src="/icons/google-workspace.svg" 
        alt="Google Workspace"
        class={cn("transition-transform group-hover:scale-110", dimensions[size].logo)}
      />
    {/if}
    
    <div class="flex flex-col items-start">
      <span class={cn("leading-tight", dimensions[size].text)}>{text}</span>
      {#if size === "lg"}
        <span class="text-xs text-muted-foreground">Free trial available</span>
      {/if}
    </div>
    
    {#if showExternal}
      <ExternalLink class={cn("opacity-70 group-hover:opacity-100", dimensions[size].logo === "w-4 h-4" ? "w-3 h-3" : "w-4 h-4")} />
    {/if}
  </a>
{/if}