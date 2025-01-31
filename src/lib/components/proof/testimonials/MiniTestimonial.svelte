<!-- src/lib/components/proof/MiniTestimonial.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Button } from "$lib/components/ui/button";
  import { ExternalLink } from 'lucide-svelte';
  import { userTestimonials } from '$data/proof/testimonials/users';

  // Filter to just Giorgi and Warren's testimonials for the mini version
  const miniTestimonials = userTestimonials.filter(t => 
    t.author === "Giorgi C." || t.author === "Warren West"
  );

  let currentIndex = 0;
  let intervalId: NodeJS.Timeout;

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % miniTestimonials.length;
  }

  onMount(() => {
    intervalId = setInterval(nextTestimonial, 5000);
  });

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

<div class="space-y-4">
  <div class="min-h-[100px]">
    {#key currentIndex}
      <div class="space-y-3" in:fade={{ duration: 300 }}>
        <blockquote class="text-sm text-muted-foreground">
          "{miniTestimonials[currentIndex].quote.short}"
        </blockquote>
        
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full overflow-hidden bg-muted">
              <img 
                src={miniTestimonials[currentIndex].imgSrc} 
                alt={miniTestimonials[currentIndex].author}
                class="w-full h-full object-cover"
              />
            </div>
            <div class="text-sm">
              <span class="font-medium">
                {miniTestimonials[currentIndex].author}
              </span>
              <span class="text-muted-foreground">
                , {miniTestimonials[currentIndex].role}
              </span>
            </div>
          </div>

          {#if miniTestimonials[currentIndex].hire}
            <Button 
              variant="ghost" 
              size="sm"
              class="group"
              href={miniTestimonials[currentIndex].hire.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="text-xs">
                {miniTestimonials[currentIndex].hire.buttonText}
              </span>
              <ExternalLink class="w-3 h-3 ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Button>
          {/if}
        </div>
      </div>
    {/key}
  </div>

  <!-- Dots -->
  <div class="flex gap-1.5">
    {#each miniTestimonials as _, i}
      <button
        class="w-1.5 h-1.5 rounded-full transition-colors"
        class:bg-primary={i === currentIndex}
        class:bg-muted={i !== currentIndex}
        on:click={() => currentIndex = i}
      >
        <span class="sr-only">Testimonial {i + 1}</span>
      </button>
    {/each}
  </div>
</div>