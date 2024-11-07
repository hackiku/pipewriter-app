<!-- $lib/iframe/tabs/TextTab.svelte -->
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Button } from "$lib/components/ui/button";
  import { Loader2, ThumbsUp, AlertCircle, Type, Heading, ChevronDown } from 'lucide-svelte';
  import * as Select from "$lib/components/ui/select";
  import { getElement } from '../elements';
  import ElementCard from "../components/ElementCard.svelte";
  import OutlineButton from "../components/OutlineButton.svelte";
  import { showInfo } from '../stores';
  import { GASCommunicator } from '../gasUtils';
  import { cn } from "$lib/utils";

  const headingOptions = [
    { value: 'HEADING1', label: '<h1> Title', description: 'Main title' },
    { value: 'HEADING2', label: '<h2> Heading', description: 'Section heading' },
    { value: 'HEADING3', label: '<h3> Subheading', description: 'Subsection heading' },
    { value: 'HEADING4', label: '<button> Button', description: 'Button text' },
    { value: 'HEADING5', label: '<h5> Small', description: 'Small heading' },
    { value: 'HEADING6', label: '<p> Paragraph', description: 'Body text' },
    { value: 'NORMAL', label: 'Normal', description: 'Regular paragraph' },
  ];

  const dispatch = createEventDispatcher();
  const elementId = "styleguide";
  const element = getElement(elementId);
  
  let isProcessing = false;
  let status: StatusUpdate | null = null;
  let gasCommunicator: GASCommunicator;
  let selectedHeading: string = headingOptions[0].value;

  interface StatusUpdate {
    type: 'success' | 'error' | 'processing';
    message: string;
    executionTime?: number;
    details?: string;
  }

  onMount(() => {
    gasCommunicator = GASCommunicator.getInstance();
  });

  async function handleStyleGuideInsert() {
    if (isProcessing) return;
    
    isProcessing = true;
    updateStatus({
      type: 'processing',
      message: 'Inserting style guide...'
    });

    try {
      const response = await gasCommunicator.sendMessage('getElement', { elementId: 'styleguide' });
      
      if (response.success) {
        updateStatus({
          type: 'success',
          message: 'Style guide inserted!',
          executionTime: response.executionTime
        });
      } else {
        throw new Error(response.error || 'Failed to insert style guide');
      }
    } catch (error) {
      console.error('Failed to insert style guide:', error);
      updateStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to insert style guide'
      });
    } finally {
      isProcessing = false;
    }
  }

  async function handleUpdateHeading() {
    if (isProcessing) return;
    
    isProcessing = true;
    updateStatus({
      type: 'processing',
      message: 'Updating heading styles...'
    });

    try {
      const response = await gasCommunicator.sendMessage('updateHeading', {});
      
      if (response.success) {
        updateStatus({
          type: 'success',
          message: 'Styles updated!',
          executionTime: response.executionTime,
          details: `${response.details?.headingType}: Updated ${response.details?.updatedCount} paragraph${response.details?.updatedCount !== 1 ? 's' : ''}`
        });
      } else {
        throw new Error(response.error || 'Failed to update styles');
      }
    } catch (error) {
      console.error('Failed to update heading:', error);
      updateStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to update styles'
      });
    } finally {
      isProcessing = false;
    }
  }

  async function handleSetHeading(value: string) {
    if (isProcessing) return;
    
    isProcessing = true;
    updateStatus({
      type: 'processing',
      message: 'Setting heading style...'
    });

    try {
      const response = await gasCommunicator.sendMessage('setHeading', { heading: value });
      
      if (response.success) {
        updateStatus({
          type: 'success',
          message: 'Style applied!',
          executionTime: response.executionTime
        });
      } else {
        throw new Error(response.error || 'Failed to set heading');
      }
    } catch (error) {
      console.error('Failed to set heading:', error);
      updateStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to set heading'
      });
    } finally {
      isProcessing = false;
    }
  }

  function updateStatus(newStatus: StatusUpdate) {
    status = newStatus;
    if (newStatus.type !== 'processing') {
      setTimeout(() => status = null, 3000);
    }
  }

  $: statusClass = status && {
    success: "bg-green-500/5 border-green-500/10 text-green-700 dark:text-green-300",
    error: "bg-red-500/5 border-red-500/10 text-red-700 dark:text-red-300",
    processing: "bg-blue-500/5 border-blue-500/10 text-blue-700 dark:text-blue-300"
  }[status.type];
</script>

<div class="relative flex items-stretch w-full gap-4 pt-4">
  {#if $showInfo}
    <h2 class="font-semibold text-xs opacity-20 uppercase mb-2">Text Styles</h2>
  {/if}

  <!-- Left side: Element Card -->
  <div class="w-2/5">
    {#if element}
      <ElementCard 
        {element} 
        onSelect={handleStyleGuideInsert}
        borderColor="border-gray-200"
        borderWidth="border"
      />
    {:else}
      <div class="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <span class="text-gray-500">Style guide not found</span>
      </div>
    {/if}
  </div>

  <!-- Right side: Actions -->
  <div class="flex flex-col w-3/5 gap-2">
    <OutlineButton
      icon={Heading}
      label="Update Similar Headings"
      onClick={handleUpdateHeading}
    />

    <Select.Root 
      onValueChange={handleSetHeading} 
      value={selectedHeading}
    >
      <Select.Trigger class="w-full font-mono">
        <Select.Value placeholder="Select heading style" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          {#each headingOptions as option}
            <Select.Item 
              value={option.value} 
              class="font-mono"
            >
              <div class="flex flex-col">
                <span>{option.label}</span>
                <span class="text-xs text-gray-500">{option.description}</span>
              </div>
            </Select.Item>
          {/each}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  </div>

  <!-- Status overlay -->
  {#if status}
    <div 
      class="absolute inset-0 z-50 flex items-center justify-center gap-2 rounded-lg border backdrop-blur-[0.2em] transition-all duration-200 {statusClass}"
      transition:fade={{ duration: 200 }}
    >
      <div class="flex flex-col items-center gap-2 px-4 py-2 text-center">
        <div class="flex items-center gap-2">
          {#if status.type === 'processing'}
            <Loader2 class="h-4 w-4 animate-spin" />
          {:else if status.type === 'success'}
            <ThumbsUp class="h-4 w-4" />
          {:else if status.type === 'error'}
            <AlertCircle class="h-4 w-4" />
          {/if}
          <span class="text-sm font-medium">{status.message}</span>
        </div>
        
        {#if status.details}
          <span class="text-xs opacity-80">{status.details}</span>
        {/if}

        {#if status.executionTime}
          <span class="text-xs text-muted-foreground">
            ({status.executionTime}ms)
          </span>
        {/if}
      </div>
    </div>
  {/if}
</div>