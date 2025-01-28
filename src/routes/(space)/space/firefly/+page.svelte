<!-- src/routes/(space)/space/firefly/+page.svelte -->
<script lang="ts">
  import "../../../../app.css";
  // import { dev } from '$app/environment';
  // import { ModeWatcher } from "mode-watcher";
  import Firefly from "$lib/(space)/repacks/firefly/Firefly.svelte";
</script>

<!-- Bare minimum setup for standalone page -->
<!-- <ModeWatcher /> -->

<Firefly />

<!-- Custom minimal footer -->
<!-- <footer class="bg-black/80 backdrop-blur-md border-t border-[#F5FF00]/20 py-4">
  <div class="container flex justify-between items-center text-sm text-zinc-400">
    <div>
      Firefly Aerospace Redesign Concept
    </div>
    <div>
      <a href="/" class="hover:text-[#F5FF00] transition-colors">
        Created by Pipewriter
      </a>
    </div>
  </div>
</footer> -->