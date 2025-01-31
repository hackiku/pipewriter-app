<!-- src/lib/components/demo/app/Tabs.svelte -->
<script lang="ts">
  export let tabs: readonly {
    id: string;
    title: string;
    component: any;
  }[];
  export let activeTab: string;
  export let handleTabSelect: (tabId: string) => void;
</script>

<div class="inline-flex items-center bg-white/5 rounded-full p-1 backdrop-blur-sm">
  {#each tabs as tab}
    <button
      class="px-4 py-2 text-sm rounded-full transition-all duration-200
             {activeTab === tab.id ? 
               'bg-white/10 text-white shadow-lg' : 
               'text-white/40 hover:text-white/60 hover:bg-white/5'}"
      on:click={() => handleTabSelect(tab.id)}
    >
      {tab.title}
    </button>
  {/each}
</div>

<style>
  button {
    font-feature-settings: "ss01", "ss02", "ss03";
  }
</style>