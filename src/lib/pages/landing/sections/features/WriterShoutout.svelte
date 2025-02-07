<!-- src/lib/pages/landing/sections/features/WriterShoutout.svelte -->
<script lang="ts">
  import { fade } from "svelte/transition";
  import { driveStore } from "../../stores/driveStore";
  import { shoutouts } from "../../data/shoutouts";

  $: activeId = $driveStore.activeShoutoutId;
  // Fix index calculation for all 4 testimonials
  $: activeIndex = (() => {
    if (!activeId) return 0;
    const index = parseInt(activeId.replace('writer', '')) - 1;
    return index >= 0 && index < shoutouts.length ? index : 0;
  })();
  
  // Calculate progress percentage (0-100)
  $: progress = ((activeIndex + 1) / shoutouts.length) * 100;
</script>

<div class="space-y-6">
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

  <!-- Segmented Progress Bar -->
  <div class="relative h-1">
    <!-- Background segments -->
    <div class="absolute inset-0 flex gap-1">
      {#each shoutouts as _, i}
        <div class="flex-1 rounded-full bg-muted"/>
      {/each}
    </div>
    
    <!-- Progress overlay with gradient -->
    <div 
      class="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3644FE] to-[#B345ED] rounded-full transition-all duration-300"
      style="width: {progress}%"
    />
    
    <!-- Segment dividers - subtle white lines -->
    <div class="absolute inset-0 flex gap-1 pointer-events-none">
      {#each shoutouts as _, i}
        {#if i > 0}
          <div class="w-px bg-background/20 -ml-0.5"/>
        {/if}
        <div class="flex-1"/>
      {/each}
    </div>
  </div>
</div>