<!-- $lib/iframe/layout/BottomBar.svelte -->
<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';
  import AppAbout from './AppAbout.svelte';
    import { showAboutModal } from '../stores/aboutStore';

  const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1k3ZaPn-J_xHSUV0YrpyvAvNuD-uFsuu_";
  
  function openDriveFolder() {
    window.open(DRIVE_FOLDER_URL, '_blank');
  }
</script>

{#if $showAboutModal}
	<AppAbout />
{/if}

<div class="w-full px-3 h-12 flex items-center justify-between">
  <!-- Drive Folder Link -->
  <button
    on:click={openDriveFolder}
    class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors group"
  >
    <span>Docs</span>
    <ExternalLink 
      size={14} 
      class="opacity-50 group-hover:opacity-100 transition-opacity" 
    />
  </button>

  <!-- About Component -->
</div>