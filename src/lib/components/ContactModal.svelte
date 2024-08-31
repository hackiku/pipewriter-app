<!-- $lib/components/ContactModal.svelte -->

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { fade } from 'svelte/transition';
import { X } from 'lucide-svelte';

const dispatch = createEventDispatcher();

function close() {
  dispatch('close');
}

function handleOutsideClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    close();
  }
}
</script>

<div 
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  on:click={handleOutsideClick}
  transition:fade
>
  <div class="bg-background p-6 rounded-lg shadow-xl max-w-md w-full">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-2xl font-bold">Contact Us</h3>
      <button on:click={close} class="text-gray-500 hover:text-gray-700">
        <X size={24} />
      </button>
    </div>
    <p class="mb-4">Get in touch with us for any questions or support:</p>
    <p class="font-semibold text-xl mb-4">
      <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#3644FE] to-[#B345ED] hover:text-white hover:underline transition-all">
        ivan@pipewriter.io
      </span>
    </p>
    <p>We'll get back to you as soon as possible!</p>
  </div>
</div>