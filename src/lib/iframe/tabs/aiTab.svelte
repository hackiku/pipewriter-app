<!-- $lib/iframe/tabs/aiTab.svelte -->
 
<script lang="ts">
  import { Code, FileCode, Trash2 } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  
  function callGAS(action: string, params: Record<string, any> = {}) {
    const message = { action, params };
    window.parent.postMessage(JSON.stringify(message), '*');
  }
  
  const actions = [
    {
      icon: FileCode,
      label: "Doc to HTML",
      action: "doc2html",
      tooltip: "Convert document headings to HTML tags"
    },
    {
      icon: Code,
      label: "HTML to Doc",
      action: "html2doc",
      tooltip: "Convert HTML tags to document headings"
    },
    {
      icon: Trash2,
      label: "Delete Tags",
      action: "deleteHTMLtags",
      tooltip: "Remove all HTML tags from document"
    }
  ];
</script>

<div class="flex flex-col gap-2 w-full py-2">
  {#each actions as { icon, label, action, tooltip }}
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button 
          variant="outline" 
          class="w-full justify-start gap-2 h-9"
          on:click={() => callGAS(action)}
        >
          <svelte:component this={icon} class="h-4 w-4" />
          {label}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>{tooltip}</p>
      </Tooltip.Content>
    </Tooltip.Root>
  {/each}
</div>