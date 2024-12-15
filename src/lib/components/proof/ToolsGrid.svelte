<!-- lib/components/proof/ToolsGrid.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { ToolsItem, ToolsGridProps } from '$lib/components/cta/types';

  export let tools: ToolsItem[] = [];
  export let columns: ToolsGridProps["columns"] = 4;
  export let gap: ToolsGridProps["gap"] = "md";

  const gaps = { sm: "gap-4", md: "gap-8", lg: "gap-12" } as const;
  const cols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
  } as const;

  let intervals: ReturnType<typeof setInterval>[] = [];
  let flashingStates: Record<number, number> = {};

  const isFlashingTools = (tool: ToolsItem): tool is FlashingTools =>
    Array.isArray((tool as FlashingTools).tools);

  onMount(() => {
    tools.forEach((tool, index) => {
      if (isFlashingTools(tool)) {
        flashingStates[index] = 0;
        intervals.push(
          setInterval(() => {
            flashingStates[index] = (flashingStates[index] + 1) % tool.tools.length;
            flashingStates = flashingStates;
          }, tool.interval ?? 300)
        );
      }
    });
  });

  onDestroy(() => intervals.forEach(clearInterval));
</script>

<div class="grid {cols[columns]} {gaps[gap]}">
  {#each tools as tool, i}
    {#if isFlashingTools(tool)}
      {@const currentTool = tool.tools[flashingStates[i] ?? 0]}
      <div class="flex flex-col items-center gap-3 p-4 rounded-lg">
        <img 
          src={currentTool.icon} 
          alt={currentTool.name}
          class="w-12 h-12 transition-all duration-200"
          onerror="this.innerText = '{currentTool.fallback}'"
        />
        <span class="text-sm font-medium">{currentTool.name}</span>
      </div>
    {:else}
      <a 
        href={tool.url}
        class="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-muted transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src={tool.icon} 
          alt={tool.name}
          class="w-12 h-12"
          onerror="this.innerText = '{tool.fallback}'"
        />
        <span class="text-sm font-medium">{tool.name}</span>
      </a>
    {/if}
  {/each}
</div>