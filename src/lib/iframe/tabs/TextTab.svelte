<!-- $lib/iframe/tabs/TextTab.svelte -->
<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { Save, Loader2, ThumbsUp, AlertCircle, Heading, Trash2, Type } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { GASCommunicator } from "../gasUtils";
  import { getElement } from "../elements";
  import ElementCard from "../components/ElementCard.svelte";
  import TextStyleDropdown from "../components/TextStyleDropdown.svelte";
  import { elementsTheme } from "../stores";
  import OutlineButton from "../components/OutlineButton.svelte";

  const dispatch = createEventDispatcher();
  const elementId = "styleguide";
  const element = getElement(elementId);
  const gas = GASCommunicator.getInstance(5000);

  let isProcessing = false;
  let showDeleteConfirm = false;
  let status: StatusUpdate | null = null;
  let selectedStyle = null;
  let savedStyles: any[] = [];
  
  interface StatusUpdate {
    type: "success" | "error" | "processing";
    message: string;
    executionTime?: number;
  }

  async function handleStyleGuideInsert() {
    if (isProcessing) return;
    isProcessing = true;
    dispatch("processingStart");

    try {
      const response = await gas.sendMessage(
        "getElement",
        { elementId: "styleguide" },
        updateStatus
      );

      if (!response.success) {
        throw new Error(response.error || "Failed to insert style guide");
      }
    } catch (error) {
      updateStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to insert style guide"
      });
    } finally {
      isProcessing = false;
      dispatch("processingEnd");
    }
  }

  async function handleStyleSelect(event: CustomEvent) {
    selectedStyle = event.detail;
    showDeleteConfirm = false;
  }

  async function handleSaveStyle() {
    if (isProcessing) return;
    isProcessing = true;
    dispatch("processingStart");

    try {
      const response = await gas.sendMessage(
        "detectHeadingStyle",
        {},
        updateStatus
      );

      if (!response.success) {
        throw new Error(response.error || "Failed to save style");
      }

      // Add new style to saved styles
      if (response.styleInfo) {
        savedStyles = [...savedStyles, response.styleInfo];
        selectedStyle = response.styleInfo;
      }

    } catch (error) {
      updateStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to save style"
      });
    } finally {
      isProcessing = false;
      dispatch("processingEnd");
    }
  }

  async function handleApplyStyle() {
    if (isProcessing || !selectedStyle) return;
    isProcessing = true;
    dispatch("processingStart");

    try {
      const response = await gas.sendMessage(
        "updateMatchingStyles",
        { style: selectedStyle },
        updateStatus
      );

      if (!response.success) {
        throw new Error(response.error || "Failed to apply style");
      }
    } catch (error) {
      updateStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to apply style"
      });
    } finally {
      isProcessing = false;
      dispatch("processingEnd");
    }
  }

  function handleDeleteAll() {
    savedStyles = [];
    selectedStyle = null;
    showDeleteConfirm = false;
  }

  function updateStatus(newStatus: StatusUpdate) {
    status = newStatus;
    if (newStatus.type !== "processing") {
      setTimeout(() => (status = null), 3000);
    }
  }

  $: statusClass = status && {
    success: "bg-green-500/5 border-green-500/10 text-green-700",
    error: "bg-red-500/5 border-red-500/10 text-red-700",
    processing: "bg-blue-500/5 border-blue-500/10 text-blue-700"
  }[status.type];

  $: applyButtonDisabled = !selectedStyle || isProcessing;
</script>

<div class="relative flex flex-col items-stretch w-full gap-2">
  <!-- Status Message -->
  {#if status}
    <div
      class="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center gap-2 border-t {statusClass}"
      transition:fade={{ duration: 200 }}
    >
      <div class="flex items-center gap-2">
        {#if status.type === "processing"}
          <Loader2 class="h-3 w-3 animate-spin" />
        {:else if status.type === "success"}
          <ThumbsUp class="h-3 w-3" />
        {:else if status.type === "error"}
          <AlertCircle class="h-3 w-3" />
        {/if}
        <span class="text-xs font-medium">{status.message}</span>
        {#if status.executionTime}
          <span class="text-xs opacity-50">({status.executionTime}ms)</span>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Style Dropdown -->
  <TextStyleDropdown
    {selectedStyle}
    {savedStyles}
    disabled={isProcessing}
    on:select={handleStyleSelect}
  />

  <!-- Element Grid -->
  <div class="flex items-start gap-2 h-24">
    <div class="w-2/5 h-full">
      {#if element}
        <ElementCard
          {element}
          onSelect={handleStyleGuideInsert}
          theme={$elementsTheme}
        />
      {:else}
        <div class="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <span class="text-muted-foreground">Style guide not found</span>
        </div>
      {/if}
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col w-3/5 gap-1">
      <!-- Save Button -->
      <OutlineButton
        icon={Type}
        label="Save"
        onClick={handleSaveStyle}
        disabled={isProcessing}
				class="h-6 w-full"
      />

      <!-- Apply Style Row -->
      <div class="flex gap-1">
        {#if savedStyles.length > 0 && !showDeleteConfirm}
          <Button
            variant="outline"
            size="icon"
            class="h-6 w-6"
            on:click={() => showDeleteConfirm = true}
          >
            <Trash2 class="h-3 w-3" />
          </Button>
        {/if}

        <Button
          variant="outline"
          class="h-6 text-xs flex-1 flex items-center gap-2"
          disabled={applyButtonDisabled && !showDeleteConfirm}
          on:click={showDeleteConfirm ? handleDeleteAll : handleApplyStyle}
        >
          {#if showDeleteConfirm}
            Delete all styles?
          {:else}
            <Heading class="h-3 w-3" />
            Apply
          {/if}
        </Button>
      </div>
    </div>
  </div>
</div>