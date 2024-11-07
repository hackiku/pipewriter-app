<!-- $lib/iframe/layout/AppAbout.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { X } from 'lucide-svelte';
  import { showAboutModal } from '../stores/aboutStore';
  import EmailCapture from '../components/EmailCapture.svelte';

  function closeModal() {
    showAboutModal.set(false);
  }
</script>

<div
  class="fixed bottom-12 left-2 right-2 rounded-xl border border-gray-300 
         dark:border-gray-600 bg-white dark:bg-slate-900 z-30"
  in:fade={{ duration: 200 }}
  out:fade={{ duration: 200 }}
>
  <!-- Close button -->
  <button 
    on:click={closeModal}
    class="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 
           dark:hover:bg-gray-700 transition-colors"
  >
    <X class="w-4 h-4 text-gray-500 dark:text-gray-400" />
  </button>

  <div class="p-6">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
      About Pipewriter
    </h2>
    
    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
      This app is designed to enhance your workflow. Explore, learn, and make the most of your experience with us.
    </p>

    <!-- Email Component -->
    <div class="mb-4">
      <EmailCapture />
    </div>

    <!-- Video Container -->
    <div class="w-full aspect-video mb-4">
      <iframe
        class="w-full h-full rounded-md"
        src="https://www.youtube.com/embed/gNY2bkmYpXY"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <a href="https://example.com/tutorials" class="text-primary hover:underline text-sm">
      More tutorials
    </a>
  </div>
</div>