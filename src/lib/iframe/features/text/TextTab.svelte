<!-- src/lib/iframe/features/text/TextTab.svelte -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { GASCommunicator } from "../../gasUtils";
  import TextStyleDropdown from "./TextStyleDropdown.svelte";
  import TextButtons from "./TextButtons.svelte";
  import { elementsTheme } from "../../stores";
  import { textStyles, selectedStyle as selectedStyleStore, type TextStyle } from "../../stores/textStyles";

  const dispatch = createEventDispatcher();
  const gas = GASCommunicator.getInstance(5000);

  let isProcessing = false;
  let showDeleteConfirm = false;
  let selectedStyle = null;

  async function handleStyleGuideInsert() {
    if (isProcessing) return;
    isProcessing = true;
    dispatch("processingStart");

    try {
      const response = await gas.sendMessage("getElement", { elementId: "styleguide" });
      if (!response.success) {
        throw new Error(response.error || "Failed to insert style guide");
      }
      dispatch("status", {
        type: "success",
        message: "Style guide inserted",
        executionTime: response.executionTime
      });
    } catch (error) {
      dispatch("status", {
        type: "error",
        message: error instanceof Error ? error.message : "Failed to insert style guide"
      });
    } finally {
      isProcessing = false;
      dispatch("processingEnd");
    }
  }

  async function handleStyleSelect(event: CustomEvent<TextStyle>) {
    selectedStyleStore.set(event.detail);
    showDeleteConfirm = false;
  }

  async function handleSaveStyle() {
    if (isProcessing) return;
    isProcessing = true;
    dispatch("processingStart");

    try {
      const response = await gas.sendMessage("detectHeadingStyle", {});
      if (!response.success) {
        throw new Error(response.error || "Failed to detect style");
      }

      const styleInfo = response.data;
      if (!styleInfo) {
        throw new Error("No style info in response");
      }

      const newStyle: TextStyle = {
        id: Date.now().toString(),
        headingType: styleInfo.headingType,
        tag: getTagFromHeadingType(styleInfo.headingType),
        label: styleInfo.text || 'Unnamed style',
        fontSize: styleInfo.textAttributes?.fontSize,
        fontFamily: styleInfo.textAttributes?.fontFamily,
        textAttributes: styleInfo.textAttributes || {},
        paragraphAttributes: styleInfo.paragraphAttributes || {},
        saved: true
      };

      textStyles.saveStyle(newStyle);
      selectedStyleStore.set(newStyle);

      dispatch("status", {
        type: "success",
        message: `Saved style "${styleInfo.text}"`,
        executionTime: response.executionTime
      });
    } catch (error) {
      dispatch("status", {
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
    const currentStyle = $selectedStyleStore;
    if (!currentStyle) return;
    
    isProcessing = true;
    dispatch("processingStart");

    try {
      const response = await gas.sendMessage("updateMatchingStyles", { style: currentStyle });
      if (!response.success) {
        throw new Error(response.error || "Failed to apply style");
      }

      if (response.data?.updatedCount !== undefined) {
        dispatch("status", {
          type: "success",
          message: `Updated ${response.data.updatedCount} paragraphs`,
          executionTime: response.executionTime
        });
      }
    } catch (error) {
      dispatch("status", {
        type: "error",
        message: error instanceof Error ? error.message : "Failed to apply style"
      });
    } finally {
      isProcessing = false;
      dispatch("processingEnd");
    }
  }

  function handleDeleteAll() {
    textStyles.deleteAll();
    selectedStyleStore.set(null);
    showDeleteConfirm = false;
  }

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
</script>

<div class="flex flex-col items-stretch w-full gap-2">
  <!-- Style Dropdown -->
  <TextStyleDropdown
    selectedStyle={$selectedStyleStore}
    disabled={isProcessing}
    on:select={handleStyleSelect}
  />

  <!-- Buttons Section -->
  <TextButtons
    {isProcessing}
    {showDeleteConfirm}
    selectedStyle={$selectedStyleStore}
    savedCount={$textStyles.filter(s => s.saved).length}
    theme={$elementsTheme}
    on:insertStyleGuide={handleStyleGuideInsert}
    on:save={handleSaveStyle}
    on:apply={handleApplyStyle}
    on:deleteAll={handleDeleteAll}
    on:toggleDeleteConfirm={() => showDeleteConfirm = !showDeleteConfirm}
  />
</div>