<!-- lib/blog/components/EmailOptin.svelte -->
<script lang="ts">
  import EmailForm from "$lib/components/cta/email/EmailForm.svelte";
</script>

<div class="not-prose bg-muted/50 rounded-xl py-12 p-12 mb-16 border border-border/50">
  <div class="text-center mb-8">
    <h2 class="text-3xl md:text-4xl font-normal">
      <span class="inline-flex items-center gap-3">
        Stay tuned to the news
      </span>
    </h2>
  </div>
  
  <EmailForm 
    buttonText="Subscribe"
    size="sm" 
    className="max-w-md mx-auto" 
    wrap={false}
  />
</div>