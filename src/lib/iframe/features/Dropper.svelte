<!--  $lib/iframe/features/Dropper.svelte -->
<script lang="ts">
  import { fade, slide, fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { AppsScriptClient } from "../utils/appsScript";
  
  // Components
  import ElementCard from "../components/ElementCard.svelte";
  import DropperBar from "./dropper/DropperBar.svelte";
  import ChainDropper from "./dropper/ChainDropper.svelte";
  import DropperGrid from "./dropper/DropperGrid.svelte";
 
  // Stores
  import { zenMode } from "../stores";
  import { gridStore } from "../stores/gridStore";
  import { elementsThemeStore } from "../stores/elementsThemeStore";
  import { dropperStore } from "../stores/dropperStore"; 

  const client = AppsScriptClient.getInstance();
  const dispatch = createEventDispatcher();

  let isProcessing = false;

  async function handleElementSelect(event: CustomEvent<{elementId: string}>) {
    const { elementId } = event.detail;
    isProcessing = true;
    dispatch("processingStart");

    try {
      const response = await client.sendMessage("getElement", { 
        elementId,
        theme: $elementsThemeStore
      });

      if (response.success) {
        dispatch("status", {
          type: "success",
          message: "Element inserted successfully",
          executionTime: response.executionTime
        });
      } else {
        throw new Error(response.error || "Failed to insert element");
      }
    } catch (error) {
      console.error(`Failed to insert element: ${elementId}`, error);
      dispatch("status", {
        type: "error", 
        message: error instanceof Error ? error.message : "Failed to insert element"
      });
    } finally {
      isProcessing = false;
      dispatch("processingEnd");
    }
  }
</script>

<div class="relative h-full z-0 bg-gray-100 dark:bg-gray-900">
  <ChainDropper />
  
  <!-- <div class="custom-scrollbar overflow-y-scroll h-full pb-8 pt-2 {$gridStore.padding}"> -->
  <div class="custom-scrollbar overflow-y-scroll h-full pb-8 pt-2">
    <DropperGrid 
      theme={$elementsThemeStore}
      on:elementSelect={handleElementSelect}
      {isProcessing}
    />
    <DropperGrid 

      on:elementSelect={handleElementSelect}
    />
  </div>

  <div
    class={`w-full transition-all duration-200 ${
      $zenMode ? "fixed bottom-0 left-1/2 -translate-x-1/2" : ""
    }`}
    in:slide={{ duration: 200, axis: "y" }}
    out:fly={{ duration: 200 }}
  >
    <DropperBar />
  </div>
</div>

<style>
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
    -webkit-overflow-scrolling: touch;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    margin: 4rem 0;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 4px;
    min-height: 40px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.1);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(155, 155, 155, 0.7);
  }
</style>