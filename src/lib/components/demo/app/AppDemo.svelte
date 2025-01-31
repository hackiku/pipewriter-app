<!-- src/lib/components/demo/app/AppDemo.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { writable } from 'svelte/store';
  import Tabs from './Tabs.svelte';
  
  // Demo Components
  import WireDemo from './wire/WireDemo.svelte';
  import DocDemo from './doc/DocDemo.svelte';
  import PromptDemo from './prompt/PromptDemo.svelte';
  import CodeDemo from './code/CodeDemo.svelte';
  
  // Local store for demo state
  const demoState = writable({
    activeTab: 'wireframe' as const
  });
  
  // Tab Configuration
  const tabs = [
    { id: "wireframe", title: "Wireframe", component: WireDemo },
    { id: "doc", title: "Google Doc", component: DocDemo },
    { id: "prompt", title: "AI Prompt", component: PromptDemo },
    { id: "code", title: "Live Code", component: CodeDemo }
  ] as const;
  
  // Reactive declaration for active tab
  $: activeTab = $demoState.activeTab;
  
  // Track mounted state for transition handling
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    return () => {
      mounted = false;
    };
  });
  
  // Handle tab selection with proper type checking
  function handleTabSelect(tabId: typeof tabs[number]['id']) {
    demoState.update(state => ({ ...state, activeTab: tabId }));
  }
</script>

<div class="relative bg-zinc-950 rounded-xl overflow-hidden shadow-2xl">
  <!-- Main Content Area -->
  <div class="relative h-[calc(80vh-48px)]">
    <!-- Tab Content with Transitions -->
    <div class="h-full p-8 overflow-y-auto">
      {#each tabs as tab (tab.id)}
        {#if activeTab === tab.id}
          <div 
            class="h-full"
            in:fade={{ duration: 200, delay: 200 }}
            out:fade={{ duration: 200 }}
          >
            <svelte:component this={tab.component} />
          </div>
        {/if}
      {/each}
    </div>

    <!-- Floating Tabs with Backdrop -->
    <div 
      class="absolute bottom-0 inset-x-0 pb-4 pt-12
             bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent"
    >
      <div class="flex justify-center">
        <Tabs 
          {tabs} 
          {activeTab}
          {handleTabSelect}
        />
      </div>
    </div>
  </div>
</div>

<style>
  /* Smooth transitions for gradient backgrounds */
  div {
    transition: background-color 0.2s ease-in-out;
  }
  
  /* Hide scrollbar but maintain functionality */
  .overflow-y-auto {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .overflow-y-auto::-webkit-scrollbar {
    display: none;
  }
</style>