<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import EmailForm from '$lib/components/EmailForm.svelte';
  import LoomVideo from '$lib/components/LoomVideo.svelte';
  import LogosMarquee from '$lib/components/LogosMarquee.svelte';
  import BackgroundPattern from '$lib/components/BackgroundPattern.svelte';
</script>

<BackgroundPattern />

<div class="flex flex-col min-h-screen bg-slate-300 dark:bg-slate-950 bg-opacity-20">
  <main class="container mx-auto flex-grow flex flex-col justify-center items-center px-4 py-16">
    <div class="max-w-4xl w-full space-y-12">
      
			<section class="flex flex-col items-center text-center space-y-6">
        <div class="space-y-4">
          <!-- <div class="text-sm font-medium text-muted-foreground">type + prototype</div> -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold">
            Wireframes for Writers <br class="hsidden sm:inline"> in Google Docs
          </h1>
        </div>
        <EmailForm />
      </section>

      <!-- <section class="w-full">
        <LoomVideo />
      </section> -->
    </div>
  </main>

  <footer class="w-full">
    <LogosMarquee />
    <div class="py-4 text-center text-sm text-muted-foreground border-t border-gray-100 dark:border-gray-800">
      <div class="container mx-auto">
        Copyalright © 2024 Ivan & Pipewriter | 
        <a href="/terms" class="hover:underline hover:text-white transition-colors">Terms</a> | 
        <a href="/privacy" class="hover:underline hover:text-white transition-colors">Privacy</a>
      </div>
    </div>
  </footer>
</div>