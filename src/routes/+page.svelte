<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import { Button } from "$lib/components/ui/button";
	import EmailForm from '$lib/components/EmailForm.svelte';
	import LoomVideo from '$lib/components/LoomVideo.svelte';
	import Logos from '$lib/components/Logos.svelte';
</script>

<Nav />

<main class="container mx-auto px-4 pt-24 space-y-20 md:space-y-28">
  <section class="flex flex-col items-center space-y-6">
    <div class="hero flex flex-col items-center mt-24 lg:mt-40 px-6 gap-4">
      <div class="text-sm font-medium text-muted-foreground">type + prototype</div>

      <h1 class="text-4xl md:text-5xl font-bold text-center">Wireframes for Writers<br class="hidden md:block">in Google Docs</h1>

      <EmailForm />

      <!-- <Button variant="default" class="bg-gradient-to-r from-[#3644FE] to-[#B345ED]">
        Start Writing
      </Button> -->
    </div>

    <LoomVideo />
    <div class="-translate-y-3/4 lg:-translate-y-5/6">
      <Logos />
    </div>
  </section>
</main>

<footer class="py-6 text-center text-sm text-muted-foreground">
  Copyalright © 2024 Ivan & Pipewriter | <a href="/terms" class="hover:underline">Terms</a> | <a href="/privacy" class="hover:underline">Privacy</a>
</footer>