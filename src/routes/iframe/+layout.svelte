<!-- $lib/routes/iframe/+layout.svelte -->

<script>
	import "../../app.css";
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<slot />