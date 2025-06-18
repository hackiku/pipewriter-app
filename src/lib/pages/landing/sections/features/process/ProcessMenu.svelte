<!-- src/lib/pages/landing/sections/features/process/ProcessMenu.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils";
  import { processSteps } from "../processData";
  
  export let currentStep: number = 0;
  export let onStepChange: (index: number) => void;
  export let isCompact: boolean = false;
  
  const menuItems = [
    ...processSteps,
    {
      id: 'get-started',
      title: 'Get Started',
      description: 'Join the waitlist for early access',
      isLink: true,
      href: '/waitlist'
    }
  ];
  
  function handleItemClick(index: number, item: any) {
    if (item.isLink) {
      window.location.href = item.href;
      return;
    }
    onStepChange(index);
  }
  
  function getItemStyles(index: number, item: any) {
    const isActive = !item.isLink && index === currentStep;
    const isGetStarted = item.isLink;
    
    if (isGetStarted) {
      return cn(
        "text-primary hover:text-primary/80",
        "border-primary/20 hover:border-primary/40 hover:bg-primary/5",
        "transition-all duration-200"
      );
    }
    
    if (isActive) {
      return cn(
        "bg-white/10 border-border text-foreground",
        "hover:bg-white/15"
      );
    }
    
    return cn(
      "hover:bg-white/5 border-border/50 text-muted-foreground",
      "hover:text-foreground hover:border-border",
      "transition-all duration-200"
    );
  }
</script>

<div class={cn(
  "process-menu-container rounded-xl border overflow-hidden",
  "bg-zinc-950 text-white shadow-lg",
  "transition-all duration-300"
)}>
  
  <!-- Header -->
  <div class="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900">
    <div class="w-5 h-5 rounded bg-gradient-to-br from-[#3644FE] to-[#B345ED]" />
    <span class="text-sm font-medium">Pipewriter Process</span>
  </div>

  <!-- Menu Items -->
  <div class={cn(
    "overflow-hidden transition-all duration-300",
    isCompact ? "max-h-[60px] overflow-y-auto" : ""
  )}>
    
    <!-- Desktop/Expanded: Vertical Stack -->
    <div class="hidden sm:block">
      {#each menuItems as item, index}
        <button
          class={cn(
            "flex items-center gap-3 px-4 py-3 w-full text-left",
            "border-b border-white/5 last:border-none",
            getItemStyles(index, item),
            item.isLink ? "font-medium" : ""
          )}
          on:click={() => handleItemClick(index, item)}
        >
          {#if item.isLink}
            <div class="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
              <span class="text-xs">→</span>
            </div>
          {:else}
            <div class={cn(
              "w-4 h-4 rounded-full border-2",
              index === currentStep && !item.isLink
                ? "bg-primary border-primary" 
                : "border-white/30"
            )} />
          {/if}
          
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium truncate">{item.title}</div>
            {#if !isCompact && item.description}
              <div class="text-xs text-white/60 truncate mt-0.5">
                {item.description}
              </div>
            {/if}
          </div>
        </button>
      {/each}
    </div>

    <!-- Mobile: Horizontal Scroll -->
    <div class="sm:hidden flex overflow-x-auto p-2 gap-2 scrollbar-hide">
      {#each menuItems as item, index}
        <button
          class={cn(
            "flex-shrink-0 px-3 py-2 rounded-lg border text-sm font-medium",
            "min-w-max transition-all duration-200",
            getItemStyles(index, item)
          )}
          on:click={() => handleItemClick(index, item)}
        >
          {item.title}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
</style>