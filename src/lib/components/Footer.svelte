<!-- $lib/layout/Footer.svelte -->
<script lang="ts">
  import EmailForm from '$lib/components/EmailForm.svelte';

  const year = new Date().getFullYear();
</script>

<footer class="w-full bg-slate-100 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-800">
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
      <!-- About -->
      <div class="md:col-span-3">
        <div class="flex items-center gap-1 mb-3">
          <div>✍️</div>
          <h3 class="text-base font-semibold">Pipewriter</h3>
        </div>
        <p class="text-muted-foreground mb-4 text-sm max-w-xs">
          Professional website copy decks in Google Docs. Design-ready templates + sidebar app.
        </p>
        <div class="text-xs text-muted-foreground/60">
          © {year} Ivan & Pipewriter
        </div>
      </div>

      <!-- Links -->
      <div class="space-y-3 md:col-span-2">
        <h4 class="font-medium text-sm">Links</h4>
        <nav class="flex flex-col space-y-2 text-sm">
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
      <div class="space-y-3 md:col-span-7">
        <h4 class="font-medium text-sm">UX-up Your Inbox</h4>
        <div class="text-sm text-muted-foreground">
          Get notified about new features and updates.
        </div>
        <EmailForm />
      </div>
    </div>
  </div>
</footer>
