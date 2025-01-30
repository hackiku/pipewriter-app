<!-- src/lib/pages/landing/sections/demo/Demo.svelte -->
<script lang="ts">
  import VideoPlayer from './VideoPlayer.svelte';
  import { Button } from "$lib/components/ui/button";
  import { Play } from "lucide-svelte";
  
  let isVideoOpen = false;
</script>

<div class="relative">
  <!-- Demo Placeholder - Will be replaced with actual app demo -->
  <div class="relative w-full aspect-[16/10] bg-muted/30 rounded-lg border 
              overflow-hidden shadow-xl backdrop-blur-sm">
    <div class="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10" />
    
    <!-- Placeholder Content -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-2xl text-muted-foreground font-light">
        App Demo
      </div>
    </div>
  </div>

  <!-- Video Button -->
  <div class="relative -mt-10 flex justify-center">
    <Button 
      variant="secondary" 
      size="lg"
      class="rounded-full px-8 shadow-lg hover:shadow-xl transition-all
             bg-background/80 backdrop-blur-sm hover:bg-background"
      on:click={() => isVideoOpen = true}
    >
      <Play class="w-5 h-5 mr-2" />
      Watch Demo
    </Button>
  </div>
</div>

{#if isVideoOpen}
  <VideoPlayer onClose={() => isVideoOpen = false} />
{/if}