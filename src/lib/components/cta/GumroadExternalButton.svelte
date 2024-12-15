<!-- $lib/components/cta/GumroadExternalButton.svelte -->
<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  
  export let href = "https://pipewriter.gumroad.com/l/wires-for-writers";
  export let className = "";
</script>

<a 
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class={cn(
    "inline-flex items-center justify-center w-10 h-10",
    "bg-white rounded-lg border border-black",
    "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    "hover:translate-x-[2px] hover:translate-y-[2px]",
    "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
    "transition-all duration-200",
    className
  )}>
  <ExternalLink class="w-4 h-4 dark:text-black ml-1 mb-0.5" />
</a>