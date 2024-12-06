<script>
  import "../../app.css";
	import AppHeader from "$lib/components/AppHeader.svelte";
	import Nav from "$lib/components/Nav.svelte";
	import Footer from "$lib/components/Footer.svelte";

  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<Nav />

<!-- <AppHeader /> -->
<slot />

<Footer />