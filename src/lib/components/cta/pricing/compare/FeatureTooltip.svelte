<!-- src/lib/components/cta/pricing/compare/FeatureTooltip.svelte -->
<script lang="ts">
  import * as Popover from "$lib/components/ui/popover";
  import { Info } from "lucide-svelte";
  
  export let tooltip: string;
</script>

<Popover.Root>
  <Popover.Trigger>
    <Info class="w-4 h-4 text-muted-foreground/40 hover:text-primary 
                transition-colors cursor-help" />
  </Popover.Trigger>
  <Popover.Content
    class="w-72 p-4 text-sm leading-relaxed text-muted-foreground"
    side="top"
  >
    {tooltip}
    <Popover.Arrow />
  </Popover.Content>
</Popover.Root>