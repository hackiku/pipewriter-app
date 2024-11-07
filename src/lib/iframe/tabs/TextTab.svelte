<!-- $lib/iframe/tabs/TextTab.svelte -->
<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { Save, Loader2, ThumbsUp, AlertCircle, Heading } from "lucide-svelte";
  import { getElement } from "../elements";
  import ElementCard from "../components/ElementCard.svelte";
  import TextStyleDropdown from "../components/TextStyleDropdown.svelte";
  import { elementsTheme } from "../stores";
  import OutlineButton from "../components/OutlineButton.svelte";
  import { GASCommunicator } from "../gasUtils";

  const dispatch = createEventDispatcher();
  const elementId = "styleguide";
  const element = getElement(elementId);
  const gas = GASCommunicator.getInstance(5000);

  let isProcessing = false;
  let status: StatusUpdate | null = null;
  let headingStyles = [
    { value: "NORMAL", tag: "p", label: "Normal text", fontSize: 11, saved: false },
    { value: "HEADING1", tag: "h1", label: "Heading 1", fontSize: 32, saved: false },
    { value: "HEADING2", tag: "h2", label: "Heading 2", fontSize: 24, saved: false },
    { value: "HEADING3", tag: "h3", label: "Heading 3", fontSize: 20, saved: false },
    { value: "HEADING4", tag: "h4", label: "Heading 4", fontSize: 16, saved: false },
    { value: "HEADING5", tag: "h5", label: "Heading 5", fontSize: 14, saved: false },
    { value: "HEADING6", tag: "h6", label: "Heading 6", fontSize: 12, saved: false },
  ];

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

  async function handleSaveStyle(event: CustomEvent) {
    if (isProcessing) return;
    isProcessing = true;
    dispatch("processingStart");

    const style = event.detail;

    try {
      const response = await gas.sendMessage(
        "saveHeadingStyle", 
        { heading: style.value },
        updateStatus
      );

      if (!response.success) {
        throw new Error(response.error || "Failed to save style");
      }

      headingStyles = headingStyles.map(s => 
        s.value === style.value ? { ...s, saved: true } : s
      );
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
    if (isProcessing) return;
    const savedStyle = headingStyles.find(s => s.saved);
    if (!savedStyle) return;

    isProcessing = true;
    dispatch("processingStart");

    try {
      const response = await gas.sendMessage(
        "applyHeadingStyle",
        { heading: savedStyle.value },
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

  function handleDeleteSaved(event: CustomEvent) {
    const style = event.detail;
    headingStyles = headingStyles.map(s => 
      s.value === style.value ? { ...s, saved: false } : s
    );
  }

  function handleDeleteAll() {
    headingStyles = headingStyles.map(s => ({ ...s, saved: false }));
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
</script>

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

<div class="relative flex flex-col items-stretch w-full gap-2 pt-4">
  <TextStyleDropdown
    {headingStyles}
    disabled={isProcessing}
    on:select={handleSaveStyle}
    on:deleteSaved={handleDeleteSaved}
    on:deleteAll={handleDeleteAll}
  />

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

    <div class="flex w-3/5 gap-1">
      
			<div class="flex flex-col w-4/5 gap-1 items-center justify-middle">
        <OutlineButton
          icon={Save}
          label="Save"
          onClick={handleSaveStyle}
          class="h-6"
          disabled={isProcessing}
        />
        <OutlineButton
          icon={Heading}
          label="Apply"
          onClick={handleApplyStyle}
          class="h-6"
          disabled={isProcessing}
        />
      </div>
			<div class="w-1/5 bg-gray-400 rounded-md">
				xxx
			</div>
    </div>
  </div>
</div>