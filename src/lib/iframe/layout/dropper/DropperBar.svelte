<!-- $lib/iframe/layout/dropper/DropperBar.svelte -->
<script lang="ts">
  import { elementsTheme } from '../../stores';
  import { dropperStore, chainMode, dropperStatus } from '../../stores/dropperStore';
  import { Link } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";
  import ColorButton from "../../components/ColorButton.svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";

  let showThemes = false;

  const themes = [
    { id: 'gray', color: '#A3A3A3', label: 'Gray' },
    { id: 'white', color: '#FFFFFF', label: 'White' },
    { id: 'dark', color: '#171717', label: 'Black' }
  ] as const;

  function setTheme(themeId: string) {
    elementsTheme.set(themeId);
    showThemes = false;
  }

  $: currentTheme = themes.find(t => t.id === $elementsTheme) || themes[1];
  $: otherThemes = themes.filter(t => t.id !== currentTheme.id);
</script>

<div class="relative dropper-container">
  <!-- Background Gradient -->
  <div 
    class="absolute bottom-0 left-0 right-0 h-20 
           bg-gradient-to-t from-background from-40% via-background/80 via-70% to-transparent 
           pointer-events-none"
    aria-hidden="true"
  />

  <!-- Control Bar -->
  <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 z-40">
    <div class="bg-white dark:bg-gray-800 rounded-t-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <div class="grid grid-cols-2 gap-3 p-3 w-fit">
        <!-- Theme Selection Buttons -->
        {#if showThemes}
          {#each otherThemes as theme}
            <div in:slide={{ duration: 300, easing: quintOut, axis: 'y' }}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <ColorButton
                    color={theme.color}
                    title={theme.label}
                    isSelected={false}
                    on:click={() => setTheme(theme.id)}
                  />
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>Switch to {theme.label} theme</p>
                </Tooltip.Content>
              </Tooltip.Root>
            </div>
          {/each}
        {/if}

        <!-- Chain Mode Button -->
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              variant="ghost"
              size="icon"
              class={cn(
                "h-7 w-7 p-2 rounded-full",
                $chainMode && "bg-primary/10"
              )}
              on:click={() => dropperStore.toggleChainMode()}
              disabled={$dropperStatus.isProcessing}
            >
              <Link 
                size={16} 
                class={cn(
                  "transition-colors",
                  $chainMode ? "text-primary" : "text-muted-foreground"
                )} 
              />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p>
              {$chainMode ? "Exit chain mode" : "Enter chain mode"}
              {#if $dropperStatus.hasElements}
                <span class="text-xs opacity-75">
                  ({$dropperStatus.selectedElements?.length} selected)
                </span>
              {/if}
            </p>
          </Tooltip.Content>
        </Tooltip.Root>

        <!-- Theme Toggle Button -->
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <ColorButton
              color={currentTheme.color}
              title={currentTheme.label}
              isSelected={showThemes}
							class="w-7 h-7"
              on:click={() => showThemes = !showThemes}
            />
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p>{showThemes ? "Hide themes" : "Show themes"}</p>
          </Tooltip.Content>
        </Tooltip.Root>
      </div>
    </div>
  </div>
</div>

<style>
  .dropper-container {
    position: relative;
    z-index: 10;
  }

  :global(.dropper-container [data-radix-popper-content-wrapper]) {
    z-index: 50 !important;
  }
</style>