<!-- src/lib/components/demo/app/AppDemo.svelte -->
<script lang="ts">
  import AppTabs from './tabs/AppTabs.svelte';
  import WireframeTab from './tabs/WireframeTab.svelte';
  import DocTab from './tabs/DocTab.svelte';
  import PromptTab from './tabs/PromptTab.svelte';
  import CodeTab from './tabs/CodeTab.svelte';
  
  export let activeTab: string = 'wireframe';

  const tabs = [
    { id: "wireframe", title: "Wireframe", component: WireframeTab },
    { id: "doc", title: "Google Doc", component: DocTab },
    { id: "prompt", title: "AI Prompt", component: PromptTab },
    { id: "code", title: "Live Code", component: CodeTab }
  ] as const;
</script>

<div class="relative h-full w-full">
  <!-- Main Content Area -->
  <div class="h-full p-8">
    {#each tabs as tab}
      {#if activeTab === tab.id}
        <svelte:component this={tab.component} />
      {/if}
    {/each}
  </div>

  <!-- Floating Tabs at Bottom -->
  <div class="absolute bottom-0 inset-x-0 flex justify-center pb-4">
    <AppTabs {tabs} bind:activeTab />
  </div>
</div>