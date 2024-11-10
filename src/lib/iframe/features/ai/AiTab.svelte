<!-- $lib/iframe/features/ai/AiTab.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { FileCode, ArrowDown, ArrowUp, Trash2 } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import { slide } from "svelte/transition";
  import AiPromptDropdown from "./AiPromptDropdown.svelte";
  import { promptStore, activePrompt } from '../../stores/promptStore';
  import { AppsScriptClient } from '../../utils/appsScript';
  import { cn } from "$lib/utils";

  const dispatch = createEventDispatcher();
  const client = AppsScriptClient.getInstance();
  
  let isProcessing = false;
  let showPromptDropdown = false;

  async function handleAction(position: 'start' | 'end') {
    if (isProcessing) return;
    
    isProcessing = true;
    dispatch('processingStart');
    dispatch('status', {
      type: 'processing',
      message: 'Converting document...'
    });

    try {
      // Include prompt if usePrompt is true in store
      const promptPayload = $promptStore.usePrompt && $activePrompt 
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

  $: conversionButtonClass = cn(
    "h-9",
    $activePrompt && $promptStore.usePrompt && "border-primary"
  );
</script>

<div class="flex flex-col gap-4 w-full py-2">
  <!-- AI Prompt Dropdown -->
  <div class="px-4">
    <AiPromptDropdown 
      {isProcessing}
      bind:showDropdown={showPromptDropdown} 
    />
  </div>

  <!-- Convert Buttons -->
  <div class="px-4 grid grid-cols-2 gap-2">
    <Button 
      variant="outline"
      class={conversionButtonClass}
      on:click={() => handleAction('start')}
      disabled={isProcessing}
    >
      <ArrowUp class="h-4 w-4 mr-2" />
      To Start
    </Button>

    <Button 
      variant="outline"
      class={conversionButtonClass}
      on:click={() => handleAction('end')}
      disabled={isProcessing}
    >
      <ArrowDown class="h-4 w-4 mr-2" />
      To End
    </Button>
  </div>

  <!-- Delete Tags Button -->
  <div class="px-4">
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