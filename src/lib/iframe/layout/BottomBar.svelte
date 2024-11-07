<!-- $lib/iframe/layout/BottomBar.svelte -->

<script lang="ts">
  import { ExternalLink, HelpCircle } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import { showAboutModal } from '../stores/aboutStore';

  const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1k3ZaPn-J_xHSUV0YrpyvAvNuD-uFsuu_";
  const BG_STYLE = 'bg-white dark:bg-slate-900';
  
  function openDriveFolder() {
    window.open(DRIVE_FOLDER_URL, '_blank');
  }

  function toggleAboutModal() {
    showAboutModal.update(n => !n);
  }

  $: buttonClass = cn(
    "transition-all duration-200 relative z-10",
    $showAboutModal
      ? `w-9 h-[calc(3rem+1px)] rounded-b-full ${BG_STYLE}
         border-b border-l border-r border-gray-300 dark:border-gray-600
         after:content-[''] after:absolute after:top-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-inherit`
      : "w-9 h-9 rounded-full -mt-1 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
  );
</script>

<div class="w-full px-3 h-12 flex items-center justify-between">
  <!-- Drive Folder Link -->
  <button
    on:click={openDriveFolder}
    class="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors group"
  >
    <span>Docs</span>
    <ExternalLink 
      size={14} 
      class="opacity-50 group-hover:opacity-100 transition-opacity" 
    />
  </button>

  <!-- Help Button -->
  <div class="-mt-[1px] flex items-center z-50 border-t border-t-white">
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          class={buttonClass}
          on:click={toggleAboutModal}
        >
          <HelpCircle class="h-4 w-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Help & About</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </div>
</div>