<!-- src/lib/pages/free/components/cta/Settings.svelte -->

<script lang="ts">
  import * as Switch from "$lib/components/ui/switch"
  import { Label } from "$lib/components/ui/label"
  import { Button } from "$lib/components/ui/button"
  import { RotateCcw } from "lucide-svelte"
  import { contentStore } from "../../stores/contentStore"
  
  export let showReset = false;
  export let includeCode = true;
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between space-x-4">
    <div class="space-y-0.5">
      <Label class="text-base">Include code export</Label>
      <p class="text-sm text-muted-foreground/80">
        Get your content in HTML, React and more
      </p>
    </div>
    <Switch.Root 
      checked={includeCode}
      onCheckedChange={(checked) => includeCode = checked}
      class="data-[state=checked]:bg-primary"
    />
  </div>

  {#if showReset}
    <Button 
      variant="outline"
      size="sm"
      class="w-full rounded-xl border-input/50 text-muted-foreground/80
             hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20" 
      on:click={() => contentStore.reset()}
    >
      <RotateCcw class="w-4 h-4 mr-2" />
      Reset All Content
    </Button>
  {/if}
</div>
