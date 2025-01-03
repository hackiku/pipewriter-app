<!-- src/lib/pages/free/components/cta/TextEditor.svelte -->
<script lang="ts">
  import type { Section } from '../../types';
  
  export let content: Record<string, any>;
  export let sections: Section[];

  function formatContent(content: Record<string, any>, sections: Section[]): string {
    let formatted = '';

    for (const section of sections) {
      const sectionContent = content[section.type];
      
      switch (section.type) {
        case 'hero':
          formatted += `# ${sectionContent.headline}\n`;
          formatted += `${sectionContent.eyebrow}\n\n`;
          break;

        case 'features':
          if (sectionContent.blurbs?.length) {
            formatted += `## Features\n\n`;
            sectionContent.blurbs.forEach((blurb: any) => {
              formatted += `${blurb.emoji} ${blurb.title}\n`;
              formatted += `${blurb.description}\n\n`;
            });
          }
          break;
          
        case 'cta':
          formatted += `## ${sectionContent.headline}\n\n`;
          break;

        case 'testimonials':
          if (sectionContent.items?.length) {
            formatted += `## ${sectionContent.title}\n\n`;
            sectionContent.items.forEach((item: any) => {
              formatted += `"${item.quote}"\n`;
              formatted += `— ${item.author}\n\n`;
            });
          }
          break;
      }
    }

    return formatted.trim();
  }

  $: formattedText = formatContent(content, sections);
</script>

<div class="flex flex-col gap-4">
  <div
    class="flex-1 min-h-[400px] font-mono text-sm text-muted-foreground whitespace-pre-wrap p-3 rounded-md border bg-muted/5 overflow-y-auto
      [&_strong]:text-foreground 
      [&_h1]:text-foreground 
      [&_h2]:text-foreground 
      [&_h3]:text-foreground
      [&_.highlight]:bg-primary/5
      [&_.highlight]:rounded-md 
      [&_.highlight]:px-1"
  >
    <pre class="font-mono whitespace-pre-wrap">{formattedText}</pre>
  </div>
</div>