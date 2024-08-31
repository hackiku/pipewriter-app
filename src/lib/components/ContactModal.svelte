<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { fade } from 'svelte/transition';
import { X, Copy, Check } from 'lucide-svelte';
import { writable } from 'svelte/store';

const dispatch = createEventDispatcher();
const copied = writable(false);

function close() {
  dispatch('close');
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close();
  }
}

function copyEmail() {
  navigator.clipboard.writeText('ivan@pipewriter.io').then(() => {
    copied.set(true);
    setTimeout(() => copied.set(false), 2000);
  });
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
        <p class="text-xl">Or say "You're Hired" if you need UX-sizzly web copy, design and dev.</p>
        
				<div class="font-semibold text-3xl flex items-center justify-center">
          <a 
            href="mailto:ivan@pipewriter.io"
            class="bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED] hover:from-[#3644FE] hover:to-[#B345ED] transition-all"
          >
            ivan@pipewriter.io
          </a>
          <button 
            on:click={copyEmail}
            class="ml-2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
            aria-label="Copy email"
          >
            {#if $copied}
              <Check size={24} class="ml-1 mt-1 text-green-500" />
            {:else}
              <Copy size={18} class="ml-1 mt-1" />
            {/if}
          </button>
					{#if $copied}
						<p class="ml-2 text-sm text-green-500 transition-opacity" transition:fade={{duration: 200}}>Copied!</p>
					{/if}
        </div>
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