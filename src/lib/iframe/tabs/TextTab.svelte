<!-- $lib/iframe/tabs/TextTab.svelte -->
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { Button } from "$lib/components/ui/button";
  import { Loader2, ThumbsUp, AlertCircle, Heading, ChevronDown } from 'lucide-svelte';
  import { getElement } from '../elements';
  import ElementCard from "../components/ElementCard.svelte";
  import { elementsTheme, showInfo } from '../stores';
  import { cn } from "$lib/utils";
  import OutlineButton from "../components/OutlineButton.svelte";

  const headingOptions = [
    { value: 'HEADING1', label: '<h1>Headline', description: 'Heading 1' },
    { value: 'HEADING2', label: '<h2>Header', description: 'Heading 2' },
    { value: 'HEADING3', label: '<h3>Feature Title', description: 'Heading 3' },
    { value: 'HEADING4', label: '<button>CTA', description: 'Heading 4' },
    { value: 'HEADING5', label: '<h5>Eyebrow', description: 'Heading 5' },
    { value: 'HEADING6', label: '<p>Body text', description: 'Heading 6' },
    { value: 'NORMAL', label: 'Notes', description: 'Normal text' },
  ];

  const dispatch = createEventDispatcher();
  const elementId = "styleguide";
  const element = getElement(elementId);
  
  let isProcessing = false;
  let status: StatusUpdate | null = null;
  let selectedHeading: string = headingOptions[0].value;
  let showOptions = false;

  interface StatusUpdate {
    type: 'success' | 'error' | 'processing';
    message: string;
    executionTime?: number;
  }

  function handleSetHeading(value: string) {
    if (isProcessing) return;
    selectedHeading = value;
    showOptions = false;
    
    window.parent.postMessage(JSON.stringify({
      action: 'setHeading',
      payload: { heading: value }
    }), '*');
  }

  async function handleUpdateHeading() {
    if (isProcessing) return;
    
    isProcessing = true;
    dispatch('processingStart');
    updateStatus({
      type: 'processing',
      message: 'Updating heading styles...'
    });

    try {
      window.parent.postMessage(JSON.stringify({
        action: 'updateHeading',
        payload: {}
      }), '*');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStatus({
        type: 'success',
        message: 'Styles updated!',
        executionTime: 1000
      });
    } catch (error) {
      updateStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to update styles'
      });
    } finally {
      isProcessing = false;
      dispatch('processingEnd');
    }
  }

  function updateStatus(newStatus: StatusUpdate) {
    status = newStatus;
    if (newStatus.type !== 'processing') {
      setTimeout(() => status = null, 3000);
    }
  }

  $: statusClass = status && {
    success: "bg-green-500/5 border-green-500/10 text-green-700",
    error: "bg-red-500/5 border-red-500/10 text-red-700",
    processing: "bg-blue-500/5 border-blue-500/10 text-blue-700"
  }[status.type];
</script>

<div class="relative flex flex-col items-stretch w-full gap-2 pt-4">
  {#if $showInfo}
    <h2 class="font-semibold text-xs opacity-20 uppercase mb-2">Text Styles</h2>
  {/if}

  {#if showOptions}
    <div 
      class="relative z-10 w-full p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg"
      transition:slide={{ duration: 150, axis: 'y' }}
    >
      <div class="flex flex-col gap-0.5">
        {#each headingOptions as option}
          <button
            class="w-full px-2 py-1.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 
                   transition-colors rounded-sm text-[10px] font-mono"
            on:click={() => handleSetHeading(option.value)}
          >
            <div class="flex items-center justify-between">
              <span class="opacity-70">{option.label}</span>
              <span class="text-[9px] text-muted-foreground">{option.description}</span>
            </div>
          </button>
        {/each}
      </div>
    </div>
  {/if}

  <div class="flex items-start gap-4 h-32">
    <!-- Left side: Element Card -->
    <div class="w-2/5 h-full">
      {#if element}
        <ElementCard 
          {element} 
          onSelect={() => showOptions = !showOptions}
          theme={$elementsTheme}
        />
      {:else}
        <div class="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <span class="text-muted-foreground">Style guide not found</span>
        </div>
      {/if}
    </div>

    <!-- Right side: Actions -->
    <div class="flex flex-col w-3/5 gap-2">
      <!-- Current Selection Button -->
      <Button
        variant="outline"
        size="icon"
        class="h-9 aspect-square"
        disabled={isProcessing}
        on:click={() => showOptions = !showOptions}
      >
        <ChevronDown class={cn(
          "h-4 w-4 transition-transform duration-200",
          showOptions && "rotate-180"
        )} />
      </Button>

      <!-- Update Button -->
    <OutlineButton
      icon={Heading}
      label="Update current"
      on:click={handleUpdateHeading}
    />

			<Button 
        variant="secondary"
        size="icon"
        class="h-9 flex-1"
        disabled={isProcessing}
        on:click={handleUpdateHeading}
      >
        <Heading class="h-4 w-4 mr-2" />
        	<span class="text-xs font-mono">Update Similar</span>
      </Button>
    </div>
  </div>

  <!-- Status overlay -->
  {#if status}
    <div 
      class="absolute inset-0 z-50 flex items-center justify-center gap-2 rounded-lg border backdrop-blur-[0.2em] {statusClass}"
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
          <span class="text-xs text-muted-foreground">({status.executionTime}ms)</span>
        {/if}
      </div>
    </div>
  {/if}
</div>