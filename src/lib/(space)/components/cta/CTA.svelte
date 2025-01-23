<!-- src/lib/(space)/components/cta/CTA.svelte -->
<script lang="ts">
  import Calendar from './Calendar.svelte';
  import PricingCard from './PricingCard.svelte';
  import BookingTestimonial from '../proof/BookingTestimonial.svelte';

  // Generate a unique ID for this instance
  const calendarId = `space-calendar-${Math.random().toString(36).substring(7)}`;
</script>

<div class="w-full bg-black/30 rounded-xl border border-border/50 overflow-hidden">
  <div class="grid xl:grid-cols-[2fr_1fr] gap-0">
    <!-- Left: Calendar -->
    <div class="xl:border-r border-border/50 p-4 sm:p-6 xl:p-8">
      <div class="aspect-video xl:aspect-[3/2]">
        <Calendar calLink="pipewriter/space" />
      </div>
    </div>
    
    <!-- Right: Pricing & Testimonial -->
    <div class="flex flex-col gap-6 p-4 sm:p-6 xl:p-8 max-w-lg xl:max-w-none mx-auto w-full">
      <PricingCard />
      <div class="mt-auto border-t pt-6">
        <BookingTestimonial />
      </div>
    </div>
  </div>
</div>