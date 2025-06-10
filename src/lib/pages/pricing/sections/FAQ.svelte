<!-- src/lib/pages/pricing/sections/FAQ.svelte -->
<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion';
  import { Mail, Zap } from 'lucide-svelte';
  import { faqs } from '../data/faqs';
  
  let value = "item-0";
</script>

<div class="container mx-auto">
  <div class="max-w-4xl mx-auto">
    
    <!-- FAQ Accordion -->
    <Accordion.Root bind:value type="single" collapsible class="space-y-4">
      {#each faqs as faq, i}
        <Accordion.Item 
          value={`item-${i}`} 
          class="group rounded-2xl border border-border/20 bg-gradient-to-r from-background to-muted/20
                 hover:from-primary/5 hover:to-primary/10 hover:border-primary/20 hover:shadow-lg
                 transition-all duration-300 overflow-hidden"
        >
          <Accordion.Trigger
            class="flex w-full items-center justify-between p-6 text-left
                   hover:no-underline [&[data-state=open]>svg]:rotate-180
                   transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10"
          >
            <span class="text-lg md:text-xl font-semibold text-foreground leading-relaxed pr-4">
              {faq.question}
            </span>
          </Accordion.Trigger>
          <Accordion.Content 
            class="px-6 pb-6 pt-0 text-lg text-muted-foreground leading-relaxed
                   border-t border-border/10 bg-muted/20"
          >
            <div class="pt-4">
              {faq.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>

    <!-- Bottom CTA -->
    
  </div>
</div>

<style>
  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgb(209 213 219 / 0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgb(209 213 219 / 0.1) 1px, transparent 1px);
    background-size: 4rem 4rem;
  }
</style>