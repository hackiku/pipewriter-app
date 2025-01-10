<!-- src/lib/pages/space/cta/SpaceForm.svelte -->

<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Button } from "$lib/components/ui/button";
  import { Copy, Check } from 'lucide-svelte';
  import { writable } from 'svelte/store';
  
  export let website = '';
  export let email = '';
  export let comment = '';
  
  const copied = writable(false);
  
  function handleSubmit() {
    console.log({ website, email, comment });
    // Implementation coming soon
  }

  function copyEmail() {
    navigator.clipboard.writeText('ivan@pipewriter.io').then(() => {
      copied.set(true);
      setTimeout(() => copied.set(false), 2000);
    });
  }
</script>

<div class="space-y-8">
  <div class="space-y-4">
    <h3 class="text-2xl font-semibold">Get Your Space Site Repack'd</h3>
    <p class="text-muted-foreground">
      7-day redesign sprint with production-ready code. Perfect for space startups
      that need a proper landing.
    </p>
  </div>

  <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
    <div class="space-y-2">
      <label for="website" class="text-sm font-medium">
        Current Website
      </label>
      <Input 
        id="website"
        type="url" 
        placeholder="https://your-space-startup.com"
        bind:value={website}
      />
    </div>

    <div class="space-y-2">
      <label for="email" class="text-sm font-medium">
        Work Email
      </label>
      <Input 
        id="email"
        type="email" 
        placeholder="you@company.com"
        bind:value={email}
      />
    </div>

    <div class="space-y-2">
      <label for="comment" class="text-sm font-medium">
        Tell us about your project
      </label>
      <Textarea
        id="comment"
        placeholder="What's your ideal timeline? Any specific features or requirements?"
        class="min-h-[120px]"
        bind:value={comment}
      />
    </div>

    <Button type="submit" class="w-full">
      Submit Request
    </Button>
  </form>

  <div class="pt-6 border-t">
    <p class="text-sm text-muted-foreground mb-2">
      Rather chat first? Drop us a line:
    </p>
    <div class="flex items-center gap-2">
      <a 
        href="mailto:ivan@pipewriter.io"
        class="text-lg font-medium hover:text-primary transition-colors"
      >
        ivan@pipewriter.io
      </a>
      <button
        on:click={copyEmail}
        class="p-1.5 hover:bg-muted rounded-md transition-colors"
        aria-label="Copy email address"
      >
        {#if $copied}
          <Check class="w-4 h-4 text-green-500" />
        {:else}
          <Copy class="w-4 h-4" />
        {/if}
      </button>
      {#if $copied}
        <span class="text-sm text-green-500">Copied!</span>
      {/if}
    </div>
  </div>
</div>