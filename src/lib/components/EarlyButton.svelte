<!-- src/lib/components/EarlyButton.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  
  export let size: "default" | "lg" = "default";
  export let variant: "solid" | "gradient" = "solid";
  export let className = "";
</script>

{#if variant === "gradient"}
  <Button
    href="/early"
    class="relative group overflow-hidden {size === 'lg' ? 'h-14 text-lg px-8' : 'h-10 text-sm px-6'} 
           font-medium rounded-full bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
           hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 {className}"
  >
    <span class="relative z-10">Early Access</span>
    <div class="absolute inset-0 bg-gradient-to-r from-[#B345ED] to-[#3644FE] 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
    />
  </Button>
{:else}
  <Button
    href="/early"
    class="relative overflow-hidden {size === 'lg' ? 'h-14 text-lg px-8' : 'h-10 text-sm px-6'} 
           font-medium rounded-full bg-primary hover:bg-primary/90
           hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 {className}"
  >
    Early Access
  </Button>
{/if}