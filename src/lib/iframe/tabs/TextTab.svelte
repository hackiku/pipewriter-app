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
  import { GASCommunicator } from '../gasUtils';

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
  const gas = GASCommunicator.getInstance(5000);
  
  let isProcessing = false;
  let status: StatusUpdate | null = null;
  let selectedHeading: string = headingOptions[0].value;
  let showOptions = false;

  interface StatusUpdate {
    type: 'success' | 'error' | 'processing';
    message: string;
    executionTime?: number;
  }

  function getSelectedHeadingInfo() {
    return headingOptions.find(h => h.value === selectedHeading);
  }

  async function handleStyleGuideInsert() {
    if (isProcessing) return;
    isProcessing = true;
    dispatch('processingStart');
    
    try {
      const response = await gas.sendMessage('getElement', { 
        elementId: 'styleguide' 
      }, updateStatus);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to insert style guide');
      }
    } catch (error) {
      updateStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to insert style guide'
      });
    } finally {
      isProcessing = false;
      dispatch('processingEnd');
    }
  }

  function handleSetHeading(value: string) {
    if (isProcessing) return;
    selectedHeading = value;
    showOptions = false;
    
    gas.sendMessage('setHeading', { heading: value }, updateStatus);
  }

  async function handleUpdateHeading() {
    if (isProcessing) return;
    isProcessing = true;
    dispatch('processingStart');
    
    try {
      const response = await gas.sendMessage('updateHeading', {}, updateStatus);
      if (!response.success) {
        throw new Error(response.error || 'Failed to update styles');
      }
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

  $: selectedInfo = getSelectedHeadingInfo();
</script>

	{#if status}
    <div 
      class="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center gap-2 border-t {statusClass}"
      transition:fade={{ duration: 200 }}
    >
      <div class="flex items-center gap-2">
        {#if status.type === 'processing'}
          <Loader2 class="h-3 w-3 animate-spin" />
        {:else if status.type === 'success'}
          <ThumbsUp class="h-3 w-3" />
        {:else if status.type === 'error'}
          <AlertCircle class="h-3 w-3" />
        {/if}
        <span class="text-xs font-medium">{status.message}</span>
        {#if status.executionTime}
          <span class="text-xs opacity-50">({status.executionTime}ms)</span>
        {/if}
      </div>
    </div>
  {/if}


	<div class="relative flex flex-col items-stretch w-full gap-2 pt-4">



  {#if $showInfo}
    <h2 class="font-semibold text-xs opacity-20 uppercase mb-2 -mt-2">Text Styles</h2>
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



  <div class="flex items-start gap-4 h-24">
    <!-- Left side: Element Card -->
    <div class="w-2/5 h-full">
      {#if element}
        <ElementCard 
          {element} 
          onSelect={handleStyleGuideInsert}
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
        class="h-7 w-full justify-between px-3 font-mono text-xs"
        disabled={isProcessing}
        on:click={() => showOptions = !showOptions}
      >
        <span class="flex items-center gap-2">
          {selectedInfo?.label || 'Select style'}
        </span>
        <ChevronDown class={cn(
          "h-4 w-4 transition-transform duration-200",
          showOptions && "rotate-180"
        )} />
      </Button>

      <!-- Update Button - Using existing OutlineButton design -->

			<div class="h-7">
				<OutlineButton
								icon={Heading}
								label="Update current"
								onClick={handleUpdateHeading}
							/>
			</div>
    </div>
  </div>

  <!-- Status bar at bottom -->
</div>