<!-- lib/pages/pricing/content/faq/FAQ.svelte -->
<script lang="ts">
  import FAQItem from './FAQItem.svelte';
  import { faqs } from '../../data/faqs';
</script>

<section class="py-24 container mx-auto px-4">
  <div class="max-w-3xl mx-auto space-y-8">
    {#each faqs as faq}
      <FAQItem {faq} />
    {/each}
  </div>
</section>