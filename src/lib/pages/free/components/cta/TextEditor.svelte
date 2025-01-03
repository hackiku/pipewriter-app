<!-- src/lib/pages/free/components/cta/TextEditor.svelte -->
<script lang="ts">
  import { contentStore } from '../../stores/contentStore';
  import { exportStore } from '../../stores/exportStore';
  import ExportOptions from './ExportOptions.svelte';
  import type { ContentElement, ContentSection } from '../../types';
  
  function handleContentEdit(event: Event) {
    const target = event.target as HTMLElement;
    const path = target.dataset.path?.split('.') || [];
    if (path.length > 0) {
      contentStore.updateField(path, target.innerText);
    }
  }

  function renderElement(element: ContentElement) {
    const classes = {
      h1: 'text-4xl font-bold mb-4',
      h2: 'text-2xl font-semibold mb-3',
      h3: 'text-xl font-medium mb-2',
      text: 'text-base mb-2',
      button: 'font-medium text-primary',
      quote: 'italic text-muted-foreground',
      label: 'text-sm text-muted-foreground',
      emoji: 'text-2xl mr-2',
      image: 'text-sm text-muted-foreground italic'
    }[element.type];

    const value = element.type === 'quote' ? `"${element.value}"` : element.value;

    return `
      <div
        contenteditable="true"
        data-path="${element.path.join('.')}"
        class="${classes} ${element.metadata?.className || ''}"
      >${value}</div>
    `;
  }

  function renderSection(section: ContentSection): string {
    let output = `
      <div class="mb-8">
        <!-- Section elements -->
        ${section.elements.map(renderElement).join('\n')}
        
        <!-- Children elements if any -->
        ${section.children ? 
          section.children.map(child => `
            <div class="ml-4 mb-4">
              ${child.elements.map(renderElement).join('\n')}
            </div>
          `).join('\n') 
          : ''
        }
      </div>
    `;

    return output;
  }

  $: sections = $contentStore.content.sections.sort((a, b) => a.order - b.order);
</script>

<div class="relative h-[500px]">
  <div class="h-full overflow-y-auto pb-20">
    <div class="font-mono text-sm whitespace-pre-wrap p-3 rounded-md border bg-muted/5">
      {#each sections as section}
        <!-- Section Header -->
        <div class="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">
          {section.id}
        </div>

        <!-- Section Content -->
        {@html renderSection(section)}

        <!-- Section Divider -->
        {#if section !== sections[sections.length - 1]}
          <hr class="my-6 border-muted" />
        {/if}
      {/each}
    </div>
  </div>

  <!-- Bottom Gradient & Export Options -->
  <div class="absolute bottom-0 inset-x-0 h-24 pointer-events-none
              bg-gradient-to-t from-background via-background/80 to-transparent" />
  
  <div class="absolute bottom-4 inset-x-0">
    <ExportOptions />
  </div>
</div>

<style>
  [contenteditable="true"] {
    outline: none;
    min-width: 1rem;
    min-height: 1em;
    cursor: text;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
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