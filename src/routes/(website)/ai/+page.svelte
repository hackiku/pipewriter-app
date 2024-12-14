<!-- src/routes/ai/+page.svelte -->
<script lang="ts">
  import EarlyButton from "$lib/components/EarlyButton.svelte";
  import GumroadSection from "$lib/pages/ai/GumroadSection.svelte";
  import { ExternalLink, ArrowRight, Download, Sparkles } from "lucide-svelte";

  const downloadHtml = async () => {
    try {
      const response = await fetch('/samples/horse-tinder/index.html');
      const htmlContent = await response.text();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'landing-page.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading HTML:', error);
    }
  };
</script>

<main class="bg-background text-foreground">
  <section class="relative min-h-[50vh] flex items-center border-b">
    <div class="container relative z-10 pt-20">
      <div class="max-w-3xl mx-auto text-center my-12">
        <!-- New Feature Banner -->
        <div class="inline-flex items-center gap-1.5 px-3 py-1 mb-8 rounded-full bg-primary/10 text-primary border border-primary/20">
          <Sparkles class="w-4 h-4" />
          <span class="text-sm font-medium">New AI Feature</span>
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6">
          Google Docs Wire <br>to Live Website
        </h1>
        <p class="text-2xl text-muted-foreground mb-8">
          With 2× <kbd class="inline-flex items-center px-2 py-1.5 -mb-1 text-sm font-semibold text-muted-foreground bg-muted rounded border shadow-sm">click</kbd> and 2× <kbd class="inline-flex items-center px-2 py-1.5 -mb-1 text-sm font-semibold text-muted-foreground bg-muted rounded border shadow-sm">Ctrl</kbd> + <kbd class="inline-flex items-center px-2 py-1.5 -mb-1 text-sm font-semibold text-muted-foreground bg-muted rounded border shadow-sm">C</kbd>
        </p>
        <EarlyButton />
      </div>
    </div>
  </section>

  <!-- Video Demo -->
  <section class="container py-12">
    <div class="max-w-4xl mx-auto">
      <div style="position: relative; padding-bottom: 64.5933014354067%; height: 0;">
        <iframe src="https://www.loom.com/embed/2dd12f155c834c83bdaa3f9e2cb1e011?sid=27a9d946-8ef8-41d5-bd43-d97ce69aeec9" 
                frameborder="0" 
                webkitallowfullscreen 
                mozallowfullscreen 
                allowfullscreen 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
        </iframe>
      </div>
    </div>
  </section>

  <!-- Live Demo -->
  <section class="container py-12 border-t">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold mb-6">Live Demo</h2>
      <div class="mb-6 rounded-lg border overflow-hidden">
        <iframe 
          src="/samples/horse-tinder/index.html"
          class="w-full h-[600px] border-0"
          title="Generated Landing Page Demo"
        ></iframe>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex gap-3">
          <button 
            class="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground"
            on:click={downloadHtml}
          >
            <Download class="w-4 h-4 mr-2" />
            Download HTML
          </button>
          <a 
            href="/samples/horse-tinder/index.html"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-11 items-center justify-center rounded-md border bg-background px-8 text-base font-medium"
          >
            <ExternalLink class="w-4 h-4 mr-2" />
            View Full Page
          </a>
        </div>
        <a 
          href="/early" 
          class="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground"
        >
          Start Pipewriting
          <ArrowRight class="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <GumroadSection />
</main>

<style>
  kbd {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }
</style>