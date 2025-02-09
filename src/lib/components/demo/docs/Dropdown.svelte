<!-- src/lib/components/demo/docs/mock–ui/Dropdown.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  
  export let items: Array<{
    label: string;
    shortcut?: string;
    disabled?: boolean;
    separator?: boolean;
  }>;

  const dispatch = createEventDispatcher();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger 
    class="text-[13px] text-zinc-600 hover:text-zinc-900 
           dark:text-zinc-400 dark:hover:text-zinc-200 
           outline-none focus:bg-black/5 dark:focus:bg-white/5
           px-2 py-1 rounded-sm"
  >
    <slot />
  </DropdownMenu.Trigger>

  <DropdownMenu.Content 
    class="min-w-[240px] bg-white dark:bg-[#2d2d2d] 
           rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700
           py-2"
  >
    {#each items as item}
      {#if item.separator}
        <DropdownMenu.Separator 
          class="h-[1px] my-1 bg-zinc-200 dark:bg-zinc-700" 
        />
      {:else}
        <DropdownMenu.Item
          class="flex justify-between items-center px-6 py-1.5
                 text-[13px] text-zinc-700 dark:text-zinc-300
                 hover:bg-[#e8f0fe] dark:hover:bg-[#3c4043]
                 focus:bg-[#e8f0fe] dark:focus:bg-[#3c4043]
                 outline-none cursor-default
                 {item.disabled ? 'opacity-50' : ''}"
          disabled={item.disabled}
          on:click={() => dispatch('select', item)}
        >
          <span>{item.label}</span>
          {#if item.shortcut}
            <span class="text-zinc-500 dark:text-zinc-500 ml-4">
              {item.shortcut}
            </span>
          {/if}
        </DropdownMenu.Item>
      {/if}
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>