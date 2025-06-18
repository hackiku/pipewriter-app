<!-- src/lib/pages/landing/sections/features/process/SubmenuItem.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils";
  import { fly, fade } from 'svelte/transition';
  
  export let isOpen: boolean = false;
  export let title: string;
  export let items: any[] = [];
  export let position: 'right' | 'below' = 'right'; // right on desktop, below on mobile
  
  // For future implementation - placeholder for now
  let submenuRef: HTMLDivElement;
</script>

<!-- Main Item Container -->
<div class="relative" bind:this={submenuRef}>
  
  <!-- Trigger Button (for future) -->
  <button
    class={cn(
      "w-full text-left px-4 py-2 rounded-lg transition-all duration-200",
      "hover:bg-white/5 border border-transparent hover:border-white/10",
      isOpen && "bg-white/10 border-white/20"
    )}
    on:click={() => isOpen = !isOpen}
    on:mouseenter={() => {
      // Future: Auto-open on hover for desktop
    }}
    on:mouseleave={() => {
      // Future: Auto-close with delay
    }}
  >
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium">{title}</span>
      <span class={cn(
        "text-xs transition-transform duration-200",
        isOpen && position === 'below' ? "rotate-180" : "",
        position === 'right' ? "→" : "↓"
      )}>
        {position === 'right' ? '→' : '↓'}
      </span>
    </div>
  </button>

  <!-- Submenu Content (Future Implementation) -->
  {#if isOpen}
    <div
      class={cn(
        "absolute z-50 bg-zinc-900 border border-white/20 rounded-lg shadow-xl",
        "min-w-[200px] overflow-hidden",
        position === 'right' 
          ? "left-full top-0 ml-2" 
          : "top-full left-0 mt-2 w-full"
      )}
      transition:fly={{ 
        duration: 200, 
        x: position === 'right' ? -10 : 0,
        y: position === 'below' ? -10 : 0 
      }}
    >
      
      <!-- Placeholder Content -->
      <div class="p-4 text-center text-white/60 text-sm">
        <div class="space-y-2">
          <div class="text-white/80 font-medium">Coming Soon</div>
          <div>Submenu functionality for {title}</div>
        </div>
      </div>
      
      <!-- Future: Dynamic Items -->
      {#if items.length > 0}
        <div class="border-t border-white/10">
          {#each items as item}
            <button class="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors">
              {item.title}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>