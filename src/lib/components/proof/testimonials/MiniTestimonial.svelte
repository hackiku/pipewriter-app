<!-- src/lib/components/proof/BookingTestimonial.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  const testimonials = [
    {
      quote: "We grew revenue to $960k from $200k average",
      author: "Tommy Joiner",
      role: "Co-Founder",
      company: "WordAgents",
      imgSrc: 'people/clients/tommy-joiner.jpg'
    },
    {
      quote: "Wow, this guy is incredible — a level above & beyond anything I could have hoped for",
      author: "David Thomson",
      role: "Founder",
      company: "Suada",
      imgSrc: 'people/clients/david-thomson.jpeg'
    },
    {
      quote: "Exceptionally high quality of work. Makes a real effort to understand the product",
      author: "Ben Carey",
      role: "CTO",
      company: "Bubbla",
      imgSrc: 'people/clients/ben-carey.jpeg'
    }
  ];

  let currentIndex = 0;
  let intervalId: NodeJS.Timeout;

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
  }

  onMount(() => {
    // Start auto-rotate when component mounts
    intervalId = setInterval(nextTestimonial, 5000);
  });

  onDestroy(() => {
    // Clean up interval when component is destroyed
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

<div class="space-y-3 py-4">
  <!-- <h4 class="text-sm font-medium uppercase tracking-wide text-muted-foreground">
    Client Feedback
  </h4> -->
  
  <div class="min-h-[120px]">
    {#key currentIndex}
      <div class="space-y-3" in:fade={{ duration: 300 }}>
        <blockquote class="text-sm italic">
          "{testimonials[currentIndex].quote}"
        </blockquote>
        
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full overflow-hidden bg-muted">
            <img 
              src={testimonials[currentIndex].imgSrc} 
              alt={testimonials[currentIndex].author}
              class="w-full h-full object-cover"
            />
          </div>
          <div class="text-sm">
            <span class="font-medium">{testimonials[currentIndex].author}</span>
            <span class="text-muted-foreground">
              , {testimonials[currentIndex].role} @ {testimonials[currentIndex].company}
            </span>
          </div>
        </div>
      </div>
    {/key}
  </div>

  <!-- Dots -->
  <div class="flex gap-1.5">
    {#each testimonials as _, i}
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