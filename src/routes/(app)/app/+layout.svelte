<script>
  import "../../../app.css";
	import AppHeader from "$lib/components/AppHeader.svelte";
	// import Nav from "$lib/components/Nav.svelte";

  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<!-- <Nav /> -->

<!-- <AppHeader /> -->
<slot />