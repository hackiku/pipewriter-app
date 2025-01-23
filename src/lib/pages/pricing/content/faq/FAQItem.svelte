<!-- content/faq/FAQItem.svelte -->
<script lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "$lib/components/ui/accordion";
  import type { FAQ } from "../../data/faqs";
  
  export let faq: FAQ;
  export let value: string;
</script>

<Accordion type="single" collapsible>
  <AccordionItem {value}>
    <AccordionTrigger class="text-left text-lg font-medium">
      {faq.question}
    </AccordionTrigger>
    <AccordionContent>
      <p class="text-zinc-400 leading-relaxed">
        {faq.answer}
      </p>
    </AccordionContent>
  </AccordionItem>
</Accordion>