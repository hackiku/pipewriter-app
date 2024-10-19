<!-- $lib/iframe/ColorPicker.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Type } from 'lucide-svelte';

  const dispatch = createEventDispatcher();

  const colors = [
    { color: '#ffffff', title: 'White' },
    { color: '#f3f3f3', title: 'Light Gray' },
    { color: '#cccccc', title: 'Gray' },
    { color: '#0a0a0a', title: 'Dark Gray' },
  ];

  function selectColor(color: string) {
    dispatch('colorChange', { color });
  }
</script>

<section class="flex-shrink relative">
  <!-- Color picker row -->
  <div class="flex justify-center items-center w-full gap-2">
     {#each colors as { color, title }}
      <button
        on:click={() => selectColor(color)}
        class="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-brandBlue transition-all"
        title={title}
        style="background-color: {color};"
      ></button>
    {/each}
    <button
      class="w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-300 hover:border-brandBlue transition-all"
      title="Color Picker Placeholder"
    ></button>
  </div>
</section>