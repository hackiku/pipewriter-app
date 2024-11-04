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
  <!-- <div class="flex gap-2">
    <input
      type="text"
      value={colorInput}
      readonly
      class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 uppercase"
    />
    <Button 
      variant="default" 
      class="h-9"
      on:click={handleSubmit}
    >
      Change bg
    </Button>
  </div> -->
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
</style>