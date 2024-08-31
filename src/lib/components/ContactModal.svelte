<!-- $lib/components/ContactModal.svelte -->
<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { fade } from 'svelte/transition';
import { X } from 'lucide-svelte';

const dispatch = createEventDispatcher();

function close() {
  dispatch('close');
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close();
  }
}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
  class="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50"
  on:click|self={close}
  transition:fade
>
  <div 
    class="bg-background p-12 rounded-lg shadow-xl max-w-3xl w-full relative"
    role="dialog"
    aria-labelledby="modal-title"
  >
    <button 
      on:click={close} 
      class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
      aria-label="Close modal"
    >
      <X size={24} />
    </button>
    
    <div class="flex flex-col items-center space-y-6">
      <div class="text-center space-y-6 max-w-md">
        <h3 id="modal-title" class="text-4xl font-bold">Say Hi 👋</h3>
        <p class="text-xl">Or, even better, say "You're Hired" if you need UX-sizzly web copy, design and dev.</p>
        <p class="font-semibold text-3xl">
          <a 
            href="mailto:ivan@pipewriter.io"
            class="bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED] hover:text-white hover:underline transition-all"
          >
            ivan@pipewriter.io
          </a>
        </p>
      </div>
      <div class="w-full max-w-[12em] aspect-[350/480] rounded-lg overflow-hidden pointer-events-none">
        <iframe 
          src="https://giphy.com/embed/yFgSFDgjLveZL3mFNe" 
          width="100%" 
          height="100%" 
          class="giphy-embed" 
          title="Decorative GIF"
          aria-hidden="true"
        ></iframe>
      </div>
    </div>
  </div>
</div>