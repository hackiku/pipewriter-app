<!-- $lib/iframe/tabs/ColorPicker.svelte -->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import ColorPicker from "../components/ColorPicker.svelte";
  import { currentColor } from '../stores';
  
  const dispatch = createEventDispatcher();
  
  const presetColors = [
    { color: '#FFFFFF', title: 'White' },
    { color: '#E5E5E5', title: 'Light Gray' },
    { color: '#A3A3A3', title: 'Gray' },
    { color: '#171717', title: 'Black' },
  ];
  
  let showColorPicker = false;

  function callGAS(action: string, payload: Record<string, any> = {}) {
    const message = {
      action,
      payload: {
        ...payload
      }
    };
    console.log('ColorTab sending message:', message);
    window.parent.postMessage(JSON.stringify(message), "*");
  }

  function selectColor(color: string) {
    currentColor.set(color);
    callGAS('changeBg', { color });
  }

  function handleColorPickerChange(event: CustomEvent<{ color: string }>) {
    selectColor(event.detail.color);
  }
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
        on:click={() => selectColor(color)}
        class="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 hover:border-primary transition-colors"
        title={title}
        style="background-color: {color};"
      />
    {/each}
    
    <!-- Gradient button -->
    <button
      on:click={() => showColorPicker = !showColorPicker}
      class="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 hover:border-primary transition-colors overflow-hidden"
      style="background: linear-gradient(45deg, #FF0000, #00FF00, #0000FF);"
      title="Custom Color"
    />
  </div>
</section>