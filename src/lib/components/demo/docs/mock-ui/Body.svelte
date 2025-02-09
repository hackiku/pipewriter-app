<!-- src/lib/components/demo/docs/mock-ui/Body.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  
  const sampleSections = {
    hero: {
      title: "Write Straight to Product",
      subtitle: "Design in words. Preview in code.",
      cta: "Get Started"
    },
    features: {
      items: [
        "90+ copy-paste UI elements",
        "Pro-grade templates",
        "Dark mode built-in"
      ]
    }
  };
</script>

<div class="max-w-3xl mx-auto py-16 px-12">
  

	<div class="prose prose-zinc dark:prose-invert max-w-none">
    <!-- Initial content -->
    <h1 class="text-4xl font-semibold mb-6 text-zinc-900 dark:text-white">
      Looks like this in Docs 
    </h1>
    
    <p class="text-xl text-zinc-500 dark:text-zinc-400">
      Click "Insert" then choose a layout to begin...
    </p>
    
    <!-- Dynamic sections -->
    <div class="space-y-8 mt-12">
      {#if false} <!-- Placeholder for dynamic content -->
        <div transition:fade>
          <h2>{sampleSections.hero.title}</h2>
          <p>{sampleSections.hero.subtitle}</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  :global(.dark) .prose {
    --tw-prose-body: theme(colors.zinc.300);
    --tw-prose-headings: theme(colors.white);
    --tw-prose-links: theme(colors.blue.400);
  }
</style>