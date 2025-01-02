<!-- src/lib/pages/free/components/AddSection.svelte -->

<script lang="ts">
  import { Plus } from 'lucide-svelte';
  import { elementConfig } from '../config';
  import { editorStore } from '../stores/editorStore';
  
  export let order: number;
  
  function handleAdd() {
    const menu = elementConfig.map(element => ({
      label: element.label,
      icon: element.icon,
      onClick: () => editorStore.addSection(element.type, order)
    }));
    
    // Show menu (implement dropdown/popover logic)
  }
</script>

<div 
  class="h-24 mx-auto max-w-screen-xl opacity-0 group-hover:opacity-30 transition-opacity"
>
  <button
    class="w-full h-full rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors"
    on:click={handleAdd}
  >
    <Plus class="w-6 h-6 text-primary/50" />
  </button>
</div>