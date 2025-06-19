<!-- src/lib/pages/landing/sections/demo/Demo.svelte -->
<script lang="ts">
  import VideoPlayer from './VideoPlayer.svelte';
  import DocsDemo from '$lib/components/demo/docs/DocsDemo.svelte';
  import { Button } from "$lib/components/ui/button";
  import { Play } from "lucide-svelte";
  
  let isVideoOpen = false;
</script>

<div class="relative">
  <!-- Demo Container -->
  <div class="relative w-full aspect-[16/10] rounded-2xl border bg-zinc-950 overflow-hidden shadow-xl">
    <!-- Gradient Overlay for Visual Interest -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 
                pointer-events-none" />
    
    <!-- Docs Demo Container -->
    <div class="absolute inset-0">
      <DocsDemo />
    </div>
  </div>

  <!-- Video Button -->
  <div class="relative -mt-16 flex justify-center">
    <Button 
      variant="secondary" 
      size="lg"
      class="rounded-full px-8 shadow-lg hover:shadow-xl transition-all
             bg-background/80 backdrop-blur-sm hover:bg-background
             relative z-10"
      on:click={() => isVideoOpen = true}
    >
      <Play class="w-5 h-5 mr-2" />
      Watch Demo (2 min)
    </Button>
  </div>
</div>

{#if isVideoOpen}
  <VideoPlayer onClose={() => isVideoOpen = false} />
{/if}