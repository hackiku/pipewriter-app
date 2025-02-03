<!-- src/lib/pages/landing/sections/proof/Proof.svelte -->
<script lang="ts">
  import { userTestimonials } from '$data/proof/testimonials/users';
  import UserCard from './UserCard.svelte';
  import FounderCard from './FounderCard.svelte';

  // Split testimonials to insert founder card after first two
  $: firstGroup = userTestimonials.slice(0, 2);
  $: remainingGroup = userTestimonials.slice(2);
</script>


<!-- <FounderCard /> -->

<!-- <section class="py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32"> -->
  <div class="max-w-7xl __mx-auto">

    <!-- Masonry Grid -->
    <ul class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [&>li:first-child]:mt-0">
      <!-- First Two Testimonials -->
      {#each firstGroup as testimonial}
        <li class="break-inside-avoid">
          <UserCard {testimonial} />
        </li>
      {/each}

      <!-- Founder Card -->
      <li class="break-inside-avoid lg:col-span-2">
        <FounderCard />
      </li>

      <!-- Remaining Testimonials -->
      {#each remainingGroup as testimonial}
        <li class="break-inside-avoid">
          <UserCard {testimonial} />
        </li>
      {/each}
    </ul>
  </div>
<!-- </section> -->