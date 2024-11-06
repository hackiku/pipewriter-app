<!-- $lib/iframe/components/ColorPicker.svelte -->

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import { Button } from "$lib/components/ui/button";
  import { currentColor } from '../stores';
  
  const dispatch = createEventDispatcher();
  let pickerElement: HTMLDivElement;
  let picker: any;
  let colorInput: string;
  let isSubmitting = false;
  let pickerMounted = false;

  // Initialize with store value
  $: colorInput = $currentColor;

  function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => {
      const hex = Math.round(n).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }

  function normalizeHexColor(color: string): string {
    try {
      // Remove # if present
      color = color.replace('#', '');
      
      // Expand 3-digit hex
      if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
      }
      
      // Ensure 6 digits and valid hex
      if (color.length !== 6 || !/^[0-9A-F]{6}$/i.test(color)) {
        return $currentColor; // Return store value if invalid
      }
      
      return '#' + color.toUpperCase();
    } catch (error) {
      console.error('Error normalizing color:', error);
      return $currentColor; // Return store value on error
    }
  }

  onMount(async () => {
    if (browser) {
      const { default: Picker } = await import('vanilla-picker');
      
      // First set store to our default red if not already set
      if ($currentColor === '#000000') {
        currentColor.set('#E53E3E');
      }
      
      picker = new Picker({
        parent: pickerElement,
        popup: false,
        alpha: false,
        color: $currentColor,
        onChange: (color: { hex: string; rgba: { r: number; g: number; b: number } }) => {
          // Get direct RGB values
          const { r, g, b } = color.rgba;
          const solidColor = rgbToHex(r, g, b);
          const normalized = normalizeHexColor(solidColor);
          
          // Update both local and store state
          colorInput = normalized;
          currentColor.set(normalized);
          
          console.log('Picker onChange:', { 
            rgb: { r, g, b },
            solidColor,
            normalized,
            storeValue: $currentColor
          });
        }
      });

      // Force initial sync with store value
      if (picker.color?.rgba) {
        const { r, g, b } = picker.color.rgba;
        const normalized = normalizeHexColor(rgbToHex(r, g, b));
        colorInput = normalized;
        currentColor.set(normalized);
      }
      
      pickerMounted = true;
    }
  });

  onDestroy(() => {
    if (browser && picker) {
      picker.destroy();
    }
  });

  async function handleSubmit() {
    if (isSubmitting || !pickerMounted) return;
    
    isSubmitting = true;
    try {
      console.log('Submitting color:', colorInput, 'Store value:', $currentColor);
      dispatch('colorChange', { color: colorInput });
    } catch (error) {
      console.error('Error submitting color:', error);
    } finally {
      setTimeout(() => {
        isSubmitting = false;
      }, 1000);
    }
  }

  // Watch store changes and update picker
  $: if (picker && $currentColor && !isSubmitting) {
    const normalized = normalizeHexColor($currentColor);
    if (normalized !== colorInput) {
      colorInput = normalized;
      console.log('Store update:', { normalized, current: colorInput });
      picker.setColor(normalized, true); // Silent update
    }
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
      style="background: linear-gradient(to right, {$currentColor} 2rem, white 2rem);"
    >
      <span class="w-8"></span>
      <input
        type="text"
        value={$currentColor}
        readonly
        class="bg-transparent border-none outline-none focus:outline-none w-full uppercase pl-2"
      />
    </div>
    <Button 
      variant="default" 
      class="h-9"
      disabled={isSubmitting || !pickerMounted}
      on:click={handleSubmit}
    >
      {isSubmitting ? '...' : 'Ok'}
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

  /* Hide vanilla-picker's built-in input */
  :global(.picker_editor input) {
    display: none !important;
  }

  /* Hide vanilla-picker's built-in button */
  :global(.picker_done button) {
    display: none !important;
  }

  /* Hide alpha slider */
  :global(.picker_wrapper .picker_alpha) {
    display: none !important;
  }
</style>