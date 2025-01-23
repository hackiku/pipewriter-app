<!-- src/lib/(space)/components/cta/CTA.svelte -->
<script lang="ts">
  import Calendar from './Calendar.svelte';
  import PricingCard from './PricingCard.svelte';
  import BookingTestimonial from '../proof/BookingTestimonial.svelte';

  export let isModal = false;
  const calendarId = isModal ? 'modal-calendar' : 'main-calendar';
</script>

<!-- Removed background, border, and padding from container -->
<div class="w-full">
  <!-- Using grid for spacing with gap -->
  <div class="grid gap-6">
    <!-- Mobile: Price card on top -->
    <div class="block lg:hidden">
      <PricingCard />
    </div>
    
    <!-- Main content grid -->
    <div class="grid lg:grid-cols-[2fr_1fr] h-full">
      <!-- Calendar: Scrollable container that gets clipped -->
      <div class="order-last lg:order-first h-[calc(100vh-24rem)] lg:h-auto relative 
                  lg:border-r lg:border-border/50">
        <div class="absolute inset-0">
          <Calendar calLink="pipewriter/space" elementId={calendarId} />
        </div>
      </div>
      
      <!-- Right side content with divider -->
      <div class="hidden lg:flex flex-col divide-y divide-border/50">
        <div class="p-6">
          <PricingCard />
        </div>
        <div class="p-6">
          <BookingTestimonial />
        </div>
      </div>
    </div>

    <!-- Mobile testimonial - only show in main page -->
    {#if !isModal}
      <div class="block lg:hidden">
        <BookingTestimonial />
      </div>
    {/if}
  </div>
</div>