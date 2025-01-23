<!-- src/lib/(space)/components/cta/CTA.svelte -->
<script lang="ts">
  import Calendar from './Calendar.svelte';
  import PricingCard from './PricingCard.svelte';
  import BookingTestimonial from '../proof/BookingTestimonial.svelte';

  export let isModal = false;
  const calendarId = isModal ? 'modal-calendar' : 'main-calendar';
</script>

<div class="w-full bg-black/30 rounded-xl border border-border/50 overflow-hidden">
  <div class="grid gap-8 p-6 md:p-8">
    <!-- Mobile: Price card on top -->
    <div class="block md:hidden">
      <PricingCard />
    </div>
    
    <!-- Main content grid -->
    <div class="grid md:grid-cols-[2fr_1fr] md:gap-8 h-full">
      <!-- Calendar: Scrollable container that gets clipped -->
      <div class="order-last md:order-first h-[calc(100vh-24rem)] md:h-auto relative">
        <div class="absolute inset-0">
          <Calendar calLink="pipewriter/space" elementId={calendarId} />
        </div>
      </div>
      
      <!-- Right side content -->
      <div class="hidden md:flex flex-col gap-8">
        <PricingCard />
        <BookingTestimonial />
      </div>
    </div>

    <!-- Mobile testimonial - only show in main page -->
    {#if !isModal}
      <div class="block md:hidden pt-4">
        <BookingTestimonial />
      </div>
    {/if}
  </div>
</div>