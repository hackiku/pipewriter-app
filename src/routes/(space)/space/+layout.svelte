<!-- src/routes/(space)/space/+layout.svelte -->
<script lang="ts">
  import { dev } from '$app/environment';
  import "../../../app.css";
  
	// Core
  import { ModeWatcher } from "mode-watcher";
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  
	// Space components
  // import SpaceNav from "$lib/(space)/components/SpaceNav.svelte";
  import SpaceDrawer from "$lib/(space)/components/cta/SpaceDrawer.svelte";
  
  // Pipewriter Website Components (still needed)
  import SEO from "$lib/components/SEO.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import EarlyAccess from "$lib/components/cta/EarlyAccess.svelte";
  import EarlyAccessDrawer from "$lib/components/cta/EarlyAccessDrawer.svelte";
  import ContactModal from "$lib/components/ContactModal.svelte";
  
  // Global Stores 
  import { drawerStore } from '$lib/stores/earlyAccessStore';
  import { contactModalStore } from '$lib/stores/contactModalStore';

  // Initialize Analytics
  injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<!-- Core Meta & Functionality -->
<SEO />
<ModeWatcher />

<!-- Global Early Access Drawer (Pipewriter) -->
<EarlyAccessDrawer>
  <div slot="trigger">
    <!-- Empty trigger slot - buttons provide their own triggers -->
  </div>
  <EarlyAccess />
</EarlyAccessDrawer>

<!-- Space-specific Navigation & Drawer -->
<!-- <SpaceNav /> -->
<SpaceDrawer>
  <div slot="trigger" />
</SpaceDrawer>

<!-- Main Layout Structure -->
<div class="flex min-h-screen flex-col relative">
  <!-- Main content -->
  <main class="flex-grow relative">
    <slot />
  </main>

  <!-- Footer -->
  <div class="relative">
    <Footer />
  </div>
</div>

<!-- Modals -->
{#if $contactModalStore}
  <ContactModal on:close={() => $contactModalStore = false} />
{/if}