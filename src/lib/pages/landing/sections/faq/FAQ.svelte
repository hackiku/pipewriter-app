<!-- src/lib/pages/landing/sections/faq/FAQ.svelte -->
<script lang="ts">
  import { faqs } from '../../data/faqs';
  import * as Accordion from '$lib/components/ui/accordion';
  // import { ChevronDown } from 'lucide-svelte';

  let value = "item-0";
</script>

<div class="max-w-4xl mx-auto">
  <Accordion.Root value={value} onValueChange={(v) => value = v} type="single" collapsible>
    {#each faqs as faq, i}
      <Accordion.Item 
        value={`item-${i}`} 
        class="mb-4 overflow-hidden bg-white dark:bg-neutral-950 border-[1.5px] border-border 
               rounded-2xl transition-all duration-300 
                data-[state=open]:bg-gradient-to-r 
               data-[state=open]:from-[#3644FE]/5 data-[state=open]:to-[#B345ED]/5"
      >
        <Accordion.Trigger 
          class="flex w-full p-6 px-8 text-left group justify-between items-center hover:bg-muted/30"
        >
          <span class="text-xl md:text-2xl font-medium group-hover:text-primary transition-colors">
            {faq.question}
          </span>
        </Accordion.Trigger>
        <Accordion.Content 
          class="px-8 pb-4 text-lg text-foreground/70 
                 prose prose-gray dark:prose-invert max-w-none pt-2"
        >
          {@html faq.answer}
        </Accordion.Content>
      </Accordion.Item>
    {/each}
  </Accordion.Root>
</div>