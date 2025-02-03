<!-- src/lib/pages/landing/sections/proof/Proof.svelte -->
<script lang="ts">
  import { userTestimonials } from "$data/proof/testimonials/users";
  import UserCard from "./UserCard.svelte";
  import FounderCard from "./FounderCard.svelte";

  const maxCards = {
    mobile: 5,  // Total cards for mobile (including founder)
    md: {
      leftCol: 4,
      rightCol: 4  // Including founder
    },
    lg: {
      leftCol: 4,
      midCol: 3,   // Including founder
      rightCol: 4
    }
  };
</script>

<div class="max-w-7xl mx-auto">
  <!-- Single Column -->
  <ul class="md:hidden space-y-6">
    <li><UserCard testimonial={userTestimonials[0]} /></li>
    <li><UserCard testimonial={userTestimonials[1]} /></li>
    <li><FounderCard /></li>
    {#each userTestimonials.slice(2, maxCards.mobile - 1) as testimonial}
      <li><UserCard {testimonial} /></li>
    {/each}
  </ul>

  <!-- Two Columns -->
  <div class="hidden md:block lg:hidden">
    <div class="grid grid-cols-2 gap-6">
      <!-- Left Column -->
      <div class="space-y-6">
        <UserCard testimonial={userTestimonials[0]} />
        {#each userTestimonials.slice(2, 2 + maxCards.md.leftCol - 1) as testimonial}
          <UserCard {testimonial} />
        {/each}
      </div>
      <!-- Right Column -->
      <div class="space-y-6">
        <UserCard testimonial={userTestimonials[1]} />
        <FounderCard />
        {#each userTestimonials.slice(maxCards.md.leftCol + 1, maxCards.md.leftCol + maxCards.md.rightCol - 2) as testimonial}
          <UserCard {testimonial} />
        {/each}
      </div>
    </div>
  </div>

  <!-- Three Columns -->
  <div class="hidden lg:block">
    <div class="grid grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="space-y-6">
        <UserCard testimonial={userTestimonials[0]} />
        {#each userTestimonials.slice(3, 3 + maxCards.lg.leftCol - 1) as testimonial}
          <UserCard {testimonial} />
        {/each}
      </div>
      <!-- Middle Column -->
      <div class="space-y-6">
        <UserCard testimonial={userTestimonials[1]} />
        <FounderCard />
        {#each userTestimonials.slice(maxCards.lg.leftCol + 2, maxCards.lg.leftCol + maxCards.lg.midCol) as testimonial}
          <UserCard {testimonial} />
        {/each}
      </div>
      <!-- Right Column -->
      <div class="space-y-6">
        <UserCard testimonial={userTestimonials[2]} />
        {#each userTestimonials.slice(maxCards.lg.leftCol + maxCards.lg.midCol) as testimonial}
          <UserCard {testimonial} />
        {/each}
      </div>
    </div>
  </div>
</div>