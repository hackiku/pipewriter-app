<!-- src/lib/pages/free/components/cta/FormatPreview.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Card } from "$lib/components/ui/card";
  import type { ExportFormat } from '../../stores/exportStore';
  import type { ContentStructure, ContentElement } from '../../types';
  import { formatStyles } from './formatStyles';

  export let content: ContentStructure;
  export let format: ExportFormat;
  export let onEdit: ((path: string[], value: string) => void) | undefined = undefined;

  let highlighted = '';
  let mounted = false;

  onMount(() => {
    // Load Prism.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    script.async = true;
    
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
    
    document.head.appendChild(css);
    document.head.appendChild(script);
    
    script.onload = () => {
      mounted = true;
    };
  });

  function formatContent(section: any): string {
    const styles = formatStyles[format];
    let output = '';

    // Add section comment based on format
    if (format === 'react') {
      output += `      {/* Section: ${section.id} */}\n      <section className="space-y-4">\n`;
    } else if (format === 'html' || format === 'tailwind') {
      output += `  <!-- Section: ${section.id} -->\n  <section${format === 'tailwind' ? ' class="space-y-4"' : ' id="' + section.id + '"'}>\n`;
    } else if (format === 'text') {
      output += `/* ${section.id.toUpperCase()} */\n`;
    }

    // Format main elements
    section.elements.forEach((element: ContentElement) => {
      const formatter = styles[element.type];
      if (typeof formatter === 'function') {
        output += formatter(element.value) + '\n';
      } else if (typeof formatter === 'string') {
        output += formatter(element.value) + '\n';
      }
    });

    // Close section tag for HTML and React
    if (format === 'react' || format === 'html' || format === 'tailwind') {
      output += format === 'react' ? '      </section>\n\n' : '  </section>\n\n';
    }

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
    .map((section) => formatContent(section))
    .join(format === 'text' ? '\n\n' : '\n');

  $: finalOutput = formatStyles[format].wrapper(formattedContent);

  $: if (mounted && window.Prism) {
    highlighted = Prism.highlight(
      finalOutput,
      Prism.languages[formatStyles[format].language],
      formatStyles[format].language
    );
  }
</script>

<Card class="p-4 h-full overflow-auto">
  {#if mounted}
    <pre class="!bg-transparent !m-0"><code class="language-{formatStyles[format].language}">{@html highlighted}</code></pre>
  {:else}
    <pre class="font-mono text-sm whitespace-pre-wrap">{finalOutput}</pre>
  {/if}
</Card>

<style>
  :global(pre[class*="language-"]) {
    background: transparent !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  :global(code[class*="language-"]) {
    font-size: 0.875rem !important;
    background: transparent !important;
    text-shadow: none !important;
  }
</style>