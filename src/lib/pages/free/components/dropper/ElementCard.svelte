<!-- src/lib/pages/free/components/dropper/ElementCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import type { ElementConfig } from '../../types';
  import { Plus } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  export let element: ElementConfig;
  export let onSelect: ((id: string) => void) | undefined = undefined;
  export let isActive = false;
  export let isEditing = false;
  export let disabled = false;

  $: buttonClass = cn(
    "group relative w-full h-full p-0 rounded-lg overflow-hidden",
    "transition-all duration-200 ease-out",
    "hover:-translate-y-1 hover:-translate-x-1 hover:rotate-[-2deg]",
    "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.7)]",
    "dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)]",
    "active:translate-y-0 active:translate-x-0 active:shadow-none",
    "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
    isActive && "bg-purple-100/30 dark:bg-purple-900/20",
    disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-400/30 dark:hover:bg-slate-900/80",
    isEditing && "card-editing"
  );
</script>

<div class="relative aspect-[1.618/1]">
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <div class="card-wrapper">
        <Button
          variant="ghost"
          class={buttonClass}
          on:click={() => !disabled && onSelect?.(element.id)}
          {disabled}
        >
          <div class="relative w-full h-full p-2">
            <!-- SVG Preview -->
            {#if element.preview}
              <div class="w-full h-full rounded-md overflow-hidden bg-background/50">
                <img
                  src={element.preview}
                  alt={element.label}
                  class="w-full h-full object-cover dark:invert dark:brightness-90"
                />
              </div>
            {:else}
              <!-- Fallback to icon if no preview -->
              <div class="flex flex-col items-center justify-center gap-2 h-full">
                <div class="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <svelte:component 
                    this={element.icon} 
                    class="w-4 h-4 text-primary" 
                  />
                </div>
                <span class="text-xs font-medium">
                  {element.label}
                </span>
              </div>
            {/if}

            {#if !disabled}
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-gray-900/80">
                <Plus class="text-primary" size={24} />
              </div>
            {/if}
          </div>
        </Button>
      </div>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p class="text-sm">{element.description || element.label}</p>
    </Tooltip.Content>
  </Tooltip.Root>
</div>

<style>
  .card-wrapper {
    position: relative;
  }

  .card-wrapper::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(to right, #3644FE, #B345ED);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card-editing .card-wrapper::before {
    opacity: 1;
  }

  :global(.card-editing) {
    background: linear-gradient(to right, rgba(54,68,254,0.1), rgba(179,69,237,0.1)) !important;
  }
</style>