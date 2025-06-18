<!-- src/routes/(website)/+layout.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
	import { dev } from '$app/environment';
  import "../../app.css";
  import BackgroundPattern from '$lib/components/BackgroundPattern.svelte';
	// import Nav from "$lib/components/nav/Nav.svelte";
	import Nav from "$lib/components/navigation/Nav.svelte";
  import Footer from "$lib/components/navigation/Footer.svelte";
  import SEO from "$lib/components/SEO.svelte";
	import BuyDrawer from "$lib/components/cta/buy/BuyDrawer.svelte";
  // import ContactModal from "$lib/components/cta/contact/ContactModal.svelte";

  import { ModeWatcher } from "mode-watcher";
  import { buyStore } from '$lib/stores/buyStore';

	import { contactModalStore } from '$lib/stores/contactModalStore';
  
	import { onMount } from 'svelte';

	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	injectAnalytics({ mode: dev ? 'development' : 'production' });

  let isIframe = false;
  
  onMount(() => {
    isIframe = window?.location?.pathname?.startsWith('/iframe') || false;
  });

  const overrideNav = getContext('override-nav') || false;
</script>

<SEO />

<!-- Global Buy Drawer -->
<BuyDrawer>
  <div slot="trigger" />
</BuyDrawer>

<ModeWatcher defaultMode={"dark"}/>

{#if !isIframe && !overrideNav}
  <Nav />
{/if}

<div class="flex min-h-screen flex-col relative">
  <!-- Background Pattern - Fixed position for main content area -->
  
	{#if !isIframe && !overrideNav}
		<div class="fixed inset-0 pointer-events-none">
    		<!-- <BackgroundPattern size="lg" opacity="high" gradient={true} /> -->
    		<!-- <BackgroundPattern /> -->
  	</div>
	{/if}

  <!-- Main content with transparent background -->
  <main class="flex-grow relative">
    <slot />
  </main>

  <!-- Footer with solid background to cover pattern -->
  {#if !isIframe}
    <div class="relative">
      <Footer />
    </div>
  {/if}
</div>

{#if $contactModalStore}
  <!-- <ContactModal on:close={() => $contactModalStore = false} /> -->
{/if}
