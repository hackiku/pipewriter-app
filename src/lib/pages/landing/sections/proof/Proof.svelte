<!-- src/lib/pages/landing/sections/testimonials/Proof.svelte -->

<script lang="ts">
  import { userTestimonials } from '$data/proof/testimonials/users';
  import UserTestimonial from '$lib/components/proof/testimonials/UserTestimonial.svelte';
</script>

<div class="container max-w-6xl">
  <div class="text-center mb-16">
    <h2 class="text-4xl font-medium mb-4">
      For Writers Who Like it UX'y 🫶
    </h2>
  </div>

  <!-- Scrollable container with gradient edges -->
  <div class="relative">
    <div class="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory
                scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
      {#each userTestimonials as testimonial}
        <div class="flex-shrink-0 w-[min(100%,_24rem)] snap-center">
          <UserTestimonial {testimonial} />
        </div>
      {/each}
    </div>

    <!-- Gradient edges -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute left-0 top-0 bottom-8 w-16 
                  bg-gradient-to-r from-background to-transparent" />
      <div class="absolute right-0 top-0 bottom-8 w-16 
                  bg-gradient-to-l from-background to-transparent" />
    </div>
  </div>
</div>