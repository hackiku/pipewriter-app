<script>
  import "../app.css";
	import AppNav from "$lib/AppNav.svelte";
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<slot />