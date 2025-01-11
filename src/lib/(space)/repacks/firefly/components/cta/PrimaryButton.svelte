<!-- src/lib/(space)/repacks/firefly/components/cta/PrimaryButton.svelte -->
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
      "px-6 py-3 text-black font-medium tracking-wide",
      "bg-[#F5FF00] hover:bg-[#F5FF00]/90",
      "transition-all duration-300",
      // Sharp edges + nested borders for tech feel
      "border border-transparent",
      // Pseudo-element positioning
      "before:absolute before:inset-0",
      "before:border before:border-[#F5FF00]/50",
      "before:translate-x-1 before:translate-y-1",
      "before:transition-transform before:duration-300",
      "hover:before:translate-x-0 hover:before:translate-y-0",
      // Optional glitch effect on hover
      "after:absolute after:inset-0",
      "after:border after:border-[#F5FF00]/20",
      "after:-translate-x-1 after:-translate-y-1",
      "after:transition-transform after:duration-300",
      "hover:after:translate-x-0 hover:after:translate-y-0",
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
      "px-6 py-3 text-black font-medium tracking-wide",
      "bg-[#F5FF00] hover:bg-[#F5FF00]/90",
      "transition-all duration-300",
      // Sharp edges + nested borders for tech feel
      "border border-transparent",
      // Pseudo-element positioning
      "before:absolute before:inset-0",
      "before:border before:border-[#F5FF00]/50",
      "before:translate-x-1 before:translate-y-1",
      "before:transition-transform before:duration-300",
      "hover:before:translate-x-0 hover:before:translate-y-0",
      // Optional glitch effect on hover
      "after:absolute after:inset-0",
      "after:border after:border-[#F5FF00]/20",
      "after:-translate-x-1 after:-translate-y-1",
      "after:transition-transform after:duration-300",
      "hover:after:translate-x-0 hover:after:translate-y-0",
      className,
      klass
    )}
    on:click
  >
    <slot />
  </button>
{/if}