<!-- lib/components/ComingSoon.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Clock } from 'lucide-svelte';
  import EmailForm from './EmailForm.svelte';
  import { cn } from '$lib/utils';
  import { onMount, onDestroy } from 'svelte';

  export let title = "Coming Soon";
  export let gif = "https://giphy.com/embed/tzHn7A5mohSfe";
  export let description = "This page is not ready yet. Join the waitlist to get notified when it launches!";
  export let className = "";

  let script: HTMLScriptElement;

  onMount(() => {
    // Remove any existing scripts first
    // document.querySelectorAll('script[src*="gumroad.com"]').forEach(s => s.remove());
    
    // Add fresh script
    script = document.createElement('script');
    script.src = 'https://gumroad.com/js/gumroad.js';
    document.body.appendChild(script);
  });

  // onDestroy(() => {
		
  //   if (script && script.parentNode) {
  //     script.parentNode.removeChild(script);
  //   }
  // });
</script>

<div 
  class={cn(
    "fixed inset-0 z-40",
    "bg-gradient-to-b from-background via-background/95 to-transparent",
    "backdrop-blur-sm",
    className
  )}
  transition:fade={{ duration: 200 }}
>
  <!-- Rest of your component stays exactly the same -->
  <div class="h-screen px-4 flex items-center justify-center">
    <div class="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-6xl">
      <div class="relative w-64 lg:w-80 aspect-square rounded-lg overflow-hidden shrink-0">
        <div class="absolute inset-0 pointer-events-none">
          <iframe
            src={gif}
            width="100%"
            height="100%"
            frameBorder="0"
            class="giphy-embed absolute inset-0 w-full h-full"
            style="pointer-events: none;"
          />
        </div>
      </div>

      <div class="flex flex-col gap-6 lg:gap-8 text-center lg:text-left max-w-md">
        <div class="space-y-3">
          <h2 class="text-3xl lg:text-4xl font-bold">{title}</h2>
          <p class="text-lg lg:text-xl text-muted-foreground">{description}</p>
        </div>

        <EmailForm size="sm" />

        <a 
          class="gumroad-button" 
          href="https://pipewriter.gumroad.com/l/wires-for-writers"
          data-gumroad-overlay-checkout="false"
        >
          Buy on
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .from-background {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.95;
    }
  }

  :global(.giphy-embed) {
    pointer-events: none !important;
  }
</style>