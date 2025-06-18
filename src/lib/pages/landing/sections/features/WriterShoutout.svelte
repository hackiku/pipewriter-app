<!-- src/lib/pages/landing/sections/features/WriterShoutout.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { cn } from "$lib/utils";
  import { shoutouts } from "../../data/shoutouts";

  let activeId = 'writer1'; // Default to first writer
  let unsubscribe: (() => void) | null = null;

  // Listen for step changes from parent component
  onMount(() => {
    function handleStepChange(event: CustomEvent) {
      if (event.detail?.shoutoutId) {
        activeId = event.detail.shoutoutId;
      }
    }

    // Listen for the custom event dispatched from Features.svelte
    window.addEventListener('stepChanged', handleStepChange);
    
    unsubscribe = () => {
      window.removeEventListener('stepChanged', handleStepChange);
    };
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  // Calculate active index from activeId
  $: activeIndex = (() => {
    if (!activeId) return 0;
    const index = parseInt(activeId.replace('writer', '')) - 1;
    return index >= 0 && index < shoutouts.length ? index : 0;
  })();
</script>

<div class="bg-background/95 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl space-y-6">
  <!-- Writer Info -->
  {#key activeIndex}
    <!-- Quote -->
    <blockquote
      class="text-md font-medium text-muted-foreground"
      in:fade={{ duration: 200, delay: 100 }}
    >
      "{shoutouts[activeIndex].quote}"
    </blockquote>

    <div class="flex items-center gap-4" in:fade={{ duration: 200 }}>
      <!-- Avatar -->
      <div class="w-10 h-10 rounded-full overflow-hidden border">
        <img
          src={shoutouts[activeIndex].image}
          alt={shoutouts[activeIndex].writer}
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Writer Details -->
      <div class="flex flex-col gap-1">
        <div class="text-sm font-medium">{shoutouts[activeIndex].writer}</div>
        <div class="text-xs text-muted-foreground">
          {shoutouts[activeIndex].role}
        </div>
      </div>
    </div>
  {/key}

  <!-- Simple Dots Progress -->
  <div class="flex justify-center gap-2">
    {#each shoutouts as _, i}
      <div class={cn(
        "w-2 h-2 rounded-full transition-all duration-300",
        i === activeIndex ? "bg-foreground" : "bg-muted"
      )}></div>
    {/each}
  </div>
</div>
