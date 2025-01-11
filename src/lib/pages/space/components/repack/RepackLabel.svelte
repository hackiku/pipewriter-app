<!-- src/lib/pages/space/components/repack/RepackLabel.svelte -->
<script lang="ts">
  export let type: 'before' | 'after';
  export let text = type === 'before' ? 'Before' : 'After';
</script>

<div 
  class="absolute -top-4 z-20
         {type === 'before' ? 'left-8 -rotate-3' : 'right-8 rotate-3'}"
>
  <div 
    class="bg-white/10 backdrop-blur-sm 
           border border-white/20 
           px-6 py-2 rounded-full 
           text-white/90 font-medium
           shadow-lg 
           flex items-center gap-2"
  >
    <span class="w-2 h-2 rounded-full bg-white/50" />
    {text}
  </div>
</div>