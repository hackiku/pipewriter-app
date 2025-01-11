<!-- src/lib/pages/space/components/repack/RepackLabel.svelte -->
<script lang="ts">
  export let type: 'before' | 'after';
  export let text = type === 'before' ? 'Before' : 'After';
</script>

<div 
  class="absolute -top-4 z-50 {type === 'before' ? 'left-8 -rotate-3' : 'right-8 rotate-3'}"
>
  <div 
    class="bg-white/10 backdrop-blur-sm 
           border border-white/20 
           px-6 py-2 rounded-full 
           text-white/90 font-medium
           shadow-lg 
           flex items-center gap-2
           {type === 'after' ? 'bg-primary/10 border-primary/20' : ''}"
  >
    <span class="w-2 h-2 rounded-full 
                 {type === 'after' ? 'bg-primary/50' : 'bg-white/50'}" />
    {text}
  </div>
</div>