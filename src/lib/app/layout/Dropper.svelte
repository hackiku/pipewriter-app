<!-- lib/app/layout/Dropper.svelte -->
<script lang="ts">
  import { editorMode } from "../stores/editor";
  import { elements } from "../stores/elements";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";

  // Group elements by category
  $: availableElements = $elements.available;
  $: groupedElements = Object.values(availableElements).reduce((acc, element) => {
    if (!acc[element.category]) {
      acc[element.category] = [];
    }
    acc[element.category].push(element);
    return acc;
  }, {});

  function handleDragStart(event: DragEvent, elementId: string) {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData('application/pipewriter', elementId);
    event.dataTransfer.effectAllowed = 'copy';
  }
</script>

<div 
  class={cn(
    "fixed left-4 top-24 w-64 overflow-y-auto max-h-[calc(100vh-8rem)]",
    "transition-all duration-300 ease-in-out",
    $editorMode !== 'insert' && "opacity-0 pointer-events-none -translate-x-full"
  )}
>
  <div class="space-y-6 p-4">
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
                    "hover:border-primary hover:bg-primary/5 transition-colors duration-200",
                    "flex items-center justify-center bg-muted/50"
                  )}
                  draggable="true"
                  on:dragstart={(e) => handleDragStart(e, element.id)}
                >
                  <div class="text-2xl opacity-50">
                    <svelte:component this={element.icon} />
                  </div>
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
</div>