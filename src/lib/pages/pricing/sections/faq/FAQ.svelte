<!-- src/lib/pages/pricing/sections/faq/FAQ.svelte -->
<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion';
  import { faqs } from '../../data/faqs';
  
  let value = "item-0";
</script>

<section class="py-24 border-t border-border/50">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-semibold leading-[1.1] tracking-tight mb-4
                   text-[#171717] dark:text-[#CFCFCF]">
          Questions & Answers
        </h2>
        <p class="text-xl text-muted-foreground">
          Everything you need to know about Pipewriter pricing and features
        </p>
      </div>

      <!-- FAQ Accordion -->
      <Accordion.Root value={value} onValueChange={(v) => value = v} type="single" collapsible>
        {#each faqs as faq, i}
          <Accordion.Item 
            value={`item-${i}`} 
            class="border-b border-border/20 last:border-none"
          >
            <Accordion.Trigger 
              class="flex w-full py-6 text-left group [&[data-state=open]>svg]:rotate-180
                     hover:text-primary transition-colors"
            >
              <span class="text-lg md:text-xl font-medium pr-4">
                {faq.question}
              </span>
            </Accordion.Trigger>
            <Accordion.Content 
              class="pb-6 text-lg text-muted-foreground leading-relaxed"
            >
              {faq.answer}
            </Accordion.Content>
          </Accordion.Item>
        {/each}
      </Accordion.Root>

      <!-- Bottom CTA -->
      <div class="text-center mt-16 p-8 rounded-2xl border bg-muted/20">
        <h3 class="text-xl font-medium mb-2">Still have questions?</h3>
        <p class="text-muted-foreground mb-6">
          We're here to help you get the most out of Pipewriter
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:support@pipewriter.io" 
             class="inline-flex items-center justify-center px-6 py-3 rounded-lg border
                    hover:bg-muted transition-colors">
            Email Support
          </a>
          <a href="https://workspace.google.com/marketplace/app/pipewriter/123456789"
             class="inline-flex items-center justify-center px-6 py-3 rounded-lg
                    bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white
                    hover:shadow-lg transition-all">
            Try Free for 14 Days
          </a>
        </div>
      </div>
      
    </div>
  </div>
</section>