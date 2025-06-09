<!-- routes/(website)privacy/+page.svelte -->

<!-- routes/privacy/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  
  // Import the markdown content (you'll need to set up mdsvex for this)
  import PrivacyContent from './privacy-policy.md';
  
  // SEO metadata
  const title = 'Privacy Policy - Pipewriter';
  const description = 'Learn how Pipewriter collects, uses, and protects your data when using our Google Docs add-on.';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="{$page.url.origin}/privacy" />
  <meta name="robots" content="index, follow" />
</svelte:head>

<main class="container mx-auto max-w-4xl px-6 sm:px-8 py-16 mt-16">
  <!-- Simple, clean layout matching your blog style -->
  <article class="prose prose-zinc dark:prose-invert prose-lg max-w-none">
    <svelte:component this={PrivacyContent} />
  </article>
  
  <!-- Contact CTA -->
  <footer class="mt-16 p-6 bg-muted/50 rounded-lg border">
    <div class="text-center space-y-4">
      <h3 class="text-lg font-medium">Questions about our Privacy Policy?</h3>
      <p class="text-muted-foreground">
        We're here to help. Contact us at 
        <a href="mailto:hello@pipewriter.io" class="text-primary hover:underline">
          hello@pipewriter.io
        </a>
      </p>
    </div>
  </footer>
</main>

<style>
  /* Ensure proper spacing and readability */
  :global(.prose h1) {
    @apply text-4xl font-bold mb-8 mt-0;
  }
  
  :global(.prose h2) {
    @apply text-2xl font-semibold mt-12 mb-6;
  }
  
  :global(.prose h3) {
    @apply text-xl font-medium mt-8 mb-4;
  }
  
  :global(.prose h4) {
    @apply text-lg font-medium mt-6 mb-3;
  }
  
  :global(.prose p) {
    @apply mb-4 leading-relaxed;
  }
  
  :global(.prose ul) {
    @apply mb-6;
  }
  
  :global(.prose li) {
    @apply mb-2;
  }
  
  :global(.prose strong) {
    @apply font-semibold;
  }
  
  :global(.prose a) {
    @apply text-primary hover:underline;
  }
  
  /* Last updated styling */
  :global(.prose p:first-of-type em) {
    @apply text-sm text-muted-foreground block mb-8 not-italic;
  }
</style>