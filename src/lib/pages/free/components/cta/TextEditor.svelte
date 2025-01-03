<!-- src/lib/pages/free/components/cta/TextEditor.svelte -->
<script lang="ts">
  import { contentStore } from '../../stores/contentStore';
  import { exportStore } from '../../stores/exportStore';
  import ExportOptions from './ExportOptions.svelte';
  import type { ContentElement, ContentSection } from '../../types';
  import { Card } from "$lib/components/ui/card";
  import { Copy } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { fade } from 'svelte/transition';

  let copySuccess = false;
  let activeField: string | null = null;

  // Helper to format tags based on export format
  function getWrapperTags(element: ContentElement, format: string): { start: string; end: string } {
    switch(format) {
      case 'html':
        return { 
          start: `<${element.type}>`, 
          end: `</${element.type}>`
        };
      case 'react':
        return {
          start: `<${element.type} className="...">`,
          end: `</${element.type}>`
        };
      case 'markdown':
        const mdTags = {
          h1: { start: '# ', end: '' },
          h2: { start: '## ', end: '' },
          h3: { start: '### ', end: '' },
          quote: { start: '> ', end: '' },
        };
        return mdTags[element.type] || { start: '', end: '' };
      default:
        return { start: '', end: '' };
    }
  }

  function handleInput(event: Event, path: string[]) {
    const target = event.target as HTMLElement;
    contentStore.updateField(path, target.innerText);
  }

  function handleFocus(path: string) {
    activeField = path;
  }

  function handleBlur() {
    activeField = null;
  }

  async function copyToClipboard() {
    try {
      const text = document.querySelector('.code-content')?.textContent || '';
      await navigator.clipboard.writeText(text);
      copySuccess = true;
      setTimeout(() => copySuccess = false, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  $: sections = $contentStore.content.sections.sort((a, b) => a.order - b.order);
  $: format = $exportStore.selectedFormat;
</script>

<div class="relative h-[500px] rounded-lg border bg-card">
  <div class="h-full overflow-y-auto hide-scrollbar">
    <div class="relative p-4 pb-32">
      <!-- Copy button -->
      <div class="absolute top-4 right-4 z-10">
        <Button 
          variant="ghost" 
          size="sm" 
          class="gap-2 text-xs" 
          on:click={copyToClipboard}
        >
          <Copy class="w-3 h-3" />
          {#if copySuccess}
            <span transition:fade>Copied!</span>
          {:else}
            Copy
          {/if}
        </Button>
      </div>

      <!-- Code content -->
      <div class="font-mono text-sm code-content">
        {#each sections as section}
          <div class="mb-8">
            <!-- Section comment -->
            <div class="text-xs text-muted-foreground/70 mb-2 font-mono">
              {#if format === 'react'}
                {`{/* ${section.id} Section */}`}
              {:else if format === 'html' || format === 'tailwind'}
                {`<!-- ${section.id} -->`}
              {:else}
                {`/* ${section.id.toUpperCase()} */`}
              {/if}
            </div>

            <!-- Section content -->
            {#each section.elements as element}
              <div class="group relative mb-2">
                <div class="flex items-start">
                  <!-- Opening tag -->
                  {#if format !== 'text'}
                    <span class="text-blue-500 dark:text-blue-400 select-none mr-2">
                      {getWrapperTags(element, format).start}
                    </span>
                  {/if}

                  <!-- Editable content -->
                  <div
                    contenteditable="true"
                    class="outline-none min-w-[1rem] min-h-[1em] rounded transition-colors
                           {element.type === 'h1' ? 'font-bold' : 
                            element.type === 'h2' ? 'font-semibold' : 
                            element.type === 'h3' ? 'font-medium' : ''}"
                    on:input={(e) => handleInput(e, element.path)}
                    on:focus={() => handleFocus(element.path.join('.'))}
                    on:blur={handleBlur}
                  >{element.value}</div>

                  <!-- Closing tag -->
                  {#if format !== 'text' && getWrapperTags(element, format).end}
                    <span class="text-blue-500 dark:text-blue-400 select-none ml-2">
                      {getWrapperTags(element, format).end}
                    </span>
                  {/if}
                </div>

                <!-- Active highlight effect -->
                {#if activeField === element.path.join('.')}
                  <div 
                    class="absolute -inset-px -mx-2 rounded pointer-events-none
                           bg-gradient-to-r from-primary/5 to-primary/10
                           border-2 border-dashed border-primary/20"
                  />
                {/if}
              </div>
            {/each}
          </div>

          {#if section !== sections[sections.length - 1]}
            <hr class="my-6 border-border" />
          {/if}
        {/each}
      </div>
    </div>

    <!-- Gradient overlay and export options -->
    <div class="absolute bottom-0 inset-x-0">
      <div class="h-24 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none" />
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

  [contenteditable="true"]:hover {
    background: rgb(var(--muted) / 0.1);
  }

  [contenteditable="true"]:focus {
    background: rgb(var(--muted) / 0.2);
    padding: 0 0.5rem;
    margin: 0 -0.5rem;
  }

  ::selection {
    background: rgb(var(--primary) / 0.2);
  }
</style>