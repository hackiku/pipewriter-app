<!-- src/lib/pages/demo/Testimonials.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { ExternalLink } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import { demoContent } from "./data";
  
  export let visible = false;
</script>

{#if visible}
  <div 
    class="grid grid-cols-1 gap-8"
    in:fade={{ duration: 300 }}
  >
    {#each demoContent.testimonials.cards as card, i}
      <div 
        class="relative flex flex-col md:flex-row gap-6 p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
        in:fly={{ y: 20, duration: 300, delay: 150 * (i + 1), easing: quintOut }}
        style="transform: rotate({-1 + Math.random() * 2}deg)"
      >
        <!-- Avatar -->
        <div class="shrink-0">
          <div class="w-16 h-16 rounded-full bg-muted overflow-hidden">
            <img 
              src={card.imgSrc} 
              alt={`${card.firstName} ${card.lastName}`}
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 space-y-4">
          <blockquote 
            class="text-lg text-muted-foreground italic outline-none cursor-text"
            contenteditable="true"
          >
            "{card.quote}"
          </blockquote>

          <div class="flex items-end justify-between">
            <div>
              <div 
                class="font-semibold outline-none cursor-text"
                contenteditable="true"
              >
                {card.firstName} {card.lastName}
              </div>
              <div 
                class="text-sm text-muted-foreground outline-none cursor-text"
                contenteditable="true"
              >
                {card.role}{#if card.company}, {card.company}{/if}
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              class="group"
            >
              Hire {card.firstName}
              <ExternalLink class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}
