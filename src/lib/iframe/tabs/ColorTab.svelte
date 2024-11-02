<!-- $lib/iframe/tabs/ColorPicker.svelte -->

<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { Rotate3d } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import ColorPicker from "../components/ColorPicker.svelte";
  import { fade } from 'svelte/transition';
  import { currentColor } from '../stores';
  
  const dispatch = createEventDispatcher();
  const presetColors = [
    { color: '#ffffff', title: 'White' },
    { color: '#f3f3f3', title: 'Light Gray' },
    { color: '#cccccc', title: 'Gray' },
    { color: '#0a0a0a', title: 'Black' },
  ];
  
  let showColorPicker = false;
  let pickerContainer: HTMLDivElement;

  // Handle click outside
  function handleClickOutside(event: MouseEvent) {
    if (pickerContainer && !pickerContainer.contains(event.target as Node)) {
      showColorPicker = false;
    }
  }

  // Handle escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      showColorPicker = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleKeydown);
  });
  
  function selectColor(color: string) {
    currentColor.set(color);
    dispatch('colorChange', { color });
  }

  function invertColors() {
    const message = { action: 'invertColors', payload: {} };
    window.parent.postMessage(JSON.stringify(message), "*");
  }

  function handleColorPickerChange({ detail: { color } }) {
    selectColor(color);
  }

  function toggleColorPicker() {
    showColorPicker = !showColorPicker;
  }
</script>

<section class="flex-shrink relative">
  <!-- Preset colors row -->
  <div class="flex justify-center items-center w-full gap-2 mb-2">
    {#each presetColors as { color, title }}
      <button
        on:click={() => selectColor(color)}
        class="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-all"
        title={title}
        style="background-color: {color};"
      ></button>
    {/each}
  </div>

  <!-- Color picker and invert buttons row -->
  <div class="flex justify-center items-center w-full gap-2">
    <!-- Gradient preview button -->
    <button
      on:click={toggleColorPicker}
      class="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-all overflow-hidden"
      style="background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);"
      title="Open Color Picker"
    ></button>

    <!-- Invert colors button -->
    <Button
      variant="outline"
      size="icon"
      class="h-6 w-6"
      on:click={invertColors}
      title="Invert Colors"
    >
      <Rotate3d class="h-4 w-4" />
    </Button>
  </div>

  <!-- Color picker dropdown -->
  {#if showColorPicker}
    <div
      bind:this={pickerContainer}
      class="absolute top-full left-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50"
      transition:fade={{ duration: 100 }}
    >
      <ColorPicker on:colorChange={handleColorPickerChange} />
    </div>
  {/if}
	<!-- <ColorPicker /> -->
</section>