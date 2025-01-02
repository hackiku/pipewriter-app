<!-- src/lib/pages/free/components/sections/Testimonials.svelte -->
<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { ExternalLink } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { Editable, Styles } from '../editor';

  export let content: {
    cards: Array<{
      imgSrc: string;
      firstName: string;
      lastName: string;
      quote: string;
      role: string;
    }>;
  };
  export let visible = false;
</script>

{#if visible}
  <div class="relative w-full" in:fade={{ duration: 300 }}>
    <div class="flex flex-col md:flex-row gap-8 md:overflow-x-auto md:snap-x md:snap-mandatory md:pb-4 scroll-smooth">
      {#each content.cards as card, i}
        <Styles sectionId={`testimonial-${i}`}>
          <div
            class="relative flex-shrink-0 md:w-[500px] flex flex-col md:flex-row gap-6 p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all snap-center"
            in:fly={{
              x: 1000,
              duration: 800,
              delay: 150 * (i + 1),
              easing: quintOut,
            }}
            style="transform: rotate({-1 + Math.random() * 2}deg)"
          >
            <div class="shrink-0">
              <div class="w-16 h-16 rounded-full bg-muted overflow-hidden">
                <img
                  src={card.imgSrc}
                  alt={`${card.firstName} ${card.lastName}`}
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <div class="flex-1 space-y-4">
              <Editable
                path={['testimonials', 'cards', i, 'quote']}
                value={card.quote}
                class="text-lg text-muted-foreground italic"
              />

              <div class="flex items-end justify-between">
                <div>
                  <Editable
                    path={['testimonials', 'cards', i, 'firstName']}
                    value={card.firstName}
                    class="font-semibold inline"
                  />
                  <Editable
                    path={['testimonials', 'cards', i, 'lastName']}
                    value={card.lastName}
                    class="font-semibold inline ml-1"
                  />
                  <Editable
                    path={['testimonials', 'cards', i, 'role']}
                    value={card.role}
                    class="text-sm text-muted-foreground block"
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  class="group whitespace-nowrap"
                >
                  Hire {card.firstName}
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

    <div class="hidden md:block absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
    <div class="hidden md:block absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
  </div>
{/if}


<style>
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