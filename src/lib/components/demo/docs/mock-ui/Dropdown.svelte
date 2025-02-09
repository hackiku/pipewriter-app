<!-- src/lib/components/demo/docs/mock-ui/Dropdown.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  
  export let items = [
    { label: 'Open App', shortcut: '⌘A' },
    { label: 'HTML to start ↑', shortcut: '⌘⇧H' },
    { label: 'HTML to end ↓', shortcut: '⌘⇧L' },
    { label: 'Strip HTML tags', shortcut: '⌘⇧S' },
    { label: 'Delete HTML', shortcut: '⌘⇧D' },
    { label: 'HTML to clipboard', shortcut: '⌘⇧C' }
  ];

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
    class="min-w-[220px] bg-white dark:bg-[#2d2d2d] 
           rounded shadow-lg border border-zinc-200 dark:border-zinc-700
           py-1 mt-1 z-50"
  >
    {#each items as item}
      <DropdownMenu.Item
        class="flex justify-between items-center px-4 py-1.5
               text-[13px] text-zinc-700 dark:text-zinc-300
               hover:bg-[#e8f0fe] dark:hover:bg-[#3c4043]
               focus:bg-[#e8f0fe] dark:focus:bg-[#3c4043]
               outline-none cursor-default"
        on:click={() => dispatch('select', item)}
      >
        <span>{item.label}</span>
        {#if item.shortcut}
          <span class="text-zinc-500 dark:text-zinc-500 ml-4 text-[11px]">
            {item.shortcut}
          </span>
        {/if}
      </DropdownMenu.Item>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>