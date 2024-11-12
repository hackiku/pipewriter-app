<!-- $lib/iframe/features/ai/AiTab.svelte -->
<script lang="ts">
  import { createEventDispatcher, getContext } from 'svelte';
  import { ArrowDown, ArrowUp, Trash2, Code, Clipboard, Tags } from 'lucide-svelte';
  import type { AppsScriptClient } from '../../utils/appsScript';
  import { promptStore, activePrompt } from '../../stores/promptStore';
  import PromptDropdown from './PromptDropdown.svelte';
  import HtmlButton from './HtmlButton.svelte';

  const dispatch = createEventDispatcher();
  const appsScript = getContext<AppsScriptClient>('appsScript');
  
  let isProcessing = false;
  let showPromptDropdown = false;

  // Common action configuration
  const ACTIONS = {
    DROP_HTML: {
      command: 'dropHtml',
      processingMessage: 'Converting document...',
      successMessage: (params: any) => 
        params.copyToClipboard 
          ? 'HTML copied to clipboard!' 
          : `HTML inserted at ${params.position || 'end'}!`,
      errorMessage: 'Failed to convert to HTML'
    },
    STRIP_HTML: {
      command: 'stripHtml',
      processingMessage: 'Stripping HTML...',
      successMessage: (params: any) => 
        params.all ? 'HTML content removed!' : 'HTML tags stripped!',
      errorMessage: 'Failed to strip HTML'
    }
  } as const;

  // Generic handler for all HTML operations
  async function handleHtmlAction(
    actionType: keyof typeof ACTIONS,
    params: Record<string, any> = {}
  ) {
    if (isProcessing) return;
    
    const action = ACTIONS[actionType];
    isProcessing = true;
    dispatch('processingStart');
    
    dispatch('status', {
      type: 'processing',
      message: action.processingMessage
    });

    try {
      // Add prompt if it exists
      const payload = {
        ...params,
        ...(actionType === 'DROP_HTML' && $activePrompt ? {
          prompt: $promptStore.useMasterPrompt 
            ? `${$activePrompt.content}\n\n––––––––––\n\n${$promptStore.prompts[0].content}`
            : $activePrompt.content
        } : {})
      };

      const response = await appsScript.sendMessage(
        action.command, 
        payload,
        status => dispatch('status', status)
      );
      
      if (response.success) {
        if (response.clipboardContent) {
          await navigator.clipboard.writeText(response.clipboardContent);
        }
        dispatch('status', {
          type: 'success',
          message: action.successMessage(params),
          executionTime: response.executionTime
        });
      } else {
        throw new Error(response.error || action.errorMessage);
      }
    } catch (error) {
      console.error(`${action.errorMessage}:`, error);
      dispatch('status', {
        type: 'error',
        message: error instanceof Error ? error.message : action.errorMessage
      });
    } finally {
      isProcessing = false;
      dispatch('processingEnd');
    }
  }

  // Action configurations
  const dropHtmlActions = [
    { 
      label: 'Start',
      icon: ArrowUp,
      onClick: () => handleHtmlAction('DROP_HTML', { position: 'start' })
    },
    {
      label: 'End',
      icon: ArrowDown,
      onClick: () => handleHtmlAction('DROP_HTML', { position: 'end' })
    },
    {
      label: 'Copy',
      icon: Clipboard,
      onClick: () => handleHtmlAction('DROP_HTML', { copyToClipboard: true })
    }
  ];

  const stripHtmlActions = [
    { 
      label: 'Tags',
      onClick: () => handleHtmlAction('STRIP_HTML', { tags: true })
    },
    { 
      label: 'All',
      onClick: () => handleHtmlAction('STRIP_HTML', { all: true })
    }
  ];
</script>

<div class="flex flex-col items-stretch w-full gap-3">
  <div class="relative">
    <PromptDropdown
      {isProcessing}
      bind:isOpen={showPromptDropdown}
    />
  </div>

  <HtmlButton
    icon={Code}
    label="Drop HTML"
    variant="icon-only"
    actions={dropHtmlActions}
    {isProcessing}
  />

  <HtmlButton
    icon={Trash2}
    label="Strip HTML"
    variant="text"
    actions={stripHtmlActions}
    {isProcessing}
  />
</div>