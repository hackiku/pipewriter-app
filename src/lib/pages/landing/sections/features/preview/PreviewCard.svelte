<!-- src/lib/pages/landing/sections/features/preview/PreviewCard.svelte -->
<script lang="ts">
  import type { DriveNode } from '../../../data/folders';

  export let item: DriveNode;
  export let isActive: boolean = false;
</script>

<div 
  class="w-full aspect-video rounded-xl overflow-hidden border bg-zinc-950 text-white
         transition-all duration-300 relative
         {isActive ? 'border-primary scale-[1.02]' : 'border-white/10'}"
>
  <!-- Content Area (video/image placeholder) -->
  <div class="absolute inset-0">
    <!-- Video player or image would go here -->
    <div class="w-full h-full bg-zinc-900/50" />
  </div>

  <!-- Gradient Overlay - stronger and more focused at bottom -->
  <div 
    class="absolute inset-0 bg-gradient-to-t 
           from-black via-black/80 to-transparent
           [--gradient-stop-1:75%] [--gradient-stop-2:100%]"
  />
  
  <!-- Content positioned in bottom quarter -->
  <div class="absolute inset-x-0 bottom-0 h-1/4 flex items-center px-8">
    <div class="flex items-center gap-6 w-full">
      <!-- Emoji Column -->
      <div class="text-5xl">{item.preview?.emoji}</div>
      
      <!-- Text Column -->
      <div class="flex-1">
        <h3 class="text-xl font-medium mb-1">{item.preview?.title}</h3>
        <p class="text-sm text-white/70">{item.preview?.description}</p>
      </div>
    </div>
  </div>
</div>