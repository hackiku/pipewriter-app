<!-- src/lib/(space)/content/features/Problem.svelte -->
<script lang="ts">
  import { spaceStore } from '../../stores/spaceStore';
  
  let problemSection: HTMLElement;
  
  // Simple scroll for text only
  $: scrollY = problemSection ? 
    Math.max(0, ($spaceStore.scrollY - problemSection.offsetTop) * 0.4) : 0;
</script>

<div 
  class="min-h-[100vh] flex items-center bg-green-800/10"
  bind:this={problemSection}
>
  <div 
    class="w-full transform-gpu"
    style="transform: translate3d(0, {-scrollY}px, 0)"
  >
    <div class="container max-w-xl mx-auto px-4">
      <p class="text-2xl md:text-3xl text-center leading-relaxed">
        Your rockets rock hard but your website feels like 1969?
        <span class="text-muted-foreground">Modern space companies 
        need a web presence that matches their technical innovation.</span>
      </p>
    </div>
  </div>
</div>