<!-- src/lib/components/proof/Testimonial.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { testimonials } from '$data/proof/writerTestimonials';

  let containerEl: HTMLDivElement;
  let isDragging = false;
  let startX: number;
  let startY: number;
  let scrollLeft: number;
  let scrollTop: number;

  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    startX = e.pageX - containerEl.offsetLeft;
    startY = e.pageY - containerEl.offsetTop;
    scrollLeft = containerEl.scrollLeft;
    scrollTop = containerEl.scrollTop;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    e.preventDefault();
    
    if (window.innerWidth >= 768) {
      const x = e.pageX - containerEl.offsetLeft;
      const walk = (x - startX) * 2;
      containerEl.scrollLeft = scrollLeft - walk;
    } else {
      const y = e.pageY - containerEl.offsetTop;
      const walk = (y - startY) * 2;
      containerEl.scrollTop = scrollTop - walk;
    }
  }

  function handleDragEnd() {
    isDragging = false;
  }
</script>

<div class="relative w-full">
  <!-- Content Container -->
  <div 
    bind:this={containerEl}
    class="flex md:flex-row flex-col gap-8 overflow-auto snap-x md:snap-y 
           snap-mandatory scroll-smooth p-8 cursor-grab active:cursor-grabbing 
           select-none [&:not(:active)]:select-text md:h-full
					 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
    on:mousedown={handleMouseDown}
    on:mousemove={handleMouseMove}
    on:mouseup={handleDragEnd}
    on:mouseleave={handleDragEnd}
  >
    {#each testimonials as card, i}
      <div 
        class="relative flex-shrink-0 md:w-96 w-full p-6 rounded-xl border bg-card 
               text-card-foreground shadow-sm hover:shadow-md transition-all snap-center
               -rotate-[1.5deg] odd:rotate-[1.5deg]"
        in:fly={{ 
          x: window.innerWidth >= 768 ? 1000 : 0, 
          y: window.innerWidth < 768 ? 1000 : 0, 
          duration: 800, 
          delay: 150 * (i + 1), 
          easing: quintOut 
        }}
      >
        <div class="space-y-4">
          <blockquote class="text-muted-foreground">"{card.quote}"</blockquote>
          <div class="flex gap-4 items-center">
            <div class="w-12 h-12 rounded-full bg-muted overflow-hidden">
              <img 
                src={card.imgSrc} 
                alt={card.author}
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <div class="font-semibold">{card.author}</div>
              <div class="text-sm text-muted-foreground">
                {card.role}, {card.company}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Fixed Gradient Overlays -->
  <div class="absolute inset-0 pointer-events-none">
    <!-- Desktop horizontal fades -->
    <div class="hidden md:block absolute left-0 top-0 bottom-0 w-16 
                bg-gradient-to-r from-background to-transparent" />
    <div class="hidden md:block absolute right-0 top-0 bottom-0 w-16 
                bg-gradient-to-l from-background to-transparent" />

    <!-- Mobile vertical fades -->
    <div class="md:hidden absolute top-0 left-0 right-0 h-16 
                bg-gradient-to-b from-background to-transparent" />
    <div class="md:hidden absolute bottom-0 left-0 right-0 h-16 
                bg-gradient-to-t from-background to-transparent" />
  </div>
</div>