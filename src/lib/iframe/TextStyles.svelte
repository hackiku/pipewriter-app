<!-- $lib/iframe/TextStyles.svelte -->

<script lang="ts">
  import IconButton from './components/IconButton.svelte';
  import { Link, Info, Sun } from "lucide-svelte";
  import { showInfo, chainMode } from '$lib/iframe/stores';

  function toggleShowInfo() {
    showInfo.update(n => !n);
  }

  function toggleChainMode() {
    chainMode.update(n => !n);
  }

  function toggleMode() {
    // Your mode toggle logic here
  }
	
 </script>


<div class="flex items-center justify-end gap-2">
  <IconButton
    icon={Link}
    selected={$chainMode}
    tooltip="Chain Mode"
    onClick={toggleChainMode}
  />
  <IconButton
    icon={Info}
    selected={$showInfo}
    tooltip="Show Info"
    onClick={toggleShowInfo}
  />
  <IconButton
    icon={Sun}
    tooltip="Toggle Theme"
    onClick={toggleMode}
  />
</div>
