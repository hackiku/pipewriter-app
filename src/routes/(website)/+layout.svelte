<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import "../../app.css";
  import Nav from "$lib/components/Nav.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import EarlyAccess from "$lib/components/cta/EarlyAccess.svelte";
  import EarlyAccessDrawer from "$lib/components/cta/EarlyAccessDrawer.svelte";
  import { ModeWatcher } from "mode-watcher";
  import { drawerStore } from '$lib/stores/earlyAccessStore';
  import { onMount } from 'svelte';
  
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