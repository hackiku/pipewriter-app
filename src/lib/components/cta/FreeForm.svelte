<!-- $lib/components/free/FreeForm.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { RotateCcw } from "lucide-svelte";
  import { demoStore, formattedContent } from '$lib/stores/demoStore';
  import TextEditor from './TextEditor.svelte';
  import EmailForm from '../cta/EmailForm.svelte';

  export let showReset = false;
</script>

<div class="h-full flex items-center justify-center">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">Your Content</h3>
      <TextEditor 
        value={$formattedContent}
        readonly={true}
      />
    </div>

    <div class="flex flex-col justify-center max-w-md mx-auto w-full gap-6">
      <div class="space-y-2">
        <h2 class="text-2xl font-bold">Get Your Free Template</h2>
        <p class="text-muted-foreground">
          We'll send you a Google Docs template with your content.
        </p>
      </div>

      <EmailForm
        buttonText="Send My Template"
        wrap={true}
      />
      
      {#if showReset}
        <Button 
          variant="ghost" 
          size="sm"
          on:click={() => demoStore.reset()}
          class="w-full"
        >
          <RotateCcw class="w-4 h-4 mr-2" />
          Reset Content
        </Button>
      {/if}

      <p class="text-sm text-muted-foreground">
        By submitting, you agree to receive updates. Unsubscribe anytime.
      </p>
    </div>
  </div>
</div>