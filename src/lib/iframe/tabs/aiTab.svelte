<!-- $lib/iframe/tabs/AiTab.svelte -->
<script lang="ts">
  import { FileCode, Loader2, ThumbsUp, AlertCircle, ArrowDown, ArrowUp, Trash2 } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { GASCommunicator } from '../gasUtils';
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade, slide } from "svelte/transition";
  import AiPromptDropdown from "../components/AiPromptDropdown.svelte";
  import AiCodeBlock from "../components/AiCodeBlock.svelte";

  const dispatch = createEventDispatcher();
  let gasCommunicator: GASCommunicator;
  let isProcessing = false;
  let status: StatusUpdate | null = null;
  let selectedPrompt: string | null = null;
  let usePrompt = false;
  let generatedCode = "<h1>Cama</h1 <h2>donna</h2>";
  let showCodeBlock = true;

  interface StatusUpdate {
    type: 'success' | 'error' | 'processing';
    message: string;
    executionTime?: number;
  }

  onMount(() => {
    gasCommunicator = GASCommunicator.getInstance();
  });

  async function handleAction(position: 'start' | 'end') {
    if (isProcessing) return;
    
    isProcessing = true;
    updateStatus({
      type: 'processing',
      message: 'Converting...'
    });

    try {
      const response = await gasCommunicator.sendMessage('doc2html', { 
        position,
        prompt: usePrompt ? selectedPrompt : null 
      });
      
      if (response.success) {
        updateStatus({
          type: 'success',
          message: 'Conversion complete!',
          executionTime: response.executionTime
        });
        if (response.generatedCode) {
          generatedCode = response.generatedCode;
          showCodeBlock = true;
        }
      } else {
        throw new Error(response.error || 'Conversion failed');
      }
    } catch (error) {
      console.error('Failed to convert:', error);
      updateStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Conversion failed'
      });
    } finally {
      isProcessing = false;
    }
  }

  async function handleDeleteTags() {
    if (isProcessing) return;
    
    try {
      const response = await gasCommunicator.sendMessage('deleteHTMLtags', {});
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete tags');
      }
    } catch (error) {
      console.error('Failed to delete tags:', error);
    }
  }

  function updateStatus(newStatus: StatusUpdate) {
    status = newStatus;
    if (newStatus.type !== 'processing') {
      setTimeout(() => status = null, 3000);
    }
  }

  function handlePromptSelect(event: CustomEvent) {
    selectedPrompt = event.detail.prompt;
  }

  function handlePromptToggle(event: CustomEvent) {
    usePrompt = event.detail.usePrompt;
  }

  function handleCodeClose() {
    showCodeBlock = false;
  }

  $: statusClass = status && {
    success: "bg-green-500/5 border-green-500/10 text-green-700 dark:text-green-300",
    error: "bg-red-500/5 border-red-500/10 text-red-700 dark:text-red-300",
    processing: "bg-blue-500/5 border-blue-500/10 text-blue-700 dark:text-blue-300"
  }[status.type];
</script>

<div class="flex flex-col gap-4 w-full py-2">
  <!-- Code Block (floating above) -->
  {#if showCodeBlock && generatedCode}
    <div 
      class="absolute bottom-full left-0 right-0 mb-2 z-50"
      transition:slide={{ duration: 200, axis: 'y' }}
    >
      <!-- <AiCodeBlock 
        code={generatedCode}
        title="Generated HTML"
        onClose={handleCodeClose}
      /> -->

			
    </div>
  {/if}

  <!-- AI Prompt Dropdown -->
  <AiPromptDropdown
    {selectedPrompt}
    {usePrompt}
    disabled={isProcessing}
    on:select={handlePromptSelect}
    on:toggleUse={handlePromptToggle}
  />

  <!-- Doc to HTML Controls -->
  <div class="flex items-center gap-3 mt-1">
    <div class="flex-1">
      <Button 
        variant="outline" 
        class="w-full justify-start gap-2 h-9"
        on:click={handleDeleteTags}
        disabled={isProcessing}
      >
        <Trash2 class="h-4 w-4" />
        Delete Tags
      </Button>
    </div>

    <div class="flex gap-2">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button 
            variant="outline"
            size="sm"
            class="h-9 w-9 flex items-center justify-center"
            on:click={() => handleAction('start')}
            disabled={isProcessing}
          >
            <ArrowUp class="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Insert at document start</p>
        </Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button 
            variant="outline"
            size="sm"
            class="h-9 w-9 flex items-center justify-center"
            on:click={() => handleAction('end')}
            disabled={isProcessing}
          >
            <ArrowDown class="h-4 w-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Insert at document end</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </div>
  </div>

  <!-- Status Overlay -->
  {#if status}
    <div 
      class="absolute inset-0 z-50 flex items-center justify-center rounded-lg border backdrop-blur-[0.2em] transition-all duration-200 {statusClass}"
      transition:fade={{ duration: 200 }}
    >
      <div class="flex items-center gap-2 px-4 py-2">
        {#if status.type === 'processing'}
          <Loader2 class="h-4 w-4 animate-spin" />
        {:else if status.type === 'success'}
          <ThumbsUp class="h-4 w-4" />
        {:else if status.type === 'error'}
          <AlertCircle class="h-4 w-4" />
        {/if}
        <span class="text-sm font-medium">{status.message}</span>
        {#if status.executionTime}
          <span class="text-xs text-muted-foreground">
            ({status.executionTime}ms)
          </span>
        {/if}
      </div>
    </div>
  {/if}
</div>