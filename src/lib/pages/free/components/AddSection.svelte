<!-- src/lib/pages/free/components/AddSection.svelte -->
<script lang="ts">
  import { Plus } from 'lucide-svelte';
  import { elementConfig } from '../config';
  import { editorStore } from '../stores/editorStore';
  
  export let order: number;
  
  function handleAdd() {
    // For MVP, just log the click
    console.log('Add section clicked at order:', order);
  }
</script>

<div class="max-w-screen-xl mx-auto px-4 py-12">
  <button
    class="w-full h-24 rounded-lg border-2 border-dashed border-primary/30 
           flex items-center justify-center bg-primary/5 
           hover:bg-primary/10 hover:border-primary/50 
           transition-all duration-200"
    on:click={handleAdd}
  >
    <div class="flex items-center gap-2 text-primary/70">
      <Plus class="w-6 h-6" />
      <span class="text-sm font-medium">Add Section</span>
    </div>
  </button>
</div>