<!-- $lib/app/BottomBar.svelte -->

<script>
  import { userStore } from '$lib/stores/auth.js';
  let dryrun = 'https://docs.google.com/document/d/15NiIKW1rUWq2A2rW07cqKU5QxgWGkU5hOW9uHkvzdBo/edit?addon_dry_run=AAnXSK8UJy_gGiU63uEBz9ss5i6VjuXRm1sJOMwMYzRqa9k_QQr7hcfe3fuyrPX9L-LTcclAt7sJgiUcRcO92HumZSwjALSzbUfrkdeX_NG8HTGW0OdxupCRlgAPTfrqJUAm2q8likx8'
  let scriptEditor = 'https://script.google.com/home/projects/1eDcIp5Ita0D5-Xi6VWrtc3EQIp5cK-rPu12fWhZ_L79Ub_MjuwrNRgJq/edit'

</script>

<!-- ------------------------------------------- -->
<!-- <section class="mt-auto bg-white shadow-upward z-50 overflow-hidden"> -->


  <div class="flex justify-between items-center">

    {#if $userStore}
      <button on:click={userStore.signOut}>
        out
      </button>
    {:else}
      <button on:click={userStore.signIn}>
        in
      </button>
    {/if}


    <a href="https://docs.google.com/document/d/14mbQRBmi26IkPE4CFebu73MDHou5CrpzjJEc3SexPyw/edit" target="_blank"
      class="inline-flex gap-x-2 items-center hover:border-brandBlue hover:border-b-2">
      <img class="h-4" src="app/docs-logo.svg" alt="">
      <p class="text-sm text-brandBlue">
        doc
        <span class="font-mono">→</span>
      </p>
    </a>
    
    <a href={dryrun} target="_blank" class="inline-flex gap-x-1 items-center
      hover:border-brandBlue hover:border-b-2">
      <img src="app/star.svg" alt="">
      <p class="text-sm">
        dryrun
      </p>
    </a>

    <a href="{scriptEditor}" target="_blank"
      title="prod apps script">
      <strong class="text-xs font-mono text-gray-400">
        &lt;/&gt;
      </strong>
    </a>

    <a href="" class="h-8 w-8 overflow-clip rounded-full">
      {#if $userStore}
        <img src="{$userStore.photoURL}" alt="">
      {/if}
    </a>

  </div>



<style>
  
  .shadow-upward {
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
  }

</style>