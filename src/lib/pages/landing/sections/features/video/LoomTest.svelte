<!-- src/lib/pages/landing/sections/features/video/LoomTest.svelte-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { loomEmbedService } from '$lib/services/loomEmbedService';
  
  let testResult = '';
  let isLoading = false;
  
  onMount(async () => {
    console.log('🧪 Testing Loom service...');
    await loomEmbedService.initialize();
    console.log('Debug info:', loomEmbedService.getDebugInfo());
  });
  
  async function testEmbed() {
    isLoading = true;
    testResult = 'Testing...';
    
    try {
      const html = await loomEmbedService.getVideoHTML('addon', 0);
      testResult = `Success! HTML length: ${html.length} characters`;
      console.log('Generated HTML:', html);
    } catch (error) {
      testResult = `Error: ${error}`;
      console.error('Test failed:', error);
    }
    
    isLoading = false;
  }
</script>

<!-- Only show in development -->
{#if import.meta.env.DEV}
  <div class="fixed top-4 left-4 z-50 p-4 bg-background border border-border rounded-lg shadow-lg max-w-sm">
    <div class="space-y-3">
      <h3 class="font-bold text-primary">🧪 Loom Test</h3>
      
      <button 
        class="px-3 py-2 bg-primary text-primary-foreground rounded text-sm"
        on:click={testEmbed}
        disabled={isLoading}
      >
        {isLoading ? 'Testing...' : 'Test Embed'}
      </button>
      
      {#if testResult}
        <div class="text-xs p-2 bg-muted rounded">
          {testResult}
        </div>
      {/if}
    </div>
  </div>
{/if}