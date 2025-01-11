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
      "inline-flex items-center justify-center",
      "px-6 py-3 text-black font-medium",
      "bg-[#F5FF00] hover:bg-[#E5EF00]",
      "rounded transition-colors",
      className,
      klass
    )}
  >
    <slot />
  </a>
{:else}
  <button
    {type}
    class={cn(
      "inline-flex items-center justify-center",
      "px-6 py-3 text-black font-medium",
      "bg-[#F5FF00] hover:bg-[#E5EF00]",
      "rounded transition-colors",
      className,
      klass
    )}
    on:click
  >
    <slot />
  </button>
{/if}