<!-- src/lib/pages/free/components/cta/TextEditor.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { editorStore } from '../../stores/editorStore';
  
  export let value: string;
  export let readonly: boolean = false;

  let editor: HTMLDivElement;

  function handleInput(event: Event) {
    if (readonly) return;
    
    const target = event.target as HTMLDivElement;
    const content = target.innerText;
    
    // Parse the content and update store
    const sections = content.split('\n\n');
    sections.forEach(section => {
      const lines = section.split('\n');
      
      // Match section by its heading format
      if (lines[0].startsWith('# ')) { // Hero section
        editorStore.updateContent(['hero', 'headline'], lines[0].replace('# ', ''));
        if (lines[1]) {
          editorStore.updateContent(['hero', 'eyebrow'], lines[1]);
        }
      } else if (lines[0] === '## Features') { // Features section
        const blurbs = [];
        for (let i = 2; i < lines.length; i += 2) {
          if (!lines[i]) continue;
          const [emoji, ...titleParts] = lines[i].split(' ');
          const description = lines[i + 1];
          blurbs.push({
            emoji,
            title: titleParts.join(' '),
            description
          });
        }
        editorStore.updateContent(['features', 'blurbs'], blurbs);
      }
      // Add more section parsing as needed
    });
  }

  onMount(() => {
    if (editor) {
      editor.addEventListener('keydown', (e: KeyboardEvent) => {
        if (readonly) return;
        
        // Allow basic editing keys
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        if (!allowedKeys.includes(e.key)) {
          // Only allow alphanumeric and punctuation
          if (!/^[\w\s.,!?-]$/.test(e.key)) {
            e.preventDefault();
          }
        }
      });

      // Handle paste to strip formatting
      editor.addEventListener('paste', (e: ClipboardEvent) => {
        e.preventDefault();
        if (readonly) return;
        
        const text = e.clipboardData?.getData('text/plain') || '';
        document.execCommand('insertText', false, text);
      });
    }
  });
</script>

<div class="flex flex-col gap-4">
  <div
    bind:this={editor}
    contenteditable={!readonly}
    on:input={handleInput}
    class="flex-1 min-h-[400px] font-mono text-sm text-muted-foreground whitespace-pre-wrap p-3 rounded-md border bg-muted/5 overflow-y-auto outline-none
      [&_strong]:text-foreground 
      [&_h1]:text-foreground 
      [&_h2]:text-foreground 
      [&_h3]:text-foreground
      [&_.highlight]:bg-primary/5
      [&_.highlight]:rounded-md 
      [&_.highlight]:px-1 
      [&_.highlight]:relative"
  >
    {@html value.replace(/\n/g, '<br>')}
  </div>
</div>

<style>
  :global(.highlight) {
    position: relative;
    border-radius: 4px;
    background: linear-gradient(to right, rgba(54,68,254,0.1), rgba(179,69,237,0.1));
  }

  :global(.highlight::before) {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 6px;
    padding: 2px;
    background: linear-gradient(to right, #3644FE, #B345ED);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
  }
</style>