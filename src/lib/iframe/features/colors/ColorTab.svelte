<!-- $lib/iframe/features/colors/ColorTab.svelte -->
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { Button } from "$lib/components/ui/button";
  import ColorPicker from "./ColorPicker.svelte";
  import ColorButton from "./ColorButton.svelte";
  import { currentColor } from '../../stores';
  import { AppsScriptClient } from '../../utils/appsScript';
  import { cn } from "$lib/utils";
  
  const dispatch = createEventDispatcher();
  const client = AppsScriptClient.getInstance();
  
  const presetColors = [
    { color: '#FFFFFF', title: 'White' },
    { color: '#E5E5E5', title: 'Light Gray' },
    { color: '#A3A3A3', title: 'Gray' },
    { color: '#282828', title: 'Dark' },
    { color: '#171717', title: 'Black' },
  ];
  
  let showColorPicker = false;
  let isProcessing = false;

	function stripAlpha(color: string): string {
		if (color.toUpperCase() === '#FFFFFF' || color.toUpperCase() === 'FFFFFF') {
			return '#FFFFFF';
		}
		return color.replace(/FF$/, '').slice(0, 7).toUpperCase();
	}

  async function handleColorChange(color: string) {
    if (isProcessing) return;
    
    isProcessing = true;
    dispatch('processingStart');
    dispatch('status', {
      type: 'processing',
      message: 'Applying color...'
    });

    try {
      const cleanColor = stripAlpha(color);
      const response = await client.sendMessage('changeBg', { color: cleanColor });
      
      if (response.success) {
        currentColor.set(cleanColor);
        dispatch('status', {
          type: 'success',
          message: 'Color applied!',
          executionTime: response.executionTime
        });
      } else {
        throw new Error(response.error || 'Failed to change color');
      }
    } catch (error) {
      console.error('Failed to change background:', error);
      dispatch('status', {
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to change color'
      });
    } finally {
      isProcessing = false;
      dispatch('processingEnd');
    }
  }

  function handleColorUpdate(event: CustomEvent<{ color: string }>) {
    currentColor.set(stripAlpha(event.detail.color));
  }

  function handleSubmit() {
    handleColorChange($currentColor);
  }
</script>

<div class="flex flex-col items-stretch w-full gap-2 pt-4">
  {#if showColorPicker}
    <div 
      class="relative z-10 w-full p-4 mb-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg"
      transition:slide={{ duration: 150, axis: 'y' }}
    >
      <ColorPicker on:colorUpdate={handleColorUpdate} />
    </div>
  {/if}

  <!-- Color input and actions -->
  <div class="flex gap-2 h-9">
    <button
      class="flex flex-1 rounded-md border border-input bg-background px-3 pt-2 text-sm shadow-sm transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
      on:click={() => showColorPicker = !showColorPicker}
			style="
				background: linear-gradient(to right, {$currentColor} 2rem, {showColorPicker ? '' : ''} 2rem);
				border: {showColorPicker ? '1px solid' : ''};
			"
		>
      <span class="w-6"></span>
      <span class="flex items-center uppercase pl-2">{$currentColor}</span>
    </button>

    <Button 
      variant="default" 
      class="px-4 h-full min-w-1/4"
      disabled={isProcessing}
      on:click={handleSubmit}
    >
      {isProcessing ? '...' : 'Ok'}
    </Button>
  </div>

  <!-- Preset colors -->
  <div class="flex items-center justify-center gap-2 px-5 h-12">
    {#each presetColors as { color, title }}
      <ColorButton
        {color}
        {title}
        isSelected={$currentColor === color}
        {isProcessing}
        on:click={() => handleColorChange(color)}
      />
    {/each}
    
    <ColorButton
      color=""
      title="Custom Color"
      isGradient={true}
      isSelected={showColorPicker}
      {isProcessing}
      on:click={() => showColorPicker = !showColorPicker}
    />
  </div>
</div>