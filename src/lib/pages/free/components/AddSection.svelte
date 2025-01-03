<!-- src/lib/pages/free/components/AddSection.svelte -->
<script lang="ts">
  import { Plus } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let order: number;
  
  const dispatch = createEventDispatcher<{
    click: { order: number }
  }>();
  
  function handleAdd() {
    dispatch('click', { order });
  }
</script>

<div class="max-w-screen-xl mx-auto px-4 py-12">
  <button
    class="group relative w-full h-24 rounded-lg border-2 border-dashed border-primary/30 
           overflow-hidden transition-all duration-200"
    on:click={handleAdd}
  >
    <!-- Striped Background -->
    <div 
      class="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
      style="
        background: repeating-linear-gradient(
          45deg,
          rgba(54, 68, 254, 0.35),
          rgba(179, 69, 237, 0.15) 25%,
          transparent 25%,
          transparent 50%
        );
        background-size: 32px 32px;
      "
    />
    
    <!-- Content -->
    <div class="relative flex items-center justify-center gap-2 text-primary/70 group-hover:text-primary/90">
      <Plus class="w-6 h-6" />
      <span class="text-sm font-medium">Add Section</span>
    </div>
  </button>
</div>

<style>
  @keyframes slideStripes {
    from { background-position: 0 0; }
    to { background-position: 32px 32px; }
  }

  button:hover div:first-child {
    animation: slideStripes 2s linear infinite;
  }
</style>