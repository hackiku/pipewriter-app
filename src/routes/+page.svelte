<!-- src/routes/+page.svelte -->

<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import EmailForm from '$lib/components/EmailForm.svelte';
	import LoomVideo from '$lib/components/LoomVideo.svelte';
	import LogosMarquee from '$lib/components/LogosMarquee.svelte';
</script>

<div class="flex flex-col min-h-screen">
  <main class="container mx-auto flex-grow flex flex-col justify-between pt-24">
    <section class="flex flex-col items-center space-y-6">
      <div class="hero flex flex-col items-center px-6 gap-4">
        <div class="text-sm font-medium text-muted-foreground">type + prototype</div>

        <h1 class="text-4xl sm:text-4xl md:text-5xl xl:text-5xl font-bold text-center">
          Wireframes for Writers<br class="hidden md:block"> in Google Docs
        </h1>

        <EmailForm />
      </div>

      <div class="w-full max-w-4xl mx-auto">
        <LoomVideo />
      </div>
    </section>

    <div class="w-full mt-auto">
      <LogosMarquee />
    </div>
  </main>

  <footer class="py-4 text-center text-sm text-muted-foreground border-t border-gray-100 dark:border-gray-800">
    <div class="container mx-auto">
      Copyalright © 2024 Ivan & Pipewriter | 
      <a href="/terms" class="hover:underline hover:text-white transition-colors">Terms</a> | 
      <a href="/privacy" class="hover:underline hover:text-white transition-colors">Privacy</a>
    </div>
  </footer>
</div>