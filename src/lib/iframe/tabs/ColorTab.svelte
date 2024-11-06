<!-- $lib/iframe/tabs/ColorTab.svelte -->
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import ColorPicker from "../components/ColorPicker.svelte";
  import { currentColor } from '../stores';
  import { GASCommunicator } from '../gasUtils';
  import { cn } from "$lib/utils";
  
  const dispatch = createEventDispatcher();
  
  const presetColors = [
    { color: '#FFFFFF', title: 'White' },
    { color: '#E5E5E5', title: 'Light Gray' },
    { color: '#A3A3A3', title: 'Gray' },
    { color: '#171717', title: 'Black' },
  ];
  
  let showColorPicker = false;
  let isProcessing = false;
  let status: StatusUpdate | null = null;
  let gasCommunicator: GASCommunicator;

  interface StatusUpdate {
    type: 'success' | 'error' | 'processing';
    message: string;
    executionTime?: number;
  }

  onMount(() => {
    gasCommunicator = GASCommunicator.getInstance();
  });

  async function handleColorChange(color: string) {
    if (isProcessing) return;
    
    isProcessing = true;
    updateStatus({
      type: 'processing',
      message: 'Applying color...'
    });

    try {
      const response = await gasCommunicator.sendMessage('changeBg', { color });
      
      if (response.success) {
        currentColor.set(color);
        updateStatus({
          type: 'success',
          message: 'Color applied!',
          executionTime: response.executionTime
        });
      }
    } catch (error) {
      console.error('Failed to change background:', error);
      updateStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to change color'
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

  function handleColorPickerChange(event: CustomEvent<{ color: string }>) {
    handleColorChange(event.detail.color);
  }

  $: statusClass = status && {
    success: "text-green-600 dark:text-green-400",
    error: "text-red-600 dark:text-red-400",
    processing: "text-blue-600 dark:text-blue-400"
  }[status.type];
</script>

<div class="flex flex-col items-stretch w-full gap-2">
  {#if showColorPicker}
    <!-- Color picker bubble -->
    <div 
      class="relative z-10 w-full p-4 mb-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg"
      transition:slide={{ duration: 150, axis: 'y' }}
    >
      <ColorPicker on:colorChange={handleColorPickerChange} />
    </div>
  {/if}

  <!-- Status message -->
  {#if status}
    <div 
      class="text-sm text-center {statusClass}"
      transition:fade={{ duration: 200 }}
    >
      {status.message}
      {#if status.executionTime}
        <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">
          ({status.executionTime}ms)
        </span>
      {/if}
    </div>
  {/if}

  <!-- Color buttons -->
  <div class="flex items-center justify-center gap-2">
    {#each presetColors as { color, title }}
      <button
        on:click={() => handleColorChange(color)}
        class={cn(
          "w-8 h-8 rounded-md border transition-all duration-200",
          "border-gray-300 dark:border-gray-600",
          "hover:border-primary hover:shadow-md",
          "focus:ring-1 focus:ring-primary",
          isProcessing && "opacity-50 cursor-not-allowed"
        )}
        title={title}
        style="background-color: {color};"
        disabled={isProcessing}
      />
    {/each}
    
    <!-- Gradient button -->
    <button
      on:click={() => showColorPicker = !showColorPicker}
      class={cn(
        "w-8 h-8 rounded-md border transition-all duration-200",
        "border-gray-300 dark:border-gray-600",
        "hover:border-primary hover:shadow-md",
        "focus:ring-1 focus:ring-primary",
        isProcessing && "opacity-50 cursor-not-allowed",
        showColorPicker && "border-primary shadow-md"
      )}
      style="background: linear-gradient(45deg, #FF0000, #00FF00, #0000FF);"
      title="Custom Color"
      disabled={isProcessing}
      aria-expanded={showColorPicker}
    />
  </div>
</div>