<!-- $lib/iframe/features/ai/AiTab.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ArrowDown, ArrowUp, Trash2 } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import PromptSelect from './PromptSelect.svelte';
  import { promptStore, activePrompt } from '../../stores/promptStore';
  import { AppsScriptClient } from '../../utils/appsScript';
  import { cn } from "$lib/utils";

  const dispatch = createEventDispatcher();
  const client = AppsScriptClient.getInstance();
  
  let isProcessing = false;
  let showPromptSelect = false;

  async function handleAction(position: 'start' | 'end') {
    if (isProcessing) return;
    
    isProcessing = true;
    dispatch('processingStart');
    dispatch('status', {
      type: 'processing',
      message: 'Converting document...'
    });

    try {
      const promptPayload = $activePrompt 
        ? { prompt: $activePrompt.content }
        : {};

      const response = await client.sendMessage('doc2html', {
        position,
        ...promptPayload
      });
      
      if (response.success) {
        dispatch('status', {
          type: 'success',
          message: 'Conversion complete!',
          executionTime: response.executionTime
        });
      } else {
        throw new Error(response.error || 'Conversion failed');
      }
    } catch (error) {
      console.error('Failed to convert:', error);
      dispatch('status', {
        type: 'error',
        message: error instanceof Error ? error.message : 'Conversion failed'
      });
    } finally {
      isProcessing = false;
      dispatch('processingEnd');
    }
  }

  async function handleDeleteTags() {
    if (isProcessing) return;
    
    isProcessing = true;
    dispatch('processingStart');
    dispatch('status', {
      type: 'processing',
      message: 'Removing HTML tags...'
    });

    try {
      const response = await client.sendMessage('deleteHTMLtags', {});
      
      if (response.success) {
        dispatch('status', {
          type: 'success',
          message: 'Tags removed successfully',
          executionTime: response.executionTime
        });
      } else {
        throw new Error(response.error || 'Failed to remove tags');
      }
    } catch (error) {
      console.error('Failed to remove tags:', error);
      dispatch('status', {
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to remove tags'
      });
    } finally {
      isProcessing = false;
      dispatch('processingEnd');
    }
  }

  $: actionButtonClass = cn(
    "h-9",
    $activePrompt && "border-primary bg-primary/5"
  );
</script>

<div class="flex flex-col items-stretch w-full gap-2 pt-4">
  <div class="px-4">
    <PromptSelect
      {isProcessing}
      bind:isOpen={showPromptSelect}
    />

    <div class="grid grid-cols-2 gap-2 mt-4">
      <Button 
        variant="outline"
        class={actionButtonClass}
        on:click={() => handleAction('start')}
        disabled={isProcessing}
      >
        <ArrowUp class="h-4 w-4 mr-2" />
        Start
      </Button>

      <Button 
        variant="outline"
        class={actionButtonClass}
        on:click={() => handleAction('end')}
        disabled={isProcessing}
      >
        <ArrowDown class="h-4 w-4 mr-2" />
        End
      </Button>
    </div>

    <div class="mt-2">
      <Button 
        variant="outline"
        class="w-full justify-start gap-2 h-9"
        on:click={handleDeleteTags}
        disabled={isProcessing}
      >
        <Trash2 class="h-4 w-4" />
        Delete HTML Tags
      </Button>
    </div>
  </div>
</div>