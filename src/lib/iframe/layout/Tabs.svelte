<!-- $lib/iframe/layout/Tabs.svelte -->
<script lang="ts">
  import { fade } from "svelte/transition";
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  
  import TextStyles from "../components/TextStyles.svelte";
  import ColorPicker from "../components/ColorPicker.svelte";
  import DropStyleguide from "../components/DropStyleguide.svelte";
  import { Type, Palette, Settings, Code, X } from "lucide-svelte";
  import { activeTab, showInfo } from "../stores";

  const BG_STYLE = 'bg-white dark:bg-slate-900';

  const tabs = {
    text: { icon: Type, tooltip: "Text Styles", component: TextStyles },
    color: { icon: Palette, tooltip: "Color Picker", component: ColorPicker },
    ai: { icon: Code, tooltip: "Code", component: DropStyleguide },
  };

  function toggleTab(tab: string) {
    activeTab.update((current) => (current === tab ? null : tab));
  }

  function callGAS(action: string, payload: Record<string, any> = {}) {
    const message = { action, payload };
    window.parent.postMessage(JSON.stringify(message), "*");
  }

  function handleColorChange(event: CustomEvent<{ color: string }>) {
    callGAS("changeBg", { color: event.detail.color });
  }

  $: getButtonClass = (tab: string) =>
    cn(
      "transition-all duration-200 relative z-10",
      $activeTab === tab
        ? `w-10 h-[calc(3rem+1px)] rounded-b-full ${BG_STYLE}
           border-b border-l border-r border-gray-300 dark:border-gray-600
           after:content-[''] after:absolute after:top-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-inherit`
        : "w-10 h-10 rounded-full mt-2 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
    );
  
  $: isFirstTabActive = $activeTab === Object.keys(tabs)[0];
</script>

<div class="flex flex-col w-full relative">
  <!-- Tab Content - Positioned above the buttons -->
  {#if $activeTab}
    <div
      class={cn(
        `absolute bottom-full w-full py-2 px-4
         rounded-t-lg border border-gray-300 dark:border-gray-600
         flex items-center justify-center ${BG_STYLE}`,
        isFirstTabActive ? "rounded-br-none" : "rounded-br-lg"
      )}
      transition:fade={{ duration: 200 }}
    >
      <svelte:component
        this={tabs[$activeTab].component}
        on:colorChange={handleColorChange}
      />
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
            >
              <svelte:component this={tabData.icon} class="h-4 w-4" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p>{tabData.tooltip}</p>
          </Tooltip.Content>
        </Tooltip.Root>
      {/each}

      <!-- Close button -->
      {#if $activeTab}
        <Button
          variant="ghost"
          size="icon"
          class="rounded-full opacity-40 hover:opacity-100 hover:bg-transparent"
          on:click={() => $activeTab = false}
        >
          <X class="w-4 h-4 mt-4" />
        </Button>
      {/if}
    </div>

    {#if $showInfo}
      <h2 class="text-xs opacity-40 mb-2 uppercase">
        Styles
      </h2>
    {/if}
  </div>
</div>