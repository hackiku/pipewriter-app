<!-- $lib/iframe/layout/Tabs.svelte -->
<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  
  // Import all tab components from features directory
  import TableTab from "../features/table/TableTab.svelte";
  import TextTab from "../features/text/TextTab.svelte";
  import ColorTab from "../features/colors/ColorTab.svelte";
  import AiTab from "../features/ai/AiTab.svelte";
  import { Table, Type, Palette, Code, Settings, Loader2, ThumbsUp, AlertCircle, X } from "lucide-svelte";
  import { activeTab, showInfo } from "../stores";
  import { isProcessing } from "../utils";

  const ANIMATION_DURATION = 150;
  const BG_STYLE = 'bg-white dark:bg-slate-900';

  // Combined tabs dictionary with enhanced metadata
  const tabs = {
    table: { 
      icon: Table, 
      tooltip: "Table Layout",
      title: "Table Formatting",
      description: "Adjust table alignments and styles",
      component: TableTab
    },
    text: { 
      icon: Type, 
      tooltip: "Text Styles",
      title: "Text Formatting",
      description: "Format text and update styles",
      component: TextTab
    },
    color: { 
      icon: Palette, 
      tooltip: "Color Picker",
      title: "Background Color",
      description: "Change document background color",
      component: ColorTab
    },
    ai: { 
      icon: Code, 
      tooltip: "AI & Code",
      title: "AI Assistant",
      description: "Convert formats and generate content",
      component: AiTab
    }
  };

  function toggleTab(tab: string) {
    activeTab.update((current) => (current === tab ? null : tab));
  }

  function handleColorChange(event: CustomEvent<{ color: string }>) {
    // Pass through to parent
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

  let status = null; // For status updates
</script>

<div class="flex flex-col w-full relative">
    {#if $showInfo && !$activeTab}
      <h2 class="text-xs font-regular uppercase tracking-wide text-muted-foreground/60 ml-1 my-2">
        Styles
      </h2>
    {/if}
	{#if $activeTab && activeTabData}
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
      {#if $showInfo}
        <div class="px-4 pt-3">
          <h3 class="text-xs font-medium text-muted-foreground/60">
            {activeTabData.title}
          </h3>
          <!-- <p class="text-[0.65em] text-muted-foreground/40 mt-0.5 mb-3">
            {activeTabData.description}
          </p> -->
        </div>
      {/if}

      <!-- Fixed Height Content Container -->
      <div class="relative px-4 py-4">
        <svelte:component
          this={activeTabData.component}
          on:colorChange={handleColorChange}
          on:processingStart={() => isProcessing.set(true)}
          on:processingEnd={() => isProcessing.set(false)}
        />
      </div>

      <!-- Status Bar -->
      <div class="h-8 px-4 flex items-center border-t border-gray-200 dark:border-gray-700">
        {#if status}
          <div class="flex items-center gap-2" 
               class:text-green-600={status.type === 'success'}
               class:text-red-600={status.type === 'error'}
               class:text-blue-600={status.type === 'processing'}>
            {#if status.type === 'processing'}
              <Loader2 class="h-4 w-4 animate-spin" />
            {:else if status.type === 'success'}
              <ThumbsUp class="h-4 w-4" />
            {:else if status.type === 'error'}
              <AlertCircle class="h-4 w-4" />
            {/if}
            <span class="text-sm font-medium">{status.message}</span>
            {#if status.executionTime}
              <span class="text-xs opacity-60">({status.executionTime}ms)</span>
            {/if}
          </div>
        {:else}
          <div class="flex items-center gap-2 text-muted-foreground/40 text-sm">
            <Settings class="h-4 w-4" />
            <span>Ready for changes</span>
          </div>
        {/if}
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