<!-- src/lib/pages/landing/sections/demo/Demo.svelte -->
<script lang="ts">
  import VideoPlayer from './VideoPlayer.svelte';
  import DocsDemo from '$lib/components/demo/docs/DocsDemo.svelte';
  import { Button } from "$lib/components/ui/button";
  import { Play } from "lucide-svelte";
  
  let isVideoOpen = false;
</script>

<div class="relative">
  <!-- Demo Container with Gradient Border -->
  <div class="relative w-full aspect-[16/10] rounded-lg border overflow-hidden 
              shadow-xl bg-zinc-950">
    <!-- Gradient Overlay for Visual Interest -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 
                pointer-events-none" />
    
    <!-- Docs Demo with Scrollable Container -->
    <div class="absolute inset-0 overflow-auto">
      <DocsDemo />
    </div>
  </div>

  <!-- Floating Video Button -->
  <div class="relative -mt-10 flex justify-center">
    <Button 
      variant="secondary" 
      size="lg"
      class="rounded-full px-8 shadow-lg hover:shadow-xl transition-all
             bg-background/80 backdrop-blur-sm hover:bg-background
             relative z-10"
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

<style>
  /* Enable smooth scrolling for demo container */
  .overflow-auto {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }

  /* Custom scrollbar styling */
  .overflow-auto::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .overflow-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .overflow-auto::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  .overflow-auto::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>