<!-- src/lib/iframe/layout/Tabs.svelte -->
<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  
  import ColorTab from "../features/colors/ColorTab.svelte";
  import { Palette, X } from "lucide-svelte";
  import { activeTab, showInfo } from "../stores";
  import { isProcessing } from "../utils";

  const ANIMATION_DURATION = 150;
  const BG_STYLE = 'bg-white dark:bg-slate-900';

  const tabs = {
    color: { 
      icon: Palette, 
      tooltip: "Color Picker",
      title: "Background Color",
      description: "Change document background color",
      component: ColorTab
    }
  };

  function toggleTab(tab: string) {
    activeTab.update((current) => (current === tab ? null : tab));
  }

  function handleColorChange(event: CustomEvent<{ color: string }>) {
    // Color change event handler - pass through to parent
    console.log('Color change:', event.detail);
  }

  $: getButtonClass = (tab: string) => cn(
    "transition-all duration-200 relative z-10",
    $activeTab === tab
      ? `w-10 h-[calc(3rem+1px)] rounded-b-full ${BG_STYLE}
         border-b border-l border-r border-gray-300 dark:border-gray-600
         after:content-[''] after:absolute after:top-[-1px] 
         after:left-0 after:right-0 after:h-[1px] after:bg-inherit`
      : "w-10 h-10 rounded-full mt-2 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
  );
  
  $: activeTabData = $activeTab ? tabs[$activeTab] : null;
</script>

<div class="flex flex-col w-full relative">
  {#if $activeTab}
    <div
      class="absolute bottom-full w-full rounded-t-lg border border-gray-300 
             dark:border-gray-600 {BG_STYLE} overflow-hidden"
      transition:slide={{ 
        duration: ANIMATION_DURATION,
        easing: cubicOut,
        axis: 'y' 
      }}
    >
      <!-- Tab Header -->
      {#if $showInfo && activeTabData}
        <div class="px-4 pt-3">
          <h3 class="text-sm font-medium text-muted-foreground/60">
            {activeTabData.title}
          </h3>
          <p class="text-xs text-muted-foreground/40 mt-0.5 mb-3">
            {activeTabData.description}
          </p>
        </div>
      {/if}

      <!-- Fixed Height Content Container -->
      <div class="relative px-4 pb-4" style:min-height="180px">
        <svelte:component
          this={activeTabData.component}
          on:colorChange={handleColorChange}
          on:processingStart={() => isProcessing.set(true)}
          on:processingEnd={() => isProcessing.set(false)}
        />
      </div>
    </div>
  {/if}

  <!-- Tab Buttons -->
  <div class="flex justify-between items-center">
    <div class="flex relative gap-2">
      {#each Object.entries(tabs) as [tabKey, tabData]}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              variant="ghost"
              size="icon"
              class={getButtonClass(tabKey)}
              on:click={() => toggleTab(tabKey)}
              disabled={$isProcessing}
            >
              <svelte:component this={tabData.icon} class="h-4 w-4" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p>{tabData.tooltip}</p>
          </Tooltip.Content>
        </Tooltip.Root>
      {/each}

      {#if $activeTab}
        <Button
          variant="ghost"
          size="icon"
          class="rounded-full opacity-40 hover:opacity-100 hover:bg-transparent"
          on:click={() => activeTab.set(null)}
          disabled={$isProcessing}
        >
          <X class="w-4 h-4 mt-4" />
        </Button>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Any additional styles */
</style>