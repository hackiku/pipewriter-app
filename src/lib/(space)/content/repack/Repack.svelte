<!-- src/lib/(space)/content/repack/Repack.svelte -->
<script lang="ts">
  import BeforeAfter from './BeforeAfter.svelte';
  import RepackLabel from './RepackLabel.svelte';
</script>

<!-- Labels Container -->
<div class="relative h-12 mb-4">
  <RepackLabel type="before" />
  <RepackLabel type="after" />
</div>

<BeforeAfter
  company="Firefly Aerospace"
  description="Full-throttle redesign with mission-ready UX"
  beforeUrl="/space/repacks/firefly/old/firefly-desktop.webp"
  defaultSplit={50}
/>