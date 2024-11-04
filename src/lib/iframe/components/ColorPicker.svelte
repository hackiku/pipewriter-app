<!-- $lib/iframe/components/ColorPicker.svelte -->

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import { Button } from "$lib/components/ui/button";
  import { currentColor } from '../stores';
  
  const dispatch = createEventDispatcher();
  let pickerElement: HTMLDivElement;
  let picker: any;
  let colorInput: string = '#000000';

  onMount(async () => {
    if (browser) {
      const { default: Picker } = await import('vanilla-picker');
      
      picker = new Picker({
        parent: pickerElement,
        popup: false,
        color: $currentColor || '#000000',
        onChange: (color: { hex: string }) => {
          colorInput = color.hex.toUpperCase();
          currentColor.set(colorInput);
        }
      });
    }
  });

  onDestroy(() => {
    if (browser && picker) {
      picker.destroy();
    }
  });

  function handleSubmit() {
    dispatch('colorChange', { color: colorInput });
  }
</script>

<div class="w-full flex flex-col gap-4">
  <!-- Color Picker Container -->
  <div 
    bind:this={pickerElement}
    class="w-full flex justify-center"
  />
  
  <!-- Color Input and Submit Button -->
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
      on:click={handleSubmit}
    >
      Ok
    </Button>
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

  /* Style the hex input to match shadcn */
  :global(.picker_editor input) {
    display: none !important;
  }

  /* Style the OK button to match shadcn */
  :global(.picker_done button) {
    display: none !important;
  }
</style>