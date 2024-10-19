<!-- $lib/gdocs/TopBar.svelte -->

<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import { showInfo, chainMode } from '$lib/iframe/stores';
  import { Link, Info, Sun, Moon } from "lucide-svelte";
  import IconButton from './components/IconButton.svelte';

  function toggleShowInfo() {
    showInfo.update(n => !n);
  }

  function toggleChainMode() {
    chainMode.update(n => !n);
  }

  let isDarkMode = false; // You might want to use a store for this

  function handleToggleMode() {
    isDarkMode = !isDarkMode;
    toggleMode();
  }
</script>

<div class="flex items-center">
  
  <!-- Buttons right -->
  <div class="flex-1 flex items-center justify-end gap-1">
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
      icon={isDarkMode ? Moon : Sun}
      tooltip="Toggle Theme"
      onClick={handleToggleMode}
    />
  </div>
</div>