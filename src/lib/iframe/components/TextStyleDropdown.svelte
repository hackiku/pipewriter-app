<!-- $lib/components/TextStyleDropdown.svelte -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { ChevronDown, X } from "lucide-svelte";
  import { cn } from "$lib/utils";

  interface HeadingStyle {
    value: string;
    tag: string;
    label: string;
    fontSize?: number;
    saved: boolean;
  }

  export let headingStyles: HeadingStyle[] = [
    { value: "NORMAL", tag: "p", label: "Normal text", fontSize: 11, saved: false },
    { value: "HEADING1", tag: "h1", label: "Heading 1", fontSize: 32, saved: false },
    { value: "HEADING2", tag: "h2", label: "Heading 2", fontSize: 24, saved: false },
    { value: "HEADING3", tag: "h3", label: "Heading 3", fontSize: 20, saved: false },
    { value: "HEADING4", tag: "h4", label: "Heading 4", fontSize: 16, saved: false },
    { value: "HEADING5", tag: "h5", label: "Heading 5", fontSize: 14, saved: false },
    { value: "HEADING6", tag: "h6", label: "Heading 6", fontSize: 12, saved: false },
  ];

  export let disabled = false;

  let showOptions = false;
  const dispatch = createEventDispatcher();

  $: savedCount = headingStyles.filter(s => s.saved).length;

  function handleSelect(style: HeadingStyle) {
    dispatch("select", style);
    showOptions = false;
  }

  function handleDeleteSaved(style: HeadingStyle) {
    dispatch("deleteSaved", style);
  }

  function handleDeleteAll() {
    dispatch("deleteAll");
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
                class="p-2 hover:bg-gray-200 
                       dark:hover:bg-gray-600 rounded-full transition-opacity"
                on:click={() => handleDeleteSaved(style)}
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
      )}
      {disabled}
      on:click={() => showOptions = !showOptions}
    >
      <span class="opacity-70">Select heading style</span>
      <ChevronDown
        class={cn(
          "h-4 w-4 transition-transform duration-200",
          showOptions && "rotate-180"
        )}
      />
    </button>

    {#if savedCount > 0}
      <button
        class="h-full aspect-square flex items-center justify-center border 
               border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 
               dark:hover:bg-gray-800 transition-colors relative group"
        on:click={handleDeleteAll}
      >
        <span class="text-xs">{savedCount}</span>
        <X class="h-3 w-3 absolute opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    {/if}
  </div>
</div>