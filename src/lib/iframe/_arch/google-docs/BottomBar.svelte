<!-- $lib/app/BottomBar.svelte -->

<script>
  import { userStore } from '$lib/stores/auth.js';
  import { isSubscribed } from '$lib/stores/subscriptionStore.js';
  import UserImageMenu from '$lib/app/UserImageMenu.svelte'; // Import the component
  import UserProfileDataDisplay from '$lib/dash/UserProfileDataDisplay.svelte';

  let dryrun = 'https://docs.google.com/document/d/15NiIKW1rUWq2A2rW07cqKU5QxgWGkU5hOW9uHkvzdBo/edit?addon_dry_run=AAnXSK8UJy_gGiU63uEBz9ss5i6VjuXRm1sJOMwMYzRqa9k_QQr7hcfe3fuyrPX9L-LTcclAt7sJgiUcRcO92HumZSwjALSzbUfrkdeX_NG8HTGW0OdxupCRlgAPTfrqJUAm2q8likx8'
  let scriptEditor = 'https://script.google.com/home/projects/1eDcIp5Ita0D5-Xi6VWrtc3EQIp5cK-rPu12fWhZ_L79Ub_MjuwrNRgJq/edit'

  let profileOpen = false;

  function toggleProfile() {
    profileOpen = !profileOpen;
  }

</script>

<!-- ------------------------------------------- -->

<div class="fixed bottom-0 right-0 bg-white z-50 shadow-up
  px-4 py-2 w-[300px]">
  <div class="flex justify-between text-xs items-center p-1">

    <!-- Links -->
    <div class="flex items-center space-x-4">
      <a href="https://docs.google.com/document/d/14mbQRBmi26IkPE4CFebu73MDHou5CrpzjJEc3SexPyw/edit" target="_blank" class="flex items-center space-x-2 text-brandBlue
      hover:bg-sky-200">
        <img class="h-4" src="app/docs-logo.svg" alt="Docs logo">
        <span class="text-sm">Free</span>
      </a>

      <a href={dryrun} target="_blank" class="flex items-center space-x-1 text-brandBlue
        hover:bg-sky-200">
        <img src="app/star.svg" alt="Star">
        <span class="text-sm">Pro</span>
      </a>

      <a href="{scriptEditor}" target="_blank" title="Production apps script" class="text-xs font-mono text-gray-400">&lt;/&gt;</a>
    </div>

    <!-- <div class="py-2 max-h-6"> -->
    <div class="flex items-center justify-center h-2  flex-shrink-0">
      <UserImageMenu on:toggleProfile={toggleProfile}/>
    </div>
      
  </div>
</div>

{#if profileOpen}
  <div class="fixed z-10 h-[60vh] w-3/5 mr-3 bg-white shadow-up
    bottom-16 right-0 overflow-y-auto overflow-x-hidden
    grid grid-cols-1 gap-2
    p-4
    transform transition-transform duration-300
    "
    style="transform: translateX(0%)"
    on:click_outside="{() => profileOpen = false}">
    
      <UserProfileDataDisplay />
  
  </div>

{/if}



<style>
  .btn {
    @apply px-2 py-1 bg-blue-500 text-white rounded;
  }
  .shadow-up {
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
  }
</style>
