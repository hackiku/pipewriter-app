<!-- src/lib/(space)/content/features/TechStack.svelte -->
<script lang="ts">
  import StackGrid from "../../components/proof/StackGrid.svelte";
  import SpaceButton from "../../components/cta/SpaceButton.svelte";
</script>

<div class="border border-border/50 bg-zinc-950/[0.05] dark:bg-white/[0.03] 
            relative rounded-[2.5rem]">
  <div class="container relative py-16 text-center">
    <div class="relative overflow-hidden">
      <StackGrid noStack />
      <!-- Mask Gradients -->
      <div
        class="absolute inset-y-0 left-0 w-8 
               bg-gradient-to-r from-[rgb(245,245,245)] dark:from-zinc-950 to-transparent 
               pointer-events-none"
      />
      <div
        class="absolute inset-y-0 right-0 w-8 
               bg-gradient-to-l from-[rgb(245,245,245)] dark:from-zinc-950 to-transparent 
               pointer-events-none"
      />
    </div>

    <div class="mt-12">
      <SpaceButton size="lg" text="Book Chute Repack" />
    </div>
  </div>
</div>