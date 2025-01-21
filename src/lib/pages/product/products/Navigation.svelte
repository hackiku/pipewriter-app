<!-- src/lib/pages/product/products/Navigation.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { FileText, Layout, Sparkles } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import { productStore } from '../stores/productStore';

  const products = [
    { id: 'google-docs', icon: FileText, label: 'Google Docs' },
    { id: 'webapp', icon: Layout, label: 'Web App' },
    { id: 'ai', icon: Sparkles, label: 'AI Tools' }
  ];

  function scrollToProduct(id: string) {
    const element = document.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      productStore.setActive(id);
    }
  }
</script>

<div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
  <div class="relative">
    <!-- Navigation Container -->
    <nav 
      class="flex items-center gap-2 p-2 rounded-full bg-background/80 
             backdrop-blur-md border shadow-lg"
      in:fade={{ duration: 200 }}
    >
      {#each products as { id, icon: Icon, label }}
        <Button
          variant={$productStore.activeProduct === id ? "default" : "ghost"}
          size="icon"
          class="rounded-full w-12 h-12"
          on:click={() => scrollToProduct(id)}
        >
          <Icon class="w-5 h-5" />
          <span class="sr-only">{label}</span>
        </Button>
      {/each}
    </nav>

    <!-- Gradient Overlays -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute left-0 top-0 bottom-0 w-16 
                  bg-gradient-to-r from-background to-transparent" />
      <div class="absolute right-0 top-0 bottom-0 w-16 
                  bg-gradient-to-l from-background to-transparent" />
    </div>
  </div>
</div>