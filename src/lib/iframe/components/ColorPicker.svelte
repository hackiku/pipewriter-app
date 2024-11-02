<!-- $lib/iframe/components/ColorPicker.svelte -->

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import { currentColor } from '../stores';
  
  const dispatch = createEventDispatcher();
  let pickerElement: HTMLDivElement;
  let picker: any;
  let colorInput: string = '#000000';

  // Handle server-side rendering
  onMount(async () => {
    if (browser) {
      try {
        const { default: Picker } = await import('vanilla-picker');
        
        picker = new Picker({
          parent: pickerElement,
          popup: false,
          color: $currentColor || '#000000',
          onChange: (color: { hex: string }) => {
            colorInput = color.hex.toUpperCase();
            currentColor.set(colorInput);
            dispatch('colorChange', { color: colorInput });
          }
        });
      } catch (error) {
        console.error('Error initializing color picker:', error);
      }
    }
  });

  onDestroy(() => {
    if (browser && picker) {
      picker.destroy();
    }
  });

  function handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    // Ensure value is a valid hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      colorInput = value.toUpperCase();
      if (picker) picker.setColor(colorInput);
      currentColor.set(colorInput);
      dispatch('colorChange', { color: colorInput });
    }
  }

  function handleRandomColor() {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    colorInput = randomColor.toUpperCase();
    if (picker) picker.setColor(colorInput);
    currentColor.set(colorInput);
    dispatch('colorChange', { color: colorInput });
  }
</script>

<div class="w-full flex flex-col gap-4">
  <!-- Color Picker Container -->
  <div 
    bind:this={pickerElement}
    class="w-full flex justify-center"
  />
  
  <!-- Color Input and Random Button -->
  <div class="flex gap-2">
    <input
      type="text"
      value={colorInput}
      on:input={handleInputChange}
      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 uppercase"
      maxlength="7"
    />
    <button
      type="button"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      on:click={handleRandomColor}
    >
      🎲
    </button>
  </div>
</div>

<style lang="postcss">
  /* Override Vanilla-Picker styles to match your theme */
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

  /* Dark mode adjustments */
  :global(.dark .picker_wrapper) {
    filter: brightness(0.8);
  }

  /* Ensure proper Tailwind compilation */
  :global(.picker_wrapper) {
    @apply bg-transparent;
  }
</style>