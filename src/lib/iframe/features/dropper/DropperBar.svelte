<!-- $lib/iframe/layout/dropper/DropperBar.svelte -->
<script lang="ts">
  import { elementsThemeStore } from '../../stores/elementsThemeStore';
  import { zenMode } from '../../stores';
  import { dropperStore, chainMode, dropperStatus } from '../../stores/dropperStore';
  import { gridStore } from '../../stores/gridStore';
  import { Link } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import IconButton from "../../components/IconButton.svelte";
  import ColorButton from "../../components/ColorButton.svelte";
  import type { GridColumns } from '../../stores/gridStore';

  const themes = [
    { id: 'light', color: '#FFFFFF', label: 'Light' },
    // { id: 'gray', color: '#A3A3A3', label: 'Gray' },
    { id: 'dark', color: '#171717', label: 'Dark' }
  ] as const;

  const gridSizes: { value: GridColumns; label: string }[] = [
    { value: 3, label: '3×' },
    { value: 2, label: '2×' },
    { value: 1, label: '1×' }
  ];

  $: currentTheme = themes.find(t => t.id === $elementsThemeStore) || themes[0];
  $: currentGridSize = gridSizes.find(s => s.value === $gridStore.columns) || gridSizes[0];
  $: nextGridSize = gridSizes[(gridSizes.findIndex(s => s.value === currentGridSize.value) + 1) % gridSizes.length];
  $: chainModeTooltip = $chainMode 
    ? "Exit chain mode" 
    : "Enter chain mode" + ($dropperStatus.hasElements 
        ? ` (${$dropperStatus.selectedElements?.length} selected)` 
        : "");
</script>

<div class="relative dropper-container" class:fixed={$zenMode} class:w-full={$zenMode}>
  <!-- Background Gradient -->
  <!-- <div 
    class="absolute bottom-0 left-0 right-0 h-16 
           bg-gradient-to-t from-background from-40% via-background/80 via-70% to-transparent 
           pointer-events-none"
    aria-hidden="true"
  /> -->
<div 
  class="absolute bottom-0 left-0 right-0 h-20
         bg-gradient-to-t from-gray-100 from-10% 
         via-gray-100/40 via-45% to-transparent 
        dark:from-slate-950/90 dark:via-slate-900/40
         pointer-events-none"
  aria-hidden="true"
/>
  <!-- Control Bar -->
  <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 z-40">
    <div class="bg-white dark:bg-gray-800 rounded-t-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <div class="flex gap-3 p-2 items-center w-full">

				<!-- Chain Mode Button -->
        <!-- <div class="w-2"> -->

				<IconButton
					icon={Link}
					size="md"
					selected={$chainMode}
					disabled={$dropperStatus.isProcessing}
					tooltipContent={chainModeTooltip}
					on:click={() => dropperStore.toggleChainMode()}
				/>
				<!-- </div> -->
				<!-- <IconButton
					icon={Link}
					size="sm"
					selected={$chainMode}
					disabled={$dropperStatus.isProcessing}
					tooltipContent={chainModeTooltip}
					on:click={() => dropperStore.toggleChainMode()}
				/> -->
				<!-- </div> -->

        <!-- Theme Toggle -->
        <div class="w-5">

				<ColorButton
          color={currentTheme.color}
          title={`Switch to ${themes[(themes.findIndex(t => t.id === currentTheme.id) + 1) % themes.length].label} theme`}
          isProcessing={$dropperStatus.isProcessing}
          tooltipContent={`Current: ${currentTheme.label}`}
          on:click={() => elementsThemeStore.cycle()}
        />
				</div>

        <!-- Grid Size -->
        <Button
          variant="outline"
          size="xs"
          class="h-6 w-6 aspect-square rounded-full text-xs font-medium border-gray-200 dark:border-gray-700 mb-1
                 hover:bg-gray-100 dark:hover:bg-gray-700
                 text-muted-foreground hover:text-foreground"
          disabled={$dropperStatus.isProcessing}
          title={`Switch to ${nextGridSize.label} grid`}
          on:click={() => gridStore.cycleColumns()}
        >
          {currentGridSize.label}
        </Button>
      </div>
    </div>
  </div>
</div>

<style>
  .dropper-container {
    position: relative;
    z-index: 10;
  }

  .dropper-container.fixed {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  :global(.dropper-container [data-radix-popper-content-wrapper]) {
    z-index: 50 !important;
  }
</style>