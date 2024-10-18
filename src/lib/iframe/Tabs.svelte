<script lang="ts">
  import { Type, Palette } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { fly } from 'svelte/transition';

  let activeTab: 'text' | 'color' | null = null;

  function toggleTab(tab: 'text' | 'color') {
    activeTab = activeTab === tab ? null : tab;
  }
</script>

<div class="flex flex-col">
  <div class="flex gap-2">
    <Button 
      on:click={() => toggleTab('text')} 
      variant="outline" 
      size="icon" 
      class="rounded-full {activeTab === 'text' ? 'bg-gray-200 dark:bg-gray-700' : ''}"
    >
      <Type class="h-4 w-4" />
    </Button>

    <Button 
      on:click={() => toggleTab('color')} 
      variant="outline" 
      size="icon" 
      class="rounded-full {activeTab === 'color' ? 'bg-gray-200 dark:bg-gray-700' : ''}"
    >
      <Palette class="h-4 w-4" />
    </Button>
  </div>

  {#if activeTab}
    <div 
      class="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
      transition:fly="{{ y: -20, duration: 300 }}"
    >
      {#if activeTab === 'text'}
        <p>Text styling options go here</p>
      {:else if activeTab === 'color'}
        <p>Color options go here</p>
      {/if}
    </div>
  {/if}
</div>