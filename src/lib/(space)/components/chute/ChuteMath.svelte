<!-- src/lib/pages/space/components/chute/ChuteMath.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Send } from 'lucide-svelte';

  // Animation states
  let isVisible = false;
  
  onMount(() => {
    isVisible = true;
  });
</script>

<div class="relative aspect-[9/16] w-full">
  <!-- Pseudo-3D Container -->
  <div 
    class="absolute inset-0 perspective-1000 transform-gpu"
    style:opacity={isVisible ? 1 : 0}
    style:transition="opacity 1s ease-out"
  >
    <!-- Line Art Container -->
    <div class="relative h-full rotate-x-12">
      <!-- Placeholder Line Art -->
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <!-- Pseudo Math Equations -->
        <div class="space-y-4 text-sm text-muted-foreground font-mono">
          <div>CD = 1.75 * (Re/1000)^-0.15</div>
          <div>v = √(2mg/ρACD)</div>
        </div>
        
        <!-- Price Tag -->
        <div class="absolute bottom-8 right-8 
                    bg-primary/10 backdrop-blur-sm border border-primary/20 
                    px-6 py-3 rounded-xl">
          <div class="flex items-end gap-2">
            <span class="text-3xl font-bold text-primary">$2k</span>
            <span class="text-sm text-primary/80 mb-1">/page</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>