<!-- src/lib/pages/free/components/sections/Testimonials.svelte -->
<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { ExternalLink } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { Editable, Styles } from '../editor';
  import { contentStore, getFieldValue } from '../../stores/contentStore';

  export let visible = false;
  export let id = 'testimonials-section';

  // Get values reactively with fallbacks
  $: headlineText = getFieldValue($contentStore.content, ['testimonials', 'headline']) || 'What People Say';
  $: testimonials = Array.from({ length: 3 }).map((_, i) => ({
    imgSrc: "/api/placeholder/64/64",
    quote: getFieldValue($contentStore.content, ['testimonials', 'cards', i, 'quote']) || 'Amazing product...',
    firstName: getFieldValue($contentStore.content, ['testimonials', 'cards', i, 'firstName']) || 'John',
    lastName: getFieldValue($contentStore.content, ['testimonials', 'cards', i, 'lastName']) || 'Doe',
    role: getFieldValue($contentStore.content, ['testimonials', 'cards', i, 'role']) || 'Customer'
  }));
</script>

{#if visible}
  <section {id} class="container mx-auto px-4 md:px-8" in:fade={{ duration: 300 }}>
    <!-- Section Headline -->
    <Styles sectionId="testimonials-headline">
      <h2 class="text-4xl font-semibold tracking-tight text-center mb-16">
        <Editable
          path={['testimonials', 'headline']}
          value={headlineText}
          class="outline-none"
        />
      </h2>
    </Styles>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each testimonials as testimonial, i}
        <Styles sectionId={`testimonial-${i}`}>
          <div
            class="flex flex-col gap-6 p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all"
            in:fly={{
              y: 20,
              duration: 300,
              delay: 150 * (i + 1),
              easing: quintOut,
            }}
            style="transform: rotate({-1 + Math.random() * 2}deg)"
          >
            <!-- Avatar -->
            <div class="shrink-0">
              <div class="w-16 h-16 rounded-full bg-muted overflow-hidden">
                <img
                  src={testimonial.imgSrc}
                  alt={`${testimonial.firstName} ${testimonial.lastName}`}
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <div class="flex-1 space-y-4">
              <!-- Quote -->
              <Editable
                path={['testimonials', 'cards', i, 'quote']}
                value={testimonial.quote}
                class="text-lg text-muted-foreground italic"
              />

              <div class="flex items-end justify-between">
                <!-- Author Info -->
                <div>
                  <div class="font-semibold">
                    <Editable
                      path={['testimonials', 'cards', i, 'firstName']}
                      value={testimonial.firstName}
                      class="inline"
                    />
                    <Editable
                      path={['testimonials', 'cards', i, 'lastName']}
                      value={testimonial.lastName}
                      class="inline ml-1"
                    />
                  </div>
                  <Editable
                    path={['testimonials', 'cards', i, 'role']}
                    value={testimonial.role}
                    class="text-sm text-muted-foreground block"
                  />
                </div>

                <!-- Action Button -->
                <Button
                  variant="outline"
                  size="sm"
                  class="group whitespace-nowrap"
                >
                  Hire {testimonial.firstName}
                  <ExternalLink
                    class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Button>
              </div>
            </div>
          </div>
        </Styles>
      {/each}
    </div>
  </section>
{/if}