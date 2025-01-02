<!-- Testimonials.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  const testimonials = [
    {
      quote: "Ivan completely transformed our technical documentation into a compelling narrative. The redesign speaks our language while making complex concepts accessible.",
      author: "Sarah Chen",
      role: "CTO",
      company: "OrbitDyne",
      imgSrc: "/api/placeholder/100/100"
    },
    {
      quote: "Working with a developer who understands both code and aerospace engineering made all the difference. Our conversion rate doubled within weeks.",
      author: "Alex Martinez",
      role: "Head of Growth",
      company: "LaunchMetrics",
      imgSrc: "/api/placeholder/100/100"
    },
    {
      quote: "The attention to detail in preserving our technical accuracy while improving UX was impressive. Worth every penny.",
      author: "Dr. James Wilson",
      role: "Founder",
      company: "StellarPropulsion",
      imgSrc: "/api/placeholder/100/100"
    }
  ];
</script>

<div class="relative w-full py-12">
  <div class="flex flex-col md:flex-row gap-8 md:overflow-x-auto md:snap-x md:snap-mandatory pb-4 scroll-smooth">
    {#each testimonials as card, i}
      <div 
        class="relative flex-shrink-0 md:w-[400px] p-6 rounded-xl border bg-card text-card-foreground 
               shadow-sm hover:shadow-md transition-all snap-center"
        in:fly={{ x: 1000, duration: 800, delay: 150 * (i + 1), easing: quintOut }}
        style="transform: rotate({-1 + Math.random() * 2}deg)"
      >
        <div class="space-y-4">
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
          
          <blockquote class="text-muted-foreground">
            "{card.quote}"
          </blockquote>
        </div>
      </div>
    {/each}
  </div>

  <!-- Gradient fade edges on desktop -->
  <div class="hidden md:block absolute left-0 top-0 bottom-4 w-16 
              bg-gradient-to-r from-background to-transparent pointer-events-none" />
  <div class="hidden md:block absolute right-0 top-0 bottom-4 w-16 
              bg-gradient-to-l from-background to-transparent pointer-events-none" />
</div>

<style>
  /* Hide scrollbar but keep functionality */
  .scroll-smooth {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scroll-smooth::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    .scroll-smooth {
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>