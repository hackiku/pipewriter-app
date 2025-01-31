<!-- src/lib/components/demo/docs/frame/TabsDemo.svelte -->
<script lang="ts">
  import { Type, Palette, Code } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  
  export let activeTab: string | null;
  export let showInfo: boolean;

  const tabs = {
    text: { 
      icon: Type, 
      tooltip: "Text Styles"
    },
    color: { 
      icon: Palette, 
      tooltip: "Color Picker"
    },
    ai: { 
      icon: Code, 
      tooltip: "AI Assistant"
    }
  };
</script>

<div class="flex justify-center">
  <div class="inline-flex items-center gap-2">
    {#each Object.entries(tabs) as [tabKey, tabData]}
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button
            variant="ghost"
            size="icon"
            class="w-8 h-8 rounded-full bg-white/50 dark:bg-black/50
                   hover:bg-white/80 dark:hover:bg-black/80
                   border border-zinc-200 dark:border-zinc-800"
          >
            <svelte:component this={tabData.icon} class="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>{tabData.tooltip}</p>
        </Tooltip.Content>
      </Tooltip.Root>
    {/each}
  </div>
</div>