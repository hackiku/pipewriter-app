<!-- $lib/iframe/layout/AppAbout.svelte -->

<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import EmailForm from '$lib/components/EmailForm.svelte';
</script>

<div
  class="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 shadow-lg z-50"
  in:fade={{ duration: 200 }}
  out:fade={{ duration: 200 }}
>
  <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">About This App</h2>
  <p class="text-gray-600 dark:text-gray-300 mb-4">
    This app is designed to enhance your workflow. Explore, learn, and make the most of your experience with us.
  </p>

  <!-- Email Component -->
  <div class="mb-4">
    <EmailForm />
  </div>

  <!-- Embedded Video -->
  <div class="mb-4 aspect-w-16 aspect-h-9">
    <iframe
      class="rounded-md"
      src="https://www.youtube.com/embed/gNY2bkmYpXY"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>

  <!-- More Tutorials Link -->
  <a href="https://example.com/tutorials" class="text-primary hover:underline">
    More tutorials
  </a>
</div>

<style>
  /* Extra Tailwind CSS styling can be added here if needed */
</style>