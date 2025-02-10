<!-- src/lib/components/cta/pricing/components/LifetimeTooltip.svelte -->
<script lang="ts">
  import { HelpCircle } from 'lucide-svelte';
</script>

<div class="relative inline-flex group">
  <button 
    class="text-muted-foreground hover:text-foreground transition-colors"
    aria-label="Learn more about lifetime access"
  >
    <HelpCircle class="w-4 h-4" />
  </button>
  
  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[280px] 
              invisible group-hover:visible opacity-0 group-hover:opacity-100
              transition-[opacity,visibility] duration-200">
    <div class="bg-popover text-popover-foreground text-sm p-3 rounded-lg shadow-lg
                border border-border relative">
      Keep all current features forever: templates, bound scripts, and beta updates. Plus get several months of pro access when we launch the add-on.
      <div class="absolute w-2 h-2 bg-popover rotate-45 -bottom-1 left-1/2 -translate-x-1/2
                  border-r border-b border-border"></div>
    </div>
  </div>
</div>

<style>
  /* Ensure tooltip stays visible when hovering over it */
  .group:hover .group-hover\:visible {
    visibility: visible;
  }
  
  /* Fix mobile touch behavior */
  @media (hover: none) {
    .group:active .group-hover\:visible {
      visibility: visible;
      opacity: 1;
    }
  }
</style>