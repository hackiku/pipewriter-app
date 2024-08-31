<script>
  import "../app.css";
	import AppHeader from "$lib/components/AppHeader.svelte";
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<AppHeader />
<slot />