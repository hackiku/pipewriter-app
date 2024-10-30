<!-- lib/app/layout/Dropper.svelte -->
<script lang="ts">
  import { editorMode } from "../stores/editor";
  import { elements } from "../stores/elements";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";

  // Group elements by category
  $: groupedElements = Object.values($elements).reduce((acc, element) => {
    if (!acc[element.category]) {
      acc[element.category] = [];
    }
    acc[element.category].push(element);
    return acc;
  }, {});

  let isDragging = false;
  
  function handleDragStart(element) {
    isDragging = true;
  }

  function handleDragEnd() {
    isDragging = false;
  }
</script>

<div class="fixed left-4 top-24 w-64 overflow-y-auto max-h-[calc(100vh-8rem)]">
  {#if $editorMode === 'insert'}
    <div class="space-y-6">
      {#each Object.entries(groupedElements) as [category, elements]}
        <div>
          <h3 class="mb-3 text-sm font-medium text-muted-foreground uppercase">
            {category}
          </h3>
          <div class="grid grid-cols-2 gap-2">
            {#each elements as element}
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    class={cn(
                      "aspect-video w-full rounded-lg border-2 border-dashed",
                      "hover:border-primary transition-colors duration-200",
                      "flex items-center justify-center bg-muted/50"
                    )}
                    draggable="true"
                    on:dragstart={() => handleDragStart(element)}
                    on:dragend={handleDragEnd}
                  >
                    <!-- Replace with actual element preview/icon -->
                    <div class="text-2xl opacity-50">{element.icon || '⬒'}</div>
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p class="text-sm">{element.description}</p>
                </Tooltip.Content>
              </Tooltip.Root>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>