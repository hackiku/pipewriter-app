<!-- $lib/components/cta/EarlyAccessButton.svelte -->
<script lang="ts">
  import { ArrowUp } from "lucide-svelte";
  import { cn } from '$lib/utils';
  import { drawerOpen } from '$lib/stores/earlyAccessStore';
  
  export let size: "default" | "lg" = "default";
  export let className = "";
  export let fullWidth = false;
  export let builders = [];

  const handleClick = () => {
    drawerOpen.set(true);
  };
</script>

<button
  class={cn(
    "relative group overflow-hidden inline-flex items-center",
    "font-medium rounded-lg",
    "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
    size === "lg" ? "h-12 text-lg px-8" : "h-10 text-base px-6",
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
  on:click={handleClick}
  {...$$restProps}
  use:builders={builders}
>
  <span 
    class="absolute inset-0 bg-gradient-to-r from-[#B345ED] to-[#3644FE] 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  />
  
  <div class="relative z-10 flex items-center justify-center text-white w-full">
    <div class="flex items-center gap-2">
      <span>Early Access</span>
      <ArrowUp 
        class="w-4 h-4 transform transition-all duration-300 
              translate-y-2 opacity-0
              group-hover:translate-y-0 group-hover:opacity-100" 
      />
    </div>
  </div>
</button>