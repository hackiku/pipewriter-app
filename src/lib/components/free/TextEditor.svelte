<!-- $lib/components/free/TextEditor.svelte -->
<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea";
  import { onMount } from 'svelte';
  export let value: string;
  export let readonly: boolean = false;

  let editor: HTMLDivElement;

  onMount(() => {
    if (editor) {
      editor.addEventListener('keydown', (e: KeyboardEvent) => {
        // Prevent new lines
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      });

      // Handle paste to strip formatting
      editor.addEventListener('paste', (e: ClipboardEvent) => {
        e.preventDefault();
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