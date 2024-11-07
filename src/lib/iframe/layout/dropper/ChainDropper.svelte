<!-- $lib/iframe/layout/dropper/ChainDropper.svelte -->

<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { dropperStore, chainMode, dropperStatus } from "../../stores/dropperStore";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { Link } from "lucide-svelte";

  let showTooltip = false;
</script>

{#if $chainMode}
  <div 
    class="absolute inset-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="flex flex-col items-center justify-center h-full gap-4 p-4"
      transition:slide={{ duration: 300, axis: "y" }}
    >
      <!-- Status Badge -->
      <Badge variant="outline" class="mb-2">
        Chain Mode {$dropperStatus.hasElements ? 'Active' : 'Ready'}
      </Badge>

      <!-- Coming Soon Message -->
      <div class="text-center space-y-2">
        <h3 class="text-lg font-semibold">Chain Drop Coming Soon</h3>
        <p class="text-sm text-muted-foreground max-w-xs">
          Chain multiple elements together and drop them as a sequence.
        </p>
      </div>

      <!-- Exit Button -->
      <Button 
        variant="ghost" 
        size="sm"
        class="mt-4"
        on:click={() => dropperStore.toggleChainMode()}
      >
        <Link class="w-4 h-4 mr-2" />
        Exit Chain Mode
      </Button>
    </div>
  </div>
{/if}

<style>
  /* Custom styling if needed */
</style>