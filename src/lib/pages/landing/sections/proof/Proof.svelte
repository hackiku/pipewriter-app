<!-- src/lib/pages/landing/sections/proof/Proof.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import FounderCard from "./FounderCard.svelte";
  import UserCard from "./UserCard.svelte";

  const testimonials = [
    {
      name: "Warren West",
      role: "Copy Chief @ WarrenWords",
      quote: "Thanks Ivan! This looks super cool and is probably 1000x better than the wireframing I've been doing in Gdocs.",
      imageSrc: "/testimonials/warren.png"
    },
    {
      name: "Giorgi C.",
      role: "Freelance Copywriter",
      quote: "Clients immediately get the vision when they see the wireframe structure. Revisions become much easier or they don't even ask.",
      imageSrc: "/testimonials/giorgi.png"
    },
    {
      name: "Eoin Cronolly",
      role: "SaaS Copywriter",
      quote: "I've never seen a tool like this that works natively in Docs. I've been building wireframes by hand using tables, even for five-figure contracts.",
      imageSrc: "/testimonials/eoin.png"
    }
    // Add more testimonials as needed
  ];

  let container: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    container.querySelectorAll('.testimonial-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  });
</script>

<section class="py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
  <div class="max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <h2 class="text-4xl font-medium mb-4">
        Made With 🫶 for Writers
      </h2>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
        Join hundreds of writers who are delivering better work and charging more for it.
      </p>
    </div>

    <!-- Masonry Grid -->
    <div 
      bind:this={container}
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]"
    >
      <!-- First two testimonials -->
      {#each testimonials.slice(0, 2) as testimonial, i}
        <div class="testimonial-card">
          <UserCard {...testimonial} {i} />
        </div>
      {/each}

      <!-- Founder Card -->
      <div class="testimonial-card lg:col-span-2">
        <FounderCard />
      </div>

      <!-- Remaining testimonials -->
      {#each testimonials.slice(2) as testimonial, i}
        <div class="testimonial-card">
          <UserCard {...testimonial} index={i + 2} />
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .testimonial-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }

  .testimonial-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>