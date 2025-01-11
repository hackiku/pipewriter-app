<!-- src/lib/pages/space/components/cta/SpaceForm.svelte -->
<script lang="ts">
  import { Globe, Mail, MessageSquare, Copy, Check, Plus, X } from 'lucide-svelte';
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Button } from "$lib/components/ui/button";
  import { spaceFormStore } from '../../stores/spaceFormStore';
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';
  
  export let showHeader = true;
  export let className: string = '';
  
  const copied = writable(false);
  
  // Bind form values to store
  let website = '';
  let email = '';
  let comment = '';
  
  $: spaceFormStore.updateData({ website, email, comment });
  
  // Track store state
  $: isExpanded = $spaceFormStore.isExpanded;
  $: status = $spaceFormStore.status;
  
  function handleSubmit() {
    spaceFormStore.submitForm();
  }

  function copyEmail() {
    navigator.clipboard.writeText('ivan@pipewriter.io').then(() => {
      copied.set(true);
      setTimeout(() => copied.set(false), 2000);
    });
  }
</script>

<div class="space-y-8 {className}">
  {#if showHeader}
    <div class="space-y-4">
      <h3 class="text-2xl font-semibold">Get Your Space Site Repack'd</h3>
      <p class="text-muted-foreground">
        7-day redesign sprint with production-ready code. Perfect for space startups
        that need a proper landing.
      </p>
    </div>
  {/if}

  <form class="space-y-8" on:submit|preventDefault={handleSubmit}>
    <!-- Basic Inputs -->
    <div class="space-y-6">
      <!-- Website Input -->
      <div class="relative">
        <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none opacity-40">
          <Globe class="w-5 h-5" />
        </div>
        <Input 
          type="url" 
          placeholder="Current website URL"
          class="pl-12 h-14 text-lg bg-white/5"
          bind:value={website}
        />
      </div>

      <!-- Email Input -->
      <div class="relative">
        <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none opacity-40">
          <Mail class="w-5 h-5" />
        </div>
        <Input 
          type="email" 
          placeholder="Work email"
          class="pl-12 h-14 text-lg bg-white/5"
          bind:value={email}
        />
      </div>
    </div>

    <!-- Expandable Project Details -->
    <div class="relative">
      <button
        type="button"
        on:click={() => spaceFormStore.toggleExpanded()}
        class="absolute right-4 top-4 z-10 p-2 rounded-full
               hover:bg-white/10 transition-colors"
      >
        {#if isExpanded}
          <X class="w-5 h-5" />
        {:else}
          <Plus class="w-5 h-5" />
        {/if}
        <span class="sr-only">
          {isExpanded ? 'Hide' : 'Show'} project details
        </span>
      </button>

      {#if isExpanded}
        <div transition:slide={{ duration: 200 }}>
          <div class="relative">
            <div class="absolute top-4 left-4 flex items-start pointer-events-none opacity-40">
              <MessageSquare class="w-5 h-5" />
            </div>
            <Textarea
              placeholder="Tell us about your project..."
              class="pl-12 pt-3 min-h-[140px] text-lg bg-white/5"
              bind:value={comment}
            />
          </div>
        </div>
      {/if}
    </div>

    <Button 
      type="submit" 
      class="w-full h-14 text-lg font-medium
             bg-gradient-to-r from-indigo-600 to-purple-600
             hover:from-indigo-500 hover:to-purple-500
             shadow-lg shadow-indigo-500/20 text-white"
      disabled={status === 'submitting'}
    >
      {#if status === 'submitting'}
        Submitting...
      {:else}
        Start Your Repack
      {/if}
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