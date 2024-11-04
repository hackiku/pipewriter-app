<!-- $lib/iframe/tabs/AiTab.svelte -->
<script lang="ts">
  import { Code, FileCode, Trash2, ArrowDown, ArrowUp, Copy, MousePointer } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  
  // Modified callGAS to ensure proper message structure
  function callGAS(action: string, params: Record<string, any> = {}) {
    // Create the message with explicit position handling
    const payload = {
      ...params,
    };
    
    // Log the full message for debugging
    console.log('Sending message:', { action, payload });
    
    // Send structured message to parent
    window.parent.postMessage(
      JSON.stringify({
        action,
        payload
      }),
      '*'
    );
  }
  
  const complexActions = [
    {
      icon: FileCode,
      label: "HTML",
      action: "doc2html",
      tooltip: "Convert document headings to HTML tags"
    },
    {
      icon: Code,
      label: "HTML to Doc",
      action: "html2doc", 
      tooltip: "Convert HTML tags to document headings"
    }
  ];

  // Debug function to verify message structure
  function handleAction(action: string, position: 'start' | 'cursor' | 'end' | undefined) {
    console.log(`Handling action: ${action} with position: ${position}`);
    callGAS(action, { position });
  }
</script>

<div class="flex flex-col gap-4 w-full py-2">
  {#each complexActions as { icon, label, action, tooltip }}
    <div class="flex flex-col">
      <div class="flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900">
        <div class="flex items-center gap-2 flex-1">
          <svelte:component this={icon} class="h-4 w-4 text-muted-foreground" />
          <div class="h-8 border-r border-gray-200 dark:border-gray-700" />
          <div class="flex gap-1">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  class="h-8 px-2"
                  on:click={() => handleAction(action, 'start')}
                >
                  <ArrowUp class="h-4 w-4" />
                  <span class="sr-only">Insert at start</span>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>Insert at document start</p>
              </Tooltip.Content>
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  class="h-8 px-2"
                  on:click={() => handleAction(action, 'cursor')}
                >
                  <MousePointer class="h-4 w-4" />
                  <span class="sr-only">Insert at cursor</span>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>Insert at cursor position</p>
              </Tooltip.Content>
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  class="h-8 px-2"
                  on:click={() => handleAction(action, 'end')}
                >
                  <ArrowDown class="h-4 w-4" />
                  <span class="sr-only">Insert at end</span>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>Insert at document end</p>
              </Tooltip.Content>
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  class="h-8 px-2"
                  on:click={() => handleAction(action, undefined)}
                >
                  <Copy class="h-4 w-4" />
                  <span class="sr-only">Copy to clipboard</span>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>Copy to clipboard</p>
              </Tooltip.Content>
            </Tooltip.Root>
          </div>
        </div>
      </div>
    </div>
  {/each}

  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <Button 
        variant="outline" 
        class="w-full justify-start gap-2 h-9"
        on:click={() => callGAS('deleteHTMLtags')}
      >
        <Trash2 class="h-4 w-4" />
        Delete Tags
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>Remove all HTML tags from document</p>
    </Tooltip.Content>
  </Tooltip.Root>
</div>