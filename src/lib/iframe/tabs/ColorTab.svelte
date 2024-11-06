<!-- $lib/iframe/tabs/ColorTab.svelte -->
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import ColorPicker from "../components/ColorPicker.svelte";
  import { currentColor } from '../stores';
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
  let status: { type: 'success' | 'error' | 'processing'; message: string; executionTime?: number } | null = null;

  // Track whether we're waiting for a response
  let pendingResponse = false;
  let responseTimeout: number;

  function callGoogleScript(action: string, payload: Record<string, any> = {}) {
    return new Promise((resolve, reject) => {
      if (pendingResponse) {
        clearTimeout(responseTimeout);
      }

      // Set up message handler
      const messageHandler = (event: MessageEvent) => {
        try {
          // Handle direct success message
          if (event.data === "Background changed") {
            window.removeEventListener('message', messageHandler);
            clearTimeout(responseTimeout);
            pendingResponse = false;
            resolve({ success: true });
            return;
          }

          // Handle error message
          if (event.data?.error) {
            window.removeEventListener('message', messageHandler);
            clearTimeout(responseTimeout);
            pendingResponse = false;
            reject(new Error(event.data.error));
            return;
          }

          // Handle JSON response
          const response = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          if (response.action === action) {
            window.removeEventListener('message', messageHandler);
            clearTimeout(responseTimeout);
            pendingResponse = false;
            resolve(response);
          }
        } catch (error) {
          console.debug('Non-relevant message received:', event.data);
        }
      };

      // Add message listener
      window.addEventListener('message', messageHandler);

      // Set timeout
      responseTimeout = window.setTimeout(() => {
        window.removeEventListener('message', messageHandler);
        pendingResponse = false;
        reject(new Error('Operation timed out'));
      }, 3000);

      // Send message
      pendingResponse = true;
      window.parent.postMessage(JSON.stringify({ 
        action,
        payload: {
          color: payload.color
        }
      }), '*');
    });
  }

  async function changeBackgroundColor(color: string) {
    if (isProcessing) return;
    
    isProcessing = true;
    updateStatus({
      type: 'processing',
      message: 'Applying color...'
    });

    try {
      const result = await callGoogleScript('changeBg', { color });
      
      if (result.success) {
        currentColor.set(color);
        updateStatus({
          type: 'success',
          message: 'Color applied!',
          executionTime: result.executionTime
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

  function updateStatus(newStatus: {
    type: 'processing' | 'success' | 'error';
    message: string;
    executionTime?: number;
  }) {
    status = newStatus;
    
    if (newStatus.type !== 'processing') {
      setTimeout(() => {
        status = null;
      }, 3000);
    }
  }

  function handleColorPickerChange(event: CustomEvent<{ color: string }>) {
    changeBackgroundColor(event.detail.color);
  }

  onDestroy(() => {
    if (responseTimeout) {
      clearTimeout(responseTimeout);
    }
  });

  $: statusClass = status && {
    success: "text-green-600 dark:text-green-400",
    error: "text-red-600 dark:text-red-400",
    processing: "text-blue-600 dark:text-blue-400"
  }[status.type];
</script>

<section class="flex flex-col gap-2">
  <!-- Color picker dropdown -->
  {#if showColorPicker}
    <div
      class="w-full p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
      transition:fade={{ duration: 150 }}
    >
      <ColorPicker on:colorChange={handleColorPickerChange} />
    </div>
  {/if}

  <!-- Preset colors row -->
  <div class="flex items-center gap-2">
    {#each presetColors as { color, title }}
      <button
        on:click={() => changeBackgroundColor(color)}
        class={cn(
          "w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 hover:border-primary transition-colors",
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
        "w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 hover:border-primary transition-colors overflow-hidden",
        isProcessing && "opacity-50 cursor-not-allowed"
      )}
      style="background: linear-gradient(45deg, #FF0000, #00FF00, #0000FF);"
      title="Custom Color"
      disabled={isProcessing}
    />
  </div>

  <!-- Status message -->
  {#if status}
    <div 
      class={cn(
        "mt-2 text-sm text-center transition-opacity duration-200",
        statusClass
      )}
      transition:fade
    >
      {status.message}
      {#if status.executionTime}
        <span class="text-xs text-gray-500 ml-2">
          ({status.executionTime}ms)
        </span>
      {/if}
    </div>
  {/if}
</section>