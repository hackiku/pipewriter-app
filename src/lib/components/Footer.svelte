<!-- $lib/layout/Footer.svelte -->
<script lang="ts">
  import FeedbackForm from '$lib/components/EmailForm.svelte';
  import LogosMarquee from '$lib/components/LogosMarquee.svelte';

  const year = new Date().getFullYear();
</script>

<footer class="w-full bg-slate-100 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-800">
  <LogosMarquee />
  
  <div class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      <!-- About -->
      <div class="lg:col-span-2">
        <div class="flex items-center gap-1 mb-4">
          <div>✍️</div>
          <h3 class="text-lg font-semibold">Pipewriter</h3>
        </div>
        <p class="text-muted-foreground mb-4 max-w-md">
          Professional website copy decks in Google Docs. Design-ready templates + sidebar app 
          that makes your copy decks look stunning — while helping you think in UX terms.
        </p>
        <div class="text-sm text-muted-foreground/60">
          © {year} Ivan & Pipewriter. All rights reserved.
        </div>
      </div>

      <!-- Links -->
      <div class="space-y-4">
        <h4 class="font-medium">Links</h4>
        <nav class="flex flex-col space-y-2">
          <a href="/early" class="text-muted-foreground hover:text-foreground transition-colors">
            Early Access
          </a>
          <button 
            class="text-left text-muted-foreground hover:text-foreground transition-colors"
            on:click={() => window.dispatchEvent(new CustomEvent('open-contact'))}
          >
            Contact
          </button>
          <a href="/privacy" class="text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="/terms" class="text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </a>
        </nav>
      </div>

      <!-- Updates -->
      <div class="space-y-4">
        <h4 class="font-medium">Stay Updated</h4>
        <div class="text-sm text-muted-foreground mb-4">
          Get notified about new features and updates.
        </div>
        <FeedbackForm />
      </div>
    </div>
  </div>
</footer>