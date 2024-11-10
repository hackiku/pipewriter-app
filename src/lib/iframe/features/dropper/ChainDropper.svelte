<!-- $lib/iframe/layout/dropper/ChainDropper.svelte -->

<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { dropperStore, chainMode, dropperStatus } from "../../stores/dropperStore";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { Link, ArrowRight } from "lucide-svelte";
  import { showAboutModal } from "../../stores/aboutStore";

  let showTooltip = false;
</script>

{#if $chainMode}
  <div 
    class="absolute inset-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="flex flex-col items-center justify-center h-full gap-6 p-4"
      transition:slide={{ duration: 300, axis: "y" }}
    >
      <Badge variant="outline" class="mb-2">
        Coming Soon
      </Badge>

      <div class="text-center space-y-3 max-w-xs">
        <h3 class="text-lg font-semibold text-foreground">
          Chain Drop Feature
        </h3>
        <p class="text-sm text-muted-foreground">
          Soon you'll be able to chain multiple elements together and drop them as a sequence. Perfect for building complete page sections in one go.
        </p>
      </div>

      <div class="space-y-3">
        <Button 
          variant="outline" 
          size="sm"
          class="gap-2"
          on:click={() => showAboutModal.set(true)}
        >
          Stay Updated
          <ArrowRight class="w-4 h-4" />
        </Button>

        <Button 
          variant="ghost" 
          size="sm"
          class="gap-2"
          on:click={() => dropperStore.toggleChainMode()}
        >
          <Link class="w-4 h-4" />
          Exit Chain Mode
        </Button>
      </div>
    </div>
  </div>
{/if}
