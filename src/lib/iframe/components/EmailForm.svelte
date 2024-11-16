<!-- $lib/iframe/components/EmailForm.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Mail } from "lucide-svelte";

  const writerEmails = [
    'mark@twain.me',
    'ernest@hemingway.gg',
    'jane@austen.io',
    'dante@alighieri.dev',
    'oscar@wilde.me',
    'emily@bronte.co',
    'edgar@poe.xyz'
  ];

  let email = '';
  let isSubmitting = false;
  let placeholder: string;

  // Set random placeholder on mount
  placeholder = writerEmails[Math.floor(Math.random() * writerEmails.length)];

async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    isSubmitting = true;
    
    try {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email,
                source: 'Docs App'
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Subscription failed');
        }

        email = ''; // Clear form

    } catch (error) {
        console.error('Subscription error:', error);
    } finally {
        isSubmitting = false;
    }
	}
</script>

<form on:submit={handleSubmit} class="space-y-2">
  <Input
    type="email"
    {placeholder}
    bind:value={email}
    class="w-full"
  />
  <Button 
    type="submit" 
    disabled={!email || isSubmitting}
    class="w-full"
  >
    {#if isSubmitting}
      <span class="flex items-center">
        <span class="animate-spin mr-2">⟳</span>
        Subscribing...
      </span>
    {:else}
      <span class="flex items-center">
        <Mail class="w-4 h-4 mr-2" />
        Get Updates
      </span>
    {/if}
  </Button>
</form>