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
</script>

<AccordionItem value={faq.question}>
  <AccordionTrigger class="text-left">
    {faq.question}
  </AccordionTrigger>
  <AccordionContent>
    <p class="text-zinc-400">{faq.answer}</p>
  </AccordionContent>
</AccordionItem>