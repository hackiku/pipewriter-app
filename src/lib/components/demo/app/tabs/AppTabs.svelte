<!-- src/lib/components/demo/app/tabs/AppTabs.svelte -->

<script lang="ts">
  export let tabs: readonly {
    id: string;
    title: string;
    component: any;
  }[];
  export let activeTab: string;
</script>

<div class="inline-flex items-center bg-white/5 rounded-full p-1">
  {#each tabs as tab}
    <button
      class="px-4 py-2 text-sm rounded-full transition-colors
             {activeTab === tab.id ? 
               'bg-white/10 text-white' : 
               'text-white/40 hover:text-white/60'}"
      on:click={() => activeTab = tab.id}
    >
      {tab.title}
    </button>
  {/each}
</div>