<!-- src/lib/pages/landing/sections/proof/Proof.svelte -->
<script lang="ts">
  import { userTestimonials } from "$data/proof/testimonials/users";
  import UserCard from "./UserCard.svelte";
  import FounderCard from "./FounderCard.svelte";
</script>

<div class="max-w-7xl mx-auto">
  <!-- Single Column (visible < md) -->
  <ul class="md:hidden space-y-6">
    <li><UserCard testimonial={userTestimonials[0]} /></li>
    <li><UserCard testimonial={userTestimonials[1]} /></li>
    <li><FounderCard /></li>
    {#each userTestimonials.slice(2) as testimonial}
      <li><UserCard {testimonial} /></li>
    {/each}
  </ul>

  <!-- Two Columns (visible md-lg) -->
  <div class="hidden md:block lg:hidden">
    <div class="grid grid-cols-2 gap-6">
      <!-- Left Column -->
      <div class="space-y-6">
        <UserCard testimonial={userTestimonials[0]} />
        {#each userTestimonials.slice(2, 4) as testimonial}
          <UserCard {testimonial} />
        {/each}
      </div>
      <!-- Right Column (founder 2nd) -->
      <div class="space-y-6">
        <UserCard testimonial={userTestimonials[1]} />
        <FounderCard />
        {#each userTestimonials.slice(4) as testimonial}
          <UserCard {testimonial} />
        {/each}
      </div>
    </div>
  </div>

  <!-- Three Columns (visible lg+) -->
  <div class="hidden lg:block">
    <div class="grid grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="space-y-6">
        <UserCard testimonial={userTestimonials[0]} />
        {#each userTestimonials.slice(3, 5) as testimonial}
          <UserCard {testimonial} />
        {/each}
      </div>
      <!-- Center Column (founder 2nd) -->
      <div class="space-y-6">
        <UserCard testimonial={userTestimonials[1]} />
        <FounderCard />
        {#each userTestimonials.slice(5) as testimonial}
          <UserCard {testimonial} />
        {/each}
      </div>
      <!-- Right Column -->
      <div class="space-y-6">
        <UserCard testimonial={userTestimonials[2]} />
      </div>
    </div>
  </div>
</div>