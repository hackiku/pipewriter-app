<!-- src/lib/pages/(space)/components/chute/RepackLabel.svelte -->
<script lang="ts">
  export let type: 'before' | 'after';
  export let text = type === 'before' ? 'Before' : 'After';

  // SVG path for curved arrow
  const arrowPath = type === 'before' 
    ? 'M0,10 Q10,10 10,0 L12,2 M10,0 L8,2' // Points down
    : 'M0,0 Q10,0 10,10 L12,8 M10,10 L8,8';  // Points up
</script>

<div 
  class="absolute -top-2 z-50 
         {type === 'before' ? 'left-8' : 'right-8'}"
>
  <!-- Arrow -->
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    class="absolute {type === 'before' ? '-bottom-6 left-8' : '-bottom-6 right-8'} 
           {type === 'before' ? 'rotate-[-30deg]' : 'rotate-[30deg]'}"
  >
    <path
      d={arrowPath}
      stroke="currentColor"
      fill="none"
      stroke-width="2"
      class="text-primary/60"
    />
  </svg>

  <!-- Label -->
  <div 
    class="relative backdrop-blur-sm px-6 py-2 rounded-full shadow-lg 
           flex items-center gap-2
           {type === 'before' ? '-rotate-3' : 'rotate-3'}
           {type === 'after' 
             ? 'bg-primary/10 border border-primary/20 text-primary' 
             : 'bg-white/10 border border-white/20 text-white/90'}"
  >
    <span 
      class="w-2 h-2 rounded-full 
             {type === 'after' ? 'bg-primary/50' : 'bg-white/50'}" 
    />
    {text}
  </div>
</div>