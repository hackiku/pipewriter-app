<!-- src/lib/(space)/repacks/firefly/components/cta/SecondaryButton.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils";
  
  export let href: string | undefined = undefined;
  export let type: "button" | "submit" = "button";
  export let className = "";
  let klass = "";
  export { klass as class };
</script>

{#if href}
  <a 
    {href}
    class={cn(
      "group relative inline-flex items-center justify-center",
      "px-6 py-3 text-[#F5FF00] font-medium tracking-wide",
      "bg-transparent",
      "transition-all duration-300",
      // Sharp edges + nested borders for tech feel
      "border border-[#F5FF00]",
      // Pseudo-element positioning
      "before:absolute before:inset-0",
      "before:border before:border-[#F5FF00]/50",
      "before:translate-x-1 before:translate-y-1",
      "before:transition-transform before:duration-300",
      "hover:before:translate-x-0 hover:before:translate-y-0",
      // Hover state
      "hover:bg-[#F5FF00]/10",
      className,
    )}
  >
    <slot />
  </a>
{:else}
  <button
    {type}
    class={cn(
      "group relative inline-flex items-center justify-center",
      "px-6 py-3 text-[#F5FF00] font-medium tracking-wide",
      "bg-transparent",
      "transition-all duration-300",
      // Sharp edges + nested borders for tech feel
      "border border-[#F5FF00]",
      // Pseudo-element positioning
      "before:absolute before:inset-0",
      "before:border before:border-[#F5FF00]/50",
      "before:translate-x-1 before:translate-y-1",
      "before:transition-transform before:duration-300",
      "hover:before:translate-x-0 hover:before:translate-y-0",
      // Hover state
      "hover:bg-[#F5FF00]/10",
      className,
      klass
    )}
    on:click
  >
    <slot />
  </button>
{/if}