<!-- $lib/iframe/tabs/ColorTab.svelte -->
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { Button } from "$lib/components/ui/button";
  import { Copy, Check } from 'lucide-svelte';
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
  let isCopied = false;

  interface StatusUpdate {
    type: 'success' | 'error' | 'processing';
    message: string;
    executionTime?: number;
  }

  onMount(() => {
    gasCommunicator = GASCommunicator.getInstance();
  });

  function stripAlpha(color: string): string {
    return color.replace(/FF$/, '').slice(0, 7).toUpperCase();
  }

  async function handleColorChange(color: string) {
    if (isProcessing) return;
    
    isProcessing = true;
    updateStatus({
      type: 'processing',
      message: 'Applying color...'
    });

    try {
      const cleanColor = stripAlpha(color);
      const response = await gasCommunicator.sendMessage('changeBg', { color: cleanColor });
      
      if (response.success) {
        currentColor.set(cleanColor);
        updateStatus({
          type: 'success',
          message: 'Color applied!',
          executionTime: response.executionTime
        });
      } else {
        throw new Error(response.error || 'Failed to change color');
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

  function handleColorUpdate(event: CustomEvent<{ color: string }>) {
    currentColor.set(stripAlpha(event.detail.color));
  }

  async function copyColorToClipboard() {
    try {
      await navigator.clipboard.writeText($currentColor);
      isCopied = true;
      setTimeout(() => isCopied = false, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  function handleSubmit() {
    handleColorChange($currentColor);
  }

  $: statusClass = status && {
    success: "text-green-600 dark:text-green-400",
    error: "text-red-600 dark:text-red-400",
    processing: "text-blue-600 dark:text-blue-400"
  }[status.type];
</script>

<div class="flex flex-col items-stretch w-full gap-2">
  {#if showColorPicker}
    <div 
      class="relative z-10 w-full p-4 mb-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg"
      transition:slide={{ duration: 150, axis: 'y' }}
    >
      <ColorPicker on:colorUpdate={handleColorUpdate} />
    </div>
  {/if}

  <div class="flex gap-2">
    <button
      class="flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
      on:click={() => showColorPicker = !showColorPicker}
      style="background: linear-gradient(to right, {$currentColor} 2rem, {showColorPicker ? '#f9fafb' : 'white'} 2rem);"
    >
      <span class="w-8"></span>
      <span class="flex items-center uppercase pl-2">{$currentColor}</span>
    </button>

    <Button
      variant="outline"
      size="icon"
      class="h-9 w-9"
      on:click={copyColorToClipboard}
      disabled={isProcessing}
    >
      {#if isCopied}
        <Check class="h-4 w-4 text-green-500" />
      {:else}
        <Copy class="h-4 w-4 opacity-30 hover:opacity-100 transition-opacity" />
      {/if}
    </Button>

    <Button 
      variant="default" 
      class="h-9 px-4 min-w-[60px]"
      disabled={isProcessing}
      on:click={handleSubmit}
    >
      {isProcessing ? '...' : 'Ok'}
    </Button>
  </div>

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

  <div class="flex items-center justify-center gap-2">
    {#each presetColors as { color, title }}
      <button
        on:click={() => handleColorChange(color)}
        class={cn(
          "w-8 h-8 rounded-md border transition-all duration-200",
          "border-gray-300 dark:border-gray-600",
          "hover:border-primary hover:shadow-md",
          "focus:ring-1 focus:ring-primary",
          isProcessing && "opacity-50 cursor-not-allowed",
          $currentColor === color && "border-primary shadow-md"
        )}
        title={title}
        style="background-color: {color};"
        disabled={isProcessing}
      />
    {/each}
    
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