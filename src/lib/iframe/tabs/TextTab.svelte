<!-- src/lib/iframe/tabs/TextTab.svelte -->

<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { Loader2, ThumbsUp, AlertCircle } from "lucide-svelte";
  import { GASCommunicator } from "../gasUtils";
  import TextStyleDropdown from "../components/TextStyleDropdown.svelte";
  import TextButtons from "../components/TextButtons.svelte";
  import { elementsTheme } from "../stores";

  const dispatch = createEventDispatcher();
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

  interface StyleInfo {
    type: string;
    headingType: string;
    text: string;
    index: number;
    textAttributes: Record<string, any>;
    paragraphAttributes: Record<string, any>;
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

      // Add new style to saved styles if we got valid style info
      if (response.data?.styleInfo) {
        const styleInfo = response.data.styleInfo;
        
        // Create a simplified style object with needed properties
        const newStyle = {
          id: Date.now().toString(),
          headingType: styleInfo.headingType,
          tag: getTagFromHeadingType(styleInfo.headingType),
          label: styleInfo.text || 'Unnamed style',
          fontSize: styleInfo.textAttributes.fontSize,
          fontFamily: styleInfo.textAttributes.fontFamily,
          textAttributes: styleInfo.textAttributes,
          paragraphAttributes: styleInfo.paragraphAttributes,
          saved: true
        };

        // Add to saved styles and select it
        savedStyles = [...savedStyles, newStyle];
        selectedStyle = newStyle;
        
        updateStatus({
          type: "success",
          message: "Style saved successfully",
          executionTime: response.executionTime
        });
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

  // Helper function to convert heading type to tag
  function getTagFromHeadingType(headingType: string): string {
    const map: Record<string, string> = {
      'NORMAL': 'p',
      'HEADING1': 'h1',
      'HEADING2': 'h2',
      'HEADING3': 'h3',
      'HEADING4': 'h4',
      'HEADING5': 'h5',
      'HEADING6': 'h6'
    };
    return map[headingType] || 'p';
  }

  $: statusClass = status && {
    success: "bg-green-500/5 border-green-500/10 text-green-700",
    error: "bg-red-500/5 border-red-500/10 text-red-700",
    processing: "bg-blue-500/5 border-blue-500/10 text-blue-700"
  }[status.type];
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

  <!-- Buttons Section -->
	<TextButtons
    {isProcessing}
    {showDeleteConfirm}
    {selectedStyle}
    savedCount={savedStyles.length}
    theme={$elementsTheme}
    on:insertStyleGuide={handleStyleGuideInsert}
    on:save={handleSaveStyle}
    on:apply={handleApplyStyle}
    on:deleteAll={handleDeleteAll}
    on:toggleDeleteConfirm={() => showDeleteConfirm = !showDeleteConfirm}
  />
</div>