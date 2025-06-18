<!-- src/lib/pages/landing/sections/features/WriterShoutout.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
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

<!-- Simplified layout without border/background (handled by parent container) -->
<div class="space-y-4">
  <!-- Writer Info -->
  {#key activeIndex}
    <!-- Quote -->
    <blockquote
      class="text-sm font-medium text-muted-foreground leading-relaxed"
      in:fade={{ duration: 200, delay: 100 }}
    >
      "{shoutouts[activeIndex].quote}"
    </blockquote>

    <div class="flex items-center gap-3" in:fade={{ duration: 200 }}>
      <!-- Avatar -->
      <div class="w-8 h-8 rounded-full overflow-hidden border">
        <img
          src={shoutouts[activeIndex].image}
          alt={shoutouts[activeIndex].writer}
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Writer Details -->
      <div class="flex flex-col gap-0.5">
        <div class="text-xs font-medium">{shoutouts[activeIndex].writer}</div>
        <div class="text-xs text-muted-foreground">
          {shoutouts[activeIndex].role}
        </div>
      </div>
    </div>
  {/key}
</div>