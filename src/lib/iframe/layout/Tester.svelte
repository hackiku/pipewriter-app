<!-- $lib/iframe/layout/Tester.svelte -->
<script lang="ts">
  import RoundButton from '../components/RoundButton.svelte';
  import { Sun, Moon, Heart, Star } from 'lucide-svelte';
  import { writable } from 'svelte/store';

  const isSelected = writable(false);
  function toggleSelected() {
    isSelected.update(v => !v);
  }

  const colors = [
    { hex: '#4F46E5', name: 'Indigo' },
    { hex: '#EC4899', name: 'Pink' },
  ];
</script>

<div class="space-y-8 p-4">
  <!-- Row 1: Auto-sized grid -->
  <div class="grid grid-cols-4 gap-4">
    <div class="flex items-center justify-center">
      <RoundButton
        icon={Sun}
        selected={$isSelected}
        tooltipContent="Sun icon"
        on:click={toggleSelected}
      />
    </div>
    
    <div class="flex items-center justify-center">
      <RoundButton
        icon={Heart}
        selected={$isSelected}
        tooltipContent="Heart icon"
        on:click={toggleSelected}
      />
    </div>
    
    <div class="flex items-center justify-center">
      <RoundButton
        color={colors[0].hex}
        selected={$isSelected}
        tooltipContent="Indigo button"
        on:click={toggleSelected}
      />
    </div>
    
    <div class="flex items-center justify-center">
      <RoundButton
        gradient
        selected={$isSelected}
        tooltipContent="Gradient"
        on:click={toggleSelected}
      />
    </div>
  </div>

  <!-- Row 2: Fixed sizes flex -->
  <div class="flex items-center gap-4">
    <div class="h-7 w-7">
      <RoundButton
        icon={Moon}
        selected={$isSelected}
        tooltipContent="Moon in h-7"
        on:click={toggleSelected}
      />
    </div>
    
    <div class="h-7 w-7">
      <RoundButton
        icon={Star}
        selected={$isSelected}
        tooltipContent="Star in h-7"
        on:click={toggleSelected}
      />
    </div>
    
    <div class="h-7 w-7">
      <RoundButton
        color={colors[1].hex}
        selected={$isSelected}
        tooltipContent="Pink in h-7"
        on:click={toggleSelected}
      />
    </div>
    
    <div class="h-7 w-7">
      <RoundButton
        gradient
        selected={$isSelected}
        tooltipContent="Gradient in h-7"
        on:click={toggleSelected}
      />
    </div>
  </div>
</div>