<!-- $lib/components/TextStyleDropdown.svelte -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { ChevronUp, X } from "lucide-svelte";
  import { cn } from "$lib/utils";

  interface HeadingStyle {
    value: string;
    tag: string;
    label: string;
    fontSize?: number;
    saved: boolean;
  }

  export let headingStyles: HeadingStyle[] = [];
  export let disabled = false;
  export let selectedStyle: HeadingStyle | null = null;

  let showOptions = false;
  let showDeleteConfirm = false;
  const dispatch = createEventDispatcher();

  $: savedCount = headingStyles.filter(s => s.saved).length;

  function handleSelect(style: HeadingStyle) {
    dispatch("select", style);
    selectedStyle = style;
    showOptions = false;
  }

  function handleDeleteSaved(style: HeadingStyle, e: MouseEvent) {
    e.stopPropagation();
    dispatch("deleteSaved", style);
  }

  function handleDeleteAll() {
    if (!showDeleteConfirm) {
      showDeleteConfirm = true;
      return;
    }
    dispatch("deleteAll");
    showDeleteConfirm = false;
  }
</script>

<div class="relative">
  {#if showOptions}
    <div
      class="absolute bottom-full mb-1 w-full p-2 bg-white dark:bg-gray-800 
             rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg z-20"
      transition:slide={{ duration: 150, axis: "y" }}
    >
      <div class="flex flex-col gap-0.5">
        {#each headingStyles as style}
          <div class={cn(
            "flex items-center justify-between px-2 py-1.5 rounded-sm group",
            style.saved && "bg-gray-500/5 border-2 border-primary",
            !style.saved && "hover:bg-gray-50 dark:hover:bg-gray-700"
          )}>
            <button
              class="flex-1 text-left text-[10px] font-mono"
              on:click={() => handleSelect(style)}
            >
              <div class="flex items-center gap-2">
                <span class="opacity-70">{style.tag}</span>
                <span class="text-[9px] text-muted-foreground"
                  style={style.fontSize ? `font-size: ${style.fontSize}px` : ''}>
                  {style.label}
                </span>
              </div>
            </button>
            {#if style.saved}
              <button 
                class="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 
                       dark:hover:bg-gray-600 rounded-full transition-opacity"
                on:click={(e) => handleDeleteSaved(style, e)}
              >
                <X class="h-3 w-3" />
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <div class="flex gap-2 h-8">
    <button
      class={cn(
        "h-full w-full justify-between px-3 font-mono text-xs flex items-center",
        "border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
        selectedStyle?.saved && "bg-gray-500/5 border-2 border-primary"
      )}
      {disabled}
      on:click={() => showOptions = !showOptions}
    >
      {#if selectedStyle}
        <span class="flex items-center gap-2">
          <span class="opacity-70">{selectedStyle.tag}</span>
          <span class="text-muted-foreground" style={selectedStyle.fontSize ? `font-size: ${selectedStyle.fontSize}px` : ''}>
            {selectedStyle.label}
          </span>
        </span>
      {:else}
        <span class="opacity-70">Saved text styles</span>
      {/if}
      <ChevronUp
        class={cn(
          "h-4 w-4 transition-transform duration-200",
          showOptions && "rotate-180"
        )}
      />
    </button>

    {#if savedCount > 0}
      <button
        class={cn(
          "h-full w-20 flex items-center justify-center transition-colors relative group",
          "border rounded-md text-xs",
          showDeleteConfirm ? "bg-red-50 hover:bg-red-100 border-red-200 text-red-600" 
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200"
        )}
        on:click={handleDeleteAll}
      >
        {#if showDeleteConfirm}
          <span class="text-xs">Confirm</span>
        {:else}
          <span class="text-xs">{savedCount}</span>
          <X class="h-3 w-3 absolute opacity-0 group-hover:opacity-100 transition-opacity" />
        {/if}
      </button>
    {/if}
  </div>
</div>