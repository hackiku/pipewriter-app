<!-- src/lib/pages/pricing/sections/hero/PlanToggle.svelte -->
<script lang="ts">
  import { Switch } from "$lib/components/ui/switch";
  export let isAnnual = true;
</script>

<div class="flex items-center justify-center gap-x-4">
  <span class={!isAnnual ? "text-white" : "text-zinc-400"}>Monthly</span>
  <Switch 
    checked={isAnnual}
    onCheckedChange={() => isAnnual = !isAnnual}
  />
  <div class="flex items-center gap-x-2">
    <span class={isAnnual ? "text-white" : "text-zinc-400"}>Annual</span>
    <span class="text-sm text-primary">Save 15%</span>
  </div>
</div>