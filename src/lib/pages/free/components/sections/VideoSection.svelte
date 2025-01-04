<!-- src/lib/pages/free/components/sections/VideoSection.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Play } from 'lucide-svelte';
  import { Editable, Styles } from '../editor';
  import { contentStore, getFieldValue } from '../../stores/contentStore';
  
  export let visible = false;
  export let id = 'video-section';

  // Get values reactively with fallbacks
  $: titleText = getFieldValue($contentStore.content, ['video', 'title']) || 'Watch the 2-minute demo';
  $: placeholder = true; // We can make this dynamic later if needed
</script>

{#if visible}
  <div 
    class="container mx-auto px-4 md:px-8"
    in:fade={{ duration: 300 }}
  >
    <div class="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden">
      {#if placeholder}
        <div class="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90">
          <div class="flex items-center justify-center h-full group cursor-pointer">
            <div class="p-6 rounded-full bg-primary/90 group-hover:bg-primary transition-colors">
              <Play class="w-8 h-8 text-white" />
            </div>
            
            <Styles sectionId="video-title">
              <span class="absolute bottom-6">
                <Editable
                  path={['video', 'title']}
                  value={titleText}
                  className="text-sm text-gray-300 font-medium outline-none"
                />
              </span>
            </Styles>
          </div>
        </div>
      {:else}
        <!-- Add your video component here -->
        <div class="w-full h-full bg-muted">Video placeholder</div>
      {/if}
    </div>
  </div>
{/if}