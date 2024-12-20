<!-- lib/pages/demo/sections/VideoSection.svelte -->
<script lang="ts">
  import { Play } from 'lucide-svelte';
  import EditableStyles from '../EditableStyles.svelte';
  import LoomVideo from '$lib/components/marketing/LoomVideo.svelte';
  
  export let placeholder = true;
  export let title: string;
</script>

<div class="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden">
  <!-- {#if placeholder}
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90">
      <div class="flex items-center justify-center h-full group cursor-pointer">
        <div class="p-6 rounded-full bg-primary/90 group-hover:bg-primary transition-colors">
          <Play class="w-8 h-8 text-white" />
        </div>
        
        <EditableStyles elementId="video-title">
          <span 
            class="absolute bottom-6 text-sm text-gray-300 font-medium outline-none"
            contenteditable="true"
          >
            {title}
          </span>
        </EditableStyles>
      </div>
    </div>
  {:else} -->
    <LoomVideo />
  <!-- {/if} -->
</div>