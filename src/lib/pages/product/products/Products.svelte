<!-- src/lib/pages/product/products/Products.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { productStore } from '../stores/productStore';
  import GoogleDocsProduct from './google-docs/GoogleDocsProduct.svelte';
  import WebappProduct from './webapp/WebappProduct.svelte';
  import AIProduct from './ai/AIProduct.svelte';

  // Handle intersection observer for active section
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          productStore.setActive(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  });
</script>

<div class="space-y-32">
  <section id="google-docs" class="min-h-screen">
    <GoogleDocsProduct />
  </section>

  <section id="webapp" class="min-h-screen">
    <WebappProduct />
  </section>

  <section id="ai" class="min-h-screen">
    <AIProduct />
  </section>
</div>