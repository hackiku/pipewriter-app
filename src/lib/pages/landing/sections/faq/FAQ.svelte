<!-- src/lib/pages/landing/sections/faq/FAQ.svelte -->
<script lang="ts">
  import { faqs } from '../../data/faqs';
  import * as Accordion from '$lib/components/ui/accordion';

  let value = "item-0";
</script>

<div class="max-w-4xl mx-auto">
  <div class="text-center mb-16">
    <h2 class="text-4xl font-semibold leading-[1.1] tracking-tight">
      Questions & Answers
    </h2>
  </div>

  <Accordion.Root value={value} onValueChange={(v) => value = v} type="single" collapsible>
    {#each faqs as faq, i}
      <Accordion.Item 
        value={`item-${i}`} 
        class="border-b border-primary/10 last:border-none
               data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#3644FE]/10 data-[state=open]:to-[#B345ED]/10 
               rounded-2xl transition-all duration-300"
      >
        <Accordion.Trigger 
          class="flex w-full py-8 px-8 text-left group [&[data-state=open]>svg]:rotate-180"
          data-state-chevron-size="24"
        >
          <span class="text-xl md:text-2xl font-medium 
                     group-hover:text-primary transition-colors">
            {faq.question}
          </span>
        </Accordion.Trigger>
        <Accordion.Content 
          class="px-8 pb-8 text-lg text-foreground/60
                 prose prose-gray dark:prose-invert max-w-none"
        >
          {@html faq.answer}
        </Accordion.Content>
      </Accordion.Item>
    {/each}
  </Accordion.Root>
</div>