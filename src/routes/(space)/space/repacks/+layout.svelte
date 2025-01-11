<!-- src/routes/(space)/space/repacks/+layout.svelte -->
<script lang="ts">
  import Breadcrumbs from "$lib/(space)/components/Breadcrumbs.svelte";
	import { page } from '$app/stores'
  // import { onMount } from 'svelte';
	// Base breadcrumbs for all repack pages
  const baseBreadcrumbs = [
    { label: "Space", href: "/space" },
    { label: "Repacks", href: "/space/repacks" }
  ];

  
  // We'll update this in onMount because we need access to window
  
  $: breadcrumbs = $page.url.pathname.includes('/firefly')
    ? [...baseBreadcrumbs, { label: "Firefly Aerospace" }]
    : [...baseBreadcrumbs];

</script>

<div class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
  <div class="container py-4">
    <Breadcrumbs items={breadcrumbs} />
  </div>
</div>

<!-- Add padding to account for fixed header -->
<div class="pt-16">
  <slot />
</div>