<!-- src/lib/pages/landing/sections/samples/TestimonialBubble.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { scale, fade } from 'svelte/transition';
  import type { SampleTestimonial } from './data';
  
  export let testimonial: SampleTestimonial;
  export let isMobile = false;
  
  let isExpanded = false;
  let bubbleRef: HTMLDivElement;
  
  const dispatch = createEventDispatcher();
  
  function toggleExpanded() {
    isExpanded = !isExpanded;
  }
  
  function handleClickOutside(event: Event) {
    if (bubbleRef && !bubbleRef.contains(event.target as Node)) {
      isExpanded = false;
    }
  }
  
  function handleBubbleClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    toggleExpanded();
  }
  
  // Bubble appears above the avatar
  $: bubbleDirection = "bottom-full mb-3";
</script>

<svelte:window on:click={handleClickOutside} />

<!-- Simplified container without absolute positioning -->
<div 
  bind:this={bubbleRef}
  class="relative"
>
  <!-- Expanded Bubble -->
  {#if isExpanded}
    <div 
      class="absolute {bubbleDirection} right-0 w-64 p-4 bg-white dark:bg-zinc-900 border border-border rounded-xl shadow-xl z-[101]"
      style="z-index: 10001;"
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      <!-- Quote -->
      <blockquote class="text-sm text-muted-foreground mb-3 leading-relaxed">
        "{testimonial.text}"
      </blockquote>
      
      <!-- Author Info -->
      <div class="flex items-center gap-3">
        <img 
          src={testimonial.photo} 
          alt={testimonial.name}
          class="w-8 h-8 rounded-full object-cover"
          draggable="false"
        />
        <div class="text-xs">
          <div class="font-medium">{testimonial.name}</div>
          <div class="text-muted-foreground">
            {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
          </div>
        </div>
      </div>
      
      <!-- Arrow pointing to avatar -->
      <div class="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-zinc-900">
      </div>
    </div>
  {/if}
  
  <!-- Avatar Button - Always clickable with guaranteed z-index -->
  <button
    class="relative w-12 h-12 rounded-full border-2 border-white dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden hover:scale-110 active:scale-95"
    class:ring-2={isExpanded}
    class:ring-primary={isExpanded}
    on:click={handleBubbleClick}
    style="z-index: 10000;"
  >
    <img 
      src={testimonial.photo} 
      alt={testimonial.name}
      class="w-full h-full object-cover select-none pointer-events-none"
      draggable="false"
    />
    
    <!-- Pulse indicator when not expanded -->
    {#if !isExpanded}
      <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
    {/if}
  </button>
</div>

<style>
  /* Ensure images can't be dragged */
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>