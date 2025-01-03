<!-- src/lib/pages/free/components/cta/TextEditor.svelte -->
<script lang="ts">
  import { contentStore } from '../../stores/contentStore';
  import { exportStore } from '../../stores/exportStore';
  import ExportOptions from './ExportOptions.svelte';
  import type { ContentElement, ContentSection } from '../../types';
  import { Card } from "$lib/components/ui/card";
  
  function handleContentEdit(event: Event) {
    const target = event.target as HTMLElement;
    const path = target.dataset.path?.split('.') || [];
    if (path.length > 0) {
      contentStore.updateField(path, target.innerText);
    }
  }

  function getElementClasses(element: ContentElement): string {
    const formatter = exportStore.getStylesForFormat($exportStore.selectedFormat)[element.type];
    return formatter.className || '';
  }

  $: sections = $contentStore.content.sections.sort((a, b) => a.order - b.order);
</script>

<div class="relative h-[500px] rounded-lg border bg-card">
  <!-- Main scrollable content -->
  <div class="h-full overflow-y-auto hide-scrollbar">
    <div class="p-4 pb-32">
      {#each sections as section}
        <!-- Section Header -->
        <div class="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">
          {section.id}
        </div>

        <!-- Section Content -->
        <div class="mb-8">
          {#each section.elements as element}
            <div
              contenteditable="true"
              data-path={element.path.join('.')}
              class={getElementClasses(element)}
              on:input={handleContentEdit}
            >{element.value}</div>
          {/each}

          {#if section.children}
            {#each section.children as child}
              <div class="ml-4 mb-4">
                {#each child.elements as element}
                  <div
                    contenteditable="true"
                    data-path={element.path.join('.')}
                    class={getElementClasses(element)}
                    on:input={handleContentEdit}
                  >{element.value}</div>
                {/each}
              </div>
            {/each}
          {/if}
        </div>

        {#if section !== sections[sections.length - 1]}
          <hr class="my-6 border-border" />
        {/if}
      {/each}
    </div>

    <!-- Gradient overlay and export options -->
    <div class="absolute bottom-0 inset-x-0">
      <div class="h-32 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none" />
      <div class="absolute bottom-4 inset-x-0 pointer-events-auto">
        <ExportOptions />
      </div>
    </div>
  </div>
</div>

<style>
  .hide-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  [contenteditable="true"] {
    outline: none;
    min-width: 1rem;
    min-height: 1em;
    cursor: text;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
    margin-bottom: 0.5rem;
  }

  [contenteditable="true"]:hover {
    background: rgb(var(--muted) / 0.1);
  }

  [contenteditable="true"]:focus {
    background: rgb(var(--muted) / 0.2);
  }

  ::selection {
    background: rgb(var(--primary) / 0.2);
  }
</style>