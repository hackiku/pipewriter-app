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

<!-- Container for border line -->
<div class="relative z-50">
  <!-- Top border line -->
  <div class="border-t border-gray-200 dark:border-gray-700" />

  <!-- Modal content -->
  {#if $showAboutModal}
    <div
      class="absolute bottom-0 -right-2 bg-white dark:bg-slate-900
             border border-gray-200 dark:border-gray-700 rounded-xl"
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
    >
      <button 
        on:click={closeModal}
        class="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <X class="h-4 w-4 text-gray-500" />
      </button>

      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">About Pipewriter</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
          This app is designed to enhance your workflow. Explore, learn, and make the most of your experience with us.
        </p>

        <div class="mb-4">
          <EmailCapture />
        </div>

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
  {/if}
</div>