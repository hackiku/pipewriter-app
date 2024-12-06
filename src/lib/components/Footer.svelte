<!-- $lib/components/Footer.svelte -->
<script lang="ts">
  import EmailForm from '$lib/components/EmailForm.svelte';
  const year = new Date().getFullYear();
</script>

<footer class="w-full bg-slate-100 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-800">
  <div class="container px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <!-- About -->
      <div class="lg:col-span-5 space-y-4">
        <div class="flex items-center gap-1">
          <div>✍️</div>
          <h3 class="text-base font-semibold">Pipewriter</h3>
        </div>
        <p class="text-muted-foreground text-sm max-w-xs">
          Professional website copy decks in Google Docs. Design-ready templates + sidebar app.
        </p>
      </div>

      <!-- Links -->
      <div class="lg:col-span-3">
        <h4 class="font-medium text-sm mb-4">Links</h4>
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
      <div class="lg:col-span-4">
        <h4 class="font-medium text-sm mb-4">UX-up Your Inbox</h4>
        <div class="text-sm text-muted-foreground mb-4">
          Get notified about new features and updates.
        </div>
        <EmailForm size="sm" />
      </div>
    </div>

    <!-- Copyright -->
    <div class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
      <div class="text-sm text-muted-foreground">
        Copyright © {year} Ivan @ Pipewriter
      </div>
    </div>
  </div>
</footer>