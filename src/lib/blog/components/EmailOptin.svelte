<!-- lib/blog/components/EmailOptin.svelte -->
<script lang="ts">
  import EmailForm from "$lib/components/cta/EmailForm.svelte";
</script>

<div class="not-prose bg-muted/50 rounded-xl p-8 my-16 border border-border/50">
  <div class="text-center mb-8">
    <h2 class="text-2xl font-bold mb-2">Want to see more?</h2>
    <p class="text-muted-foreground">
      Get the latest updates on writing-first development.
    </p>
  </div>
  <EmailForm size="sm" className="max-w-xl mx-auto" />
</div>