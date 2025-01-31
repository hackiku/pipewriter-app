<!-- src/lib/pages/landing/sections/features/ExportPreview.svelte -->
<script lang="ts">
  import { landingStore } from '../../stores/landingStore';
  import { fade } from 'svelte/transition';

  const steps = [
    { id: 'doc', label: 'Google Doc' },
    { id: 'process', label: 'AI Processing' },
    { id: 'code', label: 'Live Product' }
  ] as const;
</script>

<div class="bg-black bg-opacity-50 backdrop-blur-sm rounded-3xl border border-white border-opacity-5 overflow-hidden">
  <!-- Tabs -->
  <div class="flex gap-2 p-2">
    {#each steps as step}
      <button
        class="px-4 py-2 text-sm rounded-xl transition-colors
               {$landingStore.activeExportStep === step.id ? 
                 'bg-white bg-opacity-10 text-white' : 
                 'text-white text-opacity-40 hover:text-opacity-60'}"
        on:click={() => landingStore.setExportStep(step.id)}
      >
        {step.label}
      </button>
    {/each}
  </div>

  <!-- Preview Area -->
  <div class="p-8 min-h-[400px]">
    {#key $landingStore.activeExportStep}
      <div in:fade={{ duration: 200 }}>
        {#if $landingStore.activeExportStep === 'doc'}
          <div class="text-white text-opacity-60">
            Document preview...
          </div>
        {:else if $landingStore.activeExportStep === 'process'}
          <div class="text-white text-opacity-60">
            Processing animation...
          </div>
        {:else}
          <div class="text-white text-opacity-60">
            Code preview...
          </div>
        {/if}
      </div>
    {/key}
  </div>
</div>