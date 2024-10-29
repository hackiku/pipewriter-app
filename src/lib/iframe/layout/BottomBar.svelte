<!-- $lib/iframe/layout/BottomBar.svelte -->

<script lang="ts">
  import { Avatar, AvatarImage, AvatarFallback } from "$lib/components/ui/avatar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { FolderGit2 } from 'lucide-svelte';

  const DRIVE_FOLDER_URL = "https://drive.google.com/drive/u/2/folders/1k4BXnwflCpPewcPirj4csGKZxR7PX6iqR";
  
  const user = {
    name: 'User',
    email: 'user@example.com',
    image: '' 
  };

  function openDriveFolder() {
    window.open(DRIVE_FOLDER_URL, '_blank');
  }
</script>

<div class="w-full px-3 h-12  flex items-center justify-between">
  <!-- Drive Folder Link -->
  <button
    on:click={openDriveFolder}
    class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
  >
    <FolderGit2 size={18} />
    <span>Docs</span>
  </button>

  <!-- User Avatar with Dropdown -->
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button class="focus:outline-none">
        <Avatar class="w-8 h-8 cursor-pointer">
          {#if user.image}
            <AvatarImage src={user.image} alt={user.name} />
          {:else}
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          {/if}
        </Avatar>
      </button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
      <DropdownMenu.Label>{user.name}</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Profile</DropdownMenu.Item>
      <DropdownMenu.Item>Settings</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Sign out</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>