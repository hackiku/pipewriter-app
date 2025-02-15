<!-- $lib/pages/about/ToolsList.svelte -->
<script lang="ts">
  import { tools } from "$data/assets/tools";
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
  {#each Object.values(tools) as tool}
    <a 
      href={tool.url}
      class="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-muted transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img 
        src={tool.icon} 
        alt={tool.name}
        class="w-12 h-12"
        onerror="this.innerText = '{tool.fallback}'"
      />
      <span class="text-sm font-medium">{tool.name}</span>
    </a>
  {/each}
</div>