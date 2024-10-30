<!-- $lib/iframe/layout/TopBar.svelte -->
<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import { showInfo, zenMode } from '$lib/iframe/stores';
  import { Info, Sun, Moon, Minimize2 } from "lucide-svelte";
  import IconButton from '../components/IconButton.svelte';

  function toggleShowInfo() {
    showInfo.update(n => !n);
  }

  function toggleZenMode() {
    zenMode.update(n => !n);
  }

  let isDarkMode = false;

  function handleToggleMode() {
    isDarkMode = !isDarkMode;
    toggleMode();
  }
</script>

<div class="flex items-center justify-between">
  <IconButton
    icon={Minimize2}
    selected={$zenMode}
    tooltip={$zenMode ? 'Exit Zen Mode' : 'Enter Zen Mode'}
    onClick={toggleZenMode}
  />
  
  <div class="flex items-center gap-1">
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