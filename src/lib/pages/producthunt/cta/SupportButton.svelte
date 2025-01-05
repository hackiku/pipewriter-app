<!-- lib/pages/producthunt/cta/SupportButton.svelte -->
<script lang="ts">
  import { cn } from '$lib/utils';
  import { scrollStore } from '../stores/scrollStore';
  
  export let className = "";
  let isHovered = false;

  // Subscribe to scroll store to determine visibility and expansion
  let showButton: boolean;
  let isExpanded: boolean;
  
  scrollStore.subscribe(state => {
    showButton = state.showFloatingButton;
    // Expand when in CTA section OR hovered
    isExpanded = state.sectionInView === 'cta' || isHovered;
  });
</script>

<button
  class={cn(
    "fixed bottom-8 right-8 z-50",
    "h-14",
    isExpanded ? "w-auto" : "w-14",
    "rounded-xl overflow-hidden",
    "bg-[#EA532A] hover:bg-[#EA532A]/90",
    "transition-all duration-300",
    "group",
    showButton ? "translate-y-0" : "translate-y-24",
    className
  )}
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
  on:click
>
  <div class="flex items-center h-full px-4 gap-4 whitespace-nowrap">
    <!-- Icon -->
    <img 
      src="/icons/producthunt.svg" 
      alt="Product Hunt"
      class="w-6 h-6 shrink-0"
    />
    
    <!-- Text -->
    <span 
      class={cn(
        "text-white font-medium transition-all duration-300 pr-2",
        isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
      )}
    >
      Support on Product Hunt
    </span>
  </div>

  <!-- Glow effect -->
  <div
    class={cn(
      "absolute inset-0 -z-10",
      "rounded-xl opacity-0 transition-opacity duration-300",
      "bg-[#EA532A]/30",
      "blur-xl",
      isHovered && "opacity-100"
    )}
  />
</button>