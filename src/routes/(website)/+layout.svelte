<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { dev } from '$app/environment';
  import "../../app.css";
  import Nav from "$lib/components/Nav.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import EarlyAccess from "$lib/components/cta/EarlyAccess.svelte";
  import EarlyAccessDrawer from "$lib/components/cta/EarlyAccessDrawer.svelte";
  import ContactModal from "$lib/components/ContactModal.svelte";

  import { ModeWatcher } from "mode-watcher";
  import { drawerStore } from '$lib/stores/earlyAccessStore';
	import { contactModalStore } from '$lib/stores/contactModalStore';
  
	import { onMount } from 'svelte';

	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	injectAnalytics({ mode: dev ? 'development' : 'production' });

  let isIframe = false;
  
  onMount(() => {
    isIframe = window?.location?.pathname?.startsWith('/iframe') || false;
  });
</script>

<!-- Global Early Access Drawer -->
<EarlyAccessDrawer>
  <div slot="trigger">
    <!-- Empty trigger slot - actual triggers come from buttons -->
  </div>
  <EarlyAccess />
</EarlyAccessDrawer>

<ModeWatcher />

{#if !isIframe}
  <Nav />
{/if}

<main class="flex min-h-screen flex-col">
  <slot />
</main>

{#if !isIframe}
  <Footer />
{/if}

{#if $contactModalStore}
  <ContactModal on:close={() => $contactModalStore = false} />
{/if}