<!-- lib/app/UserImageMenu.svelte -->

<script>
  import { userStore } from '$lib/stores/auth.js';
  import { isSubscribed } from '$lib/stores/subscriptionStore.js';
  import { clickOutside } from '$lib/utils/clickOutside.js';
  import { createEventDispatcher } from 'svelte';

  export let showProfileMenu = false;
  export let showProBadge = true;

  const dispatch = createEventDispatcher();
  
  // export let profileOpen = false;

  function toggleProfileOpen() {
    dispatch('toggleProfile');
  }

  function subscribe() {
    isSubscribed.set(true);
  }

  function unsubscribe() {
    isSubscribed.set(false);
  }

  function toggleProBadge() {
    showProBadge = !showProBadge;
  }

</script>

<div class="relative" use:clickOutside on:click_outside={() => (showProfileMenu = false)}>
  
  <button on:click={() => (showProfileMenu = !showProfileMenu)}>

    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      src={$userStore ? $userStore.photoURL : 'app/headshot-placeholder.png'}
      alt="Profile picture"
      class="mt-1 w-7 h-7 rounded-full cursor-pointer hover:shadow-xl"
    />
  </button>
    
  {#if $isSubscribed}
    <div
      class={`absolute top-0.5 right-5 rounded-md ${showProBadge ? '' : 'hidden'}
        px-1.5 bg-green-500 text-white text-[0.5em]`}
    >
      PRO
    </div>
  {/if}
  
  {#if showProfileMenu}
    <div
      class="absolute min-w-[14em] -right-2 border bottom-12 rounded-md shadow-xl py-1 z-50 flex flex-col bg-white text-black"
    >
      <a href="/dashboard" class="px-4 py-2 hover:bg-gray-300" target="_blank">Dashboard</a>
      
      <button on:click={toggleProfileOpen}
        class="text-left px-4 py-2 hover:bg-gray-300"
      >
        Profile
      </button>

      <button on:click={toggleProBadge}
        class={`text-left px-4 py-2 hover:bg-gray-300 ${showProBadge ? 'text-blue-500' : ''}`}>
        {showProBadge ? '' : ''} Pro badge
      </button>

      {#if $isSubscribed}
        <button
          class="text-left bg-red-50 text-red-800 hover:bg-red-600 hover:text-white py-2 px-2 mx-2 rounded"
          on:click={unsubscribe}
          >
            Unsubscribe
          </button>
        {:else}
          <button
            class="text-left bg-blue-50 text-blue-900 hover:bg-blue-600 hover:text-white py-2 px-2 mx-2 rounded"
            on:click={subscribe}
          >
          Subscribe
        </button>
      {/if}


      {#if $userStore}
        <button
          on:click={userStore.signOut}
          class="text-left px-4 py-2 hover:bg-gray-300 font-bold cursor-pointer"
        >
          Sign Out
        </button>
      {:else}
        <button
          on:click={userStore.signIn}
          class="text-left px-4 py-2 hover:bg-gray-300 font-bold cursor-pointer"
        >
          Sign In
          </button>
      {/if}
    </div>
  {/if}
</div>