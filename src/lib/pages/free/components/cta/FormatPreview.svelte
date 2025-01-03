<!-- src/lib/pages/free/components/cta/FormatPreview.svelte -->
<script lang="ts">
  import { Card } from "$lib/components/ui/card";
  import type { ExportFormat } from '../../stores/exportStore';
  import type { ContentStructure, ContentElement } from '../../types';
  import { formatStyles } from './formatStyles';

  export let content: ContentStructure;
  export let format: ExportFormat;
  export let onEdit: ((path: string[], value: string) => void) | undefined = undefined;

  function formatContent(section: any): string {
    const styles = formatStyles[format];
    let output = '';

    // Format main elements
    section.elements.forEach((element: ContentElement) => {
      const formatter = styles[element.type];
      if (typeof formatter === 'function') {
        output += formatter(element.value) + '\n';
      } else if (typeof formatter === 'string') {
        output += `<div class="${formatter}">${element.value}</div>\n`;
      }
    });

    // Format children if they exist
    if (section.children) {
      section.children.forEach((child) => {
        output += formatContent(child);
      });
    }

    return output;
  }

  $: formattedContent = content.sections
    .sort((a, b) => a.order - b.order)
    .map((section) => {
      let output = `/* ${section.id.toUpperCase()} */\n`;
      output += formatContent(section);
      return output;
    })
    .join('\n\n');

  $: finalOutput = formatStyles[format].wrapper(formattedContent);
</script>

<Card class="p-4 h-full overflow-auto">
  <pre class="font-mono text-sm whitespace-pre-wrap">{finalOutput}</pre>
</Card>