<!-- $lib/iframe/components/ColorPicker.svelte -->
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import { Button } from "$lib/components/ui/button";
  import { currentColor } from '../stores';
  import { GASCommunicator } from '../gasUtils';
  import { fade } from 'svelte/transition';
  
  const dispatch = createEventDispatcher();
  let pickerElement: HTMLDivElement;
  let picker: any;
  let colorInput: string = '#E53E3E';
  let isSubmitting = false;
  let gasCommunicator: GASCommunicator;
  let status: StatusUpdate | null = null;

  interface StatusUpdate {
    type: 'processing' | 'success' | 'error';
    message: string;
    executionTime?: number;
  }

  function stripAlpha(color: string): string {
    return color.replace(/FF$/, '').toUpperCase();
  }

  onMount(async () => {
    if (browser) {
      const { default: Picker } = await import('vanilla-picker');
      gasCommunicator = GASCommunicator.getInstance();
      
      const initialColor = $currentColor !== '#000000' ? $currentColor : colorInput;
      
      picker = new Picker({
        parent: pickerElement,
        popup: false,
        alpha: false,
        color: initialColor,
        onChange: (color: { hex: string }) => {
          const cleanColor = stripAlpha(color.hex);
          colorInput = cleanColor;
          currentColor.set(cleanColor);
        }
      });

      colorInput = stripAlpha(initialColor);
      currentColor.set(colorInput);
    }
  });

  onDestroy(() => {
    if (browser && picker) {
      picker.destroy();
    }
  });

  // Update status and auto-clear after delay
  function updateStatus(newStatus: StatusUpdate) {
    status = newStatus;
    
    if (newStatus.type !== 'processing') {
      setTimeout(() => {
        status = null;
      }, 3000);
    }
  }

  async function handleSubmit() {
    if (isSubmitting) return;
    
    isSubmitting = true;
    try {
      const cleanColor = stripAlpha(colorInput);
      console.log('Sending color to GAS:', cleanColor);

      const response = await gasCommunicator.sendMessage(
        'changeBg', 
        { color: cleanColor },
        // Status callback
        (statusUpdate) => {
          console.log('Status update:', statusUpdate);
          updateStatus(statusUpdate);
        }
      );

      if (response.success) {
        dispatch('colorChange', { 
          color: cleanColor,
          executionTime: response.executionTime 
        });
      }
    } catch (error) {
      console.error('Error changing background color:', error);
      updateStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setTimeout(() => {
        isSubmitting = false;
      }, 1000);
    }
  }

  $: statusClass = status && {
    processing: "text-blue-600 dark:text-blue-400",
    success: "text-green-600 dark:text-green-400",
    error: "text-red-600 dark:text-red-400"
  }[status.type];
</script>

<div class="w-full flex flex-col gap-4">
  <div bind:this={pickerElement} class="w-full flex justify-center" />
  
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <div 
        class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
        style="background: linear-gradient(to right, {colorInput} 2rem, white 2rem);"
      >
        <span class="w-8"></span>
        <input
          type="text"
          value={colorInput}
          readonly
          class="bg-transparent border-none outline-none focus:outline-none w-full uppercase pl-2"
        />
      </div>
      <Button 
        variant="default" 
        class="h-9"
        disabled={isSubmitting}
        on:click={handleSubmit}
      >
        {isSubmitting ? '...' : 'Ok'}
      </Button>
    </div>

    {#if status}
      <div 
        class="text-sm text-center {statusClass}"
        transition:fade={{ duration: 200 }}
      >
        {status.message}
        {#if status.executionTime}
          <span class="text-xs text-gray-500 ml-1">
            ({status.executionTime}ms)
          </span>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  :global(.picker_wrapper) {
    background: none !important;
    box-shadow: none !important;
    width: 100% !important;
  }

  :global(.picker_wrapper .picker_arrow) {
    display: none;
  }

  :global(.picker_wrapper .picker_selector) {
    border: 2px solid white !important;
    box-shadow: 0 0 2px rgba(0,0,0,0.5) !important;
  }

  :global(.dark .picker_wrapper) {
    filter: brightness(0.8);
  }

  :global(.picker_editor input) {
    display: none !important;
  }

  :global(.picker_done button) {
    display: none !important;
  }

  :global(.picker_wrapper .picker_alpha) {
    display: none !important;
  }
</style>