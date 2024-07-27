<!-- $lib/app/App.svelte -->

<script>
  import { elements } from '$lib/app/elements.js';
  import { onMount } from 'svelte';
  import { draggableDividerSidebar } from '$lib/app/draggableDividerSidebar.js';
  // auth
  import { userStore } from '$lib/stores/auth.js';
  import { darkMode } from '$lib/stores';

  import BottomBar from '$lib/app/BottomBar.svelte';
  import ElementsDropper from '$lib/app/ElementsDropper.svelte';

  import PromptLoader from '$lib/app/PromptLoader.svelte';

  export let showLabels = true;

  // zen mode
  export let zenMode = false;
  function toggleZenMode() {
    zenMode = !zenMode;
  }

  let docTitle = '';

  function toggleDarkMode() {
    darkMode.toggle(document);
  }

  onMount(() => {
    window.addEventListener('message', callGAS);
    return () => {
      window.removeEventListener('message', callGAS);
    };
  });

  // run google scripts
  function callGAS(action, payload = {}) {
    const message = {
      action,
      payload
    };
    window.parent.postMessage(JSON.stringify(message), '*');
  }

  // -------------- scripts for buttons ---------------
  const gasActionsList = {
    'H4 to <h4>': { action: 'doc2html', payload: {} },
    copy: { action: 'copyToClipboard', payload: {} },
    'delete </>': { action: 'deleteHTMLtags', payload: {} },
    'html → doc': { action: 'html2doc', payload: {} },
    aiReadDoc: { action: 'aiReadDoc', payload: {} }
  };

  function handleGasActions(actionKey) {
    const { action, payload } = gasActionsList[actionKey];
    callGAS(action, payload);
  }
</script>

<!-- ------------------------------------------------------------------ -->
<!-- -------------- html ---------------------------------------------- -->
<!-- ------------------------------------------------------------------ -->

<!-- <pre class="absolute h-[80vh] text-xs hide-scrollbar overflow-auto">{@html JSON.stringify(elements, null, 2)}</pre> -->
<!-- h-[100vh] -->

<main
  class={`flex flex-col justify-start h-screen hide-scrollbar overflow-y-scroll overflow-x-hidden
  ${$darkMode ? 'bg-gray-800' : 'bg-white'} `}
>
  <!-- --------------------- TITLE BAR --------------------------------- -->

  <section class="sticky top-0 z-50 h-10 shadow space-y-0 flex justify-center items-center">
    <div class="flex-1 flex -mb-1 items-center justify-start">
      <button on:click={toggleDarkMode} class="text-xl font-semibold">
        {$darkMode ? '🌚' : '🌞'}
      </button>
      <!-- {#if showLabels} -->
      <div class="pl-1 text-xs text-gray-400">
        {$darkMode ? 'dark' : 'Light'}
      </div>
      <!-- {/if} -->
    </div>

    <div class="flex-1 flex -mb-1 items-center justify-start">
      <button on:click={toggleZenMode} class="text-xl font-semibold" title="Zen mode (wires only)">
        🧘‍♂️
      </button>
    </div>

    <input
      type="text"
      bind:value={docTitle}
      placeholder="Title"
      class="text-md text-center w-1/3 transition-opacity duration-300 ease-in-out {docTitle
        ? 'opacity-100'
        : 'opacity-10 hover:opacity-100'}"
    />

    <div class="flex-1 flex items-center justify-end">
      <div class="flex gap-2">
        <input type="checkbox" bind:checked={showLabels} id="checkbox" class="accent-blue-500" />
        <label for="checkbox" class="text-sm text-gray-500 dark:text-gray-400">Labels</label>
      </div>
    </div>
  </section>

  <hr class="border-1 border-gray-500 opacity-20" />
  <!-- --------------------- -->

  {#if zenMode}
    <!-- Step 3: Conditional rendering -->
    <section class="flex-none items-start h-full scrollbar">
      <ElementsDropper {elements} {callGAS} {showLabels} />

      <div class="text-3xl mx-[50%] my-[50%]">X</div>
    </section>
  {/if}

  <div class="flex flex-col flex-grow overflow-y-none">
    <!-- --------------------- elements dropper --------------------------------- -->

    <section class="flex-none items-start h-72 scrollbar">
      <ElementsDropper {elements} {callGAS} {showLabels} />
    </section>

    <!-- --------------------- drag divider --------------------------------- -->
    <div class="relative z-50" use:draggableDividerSidebar>
      <!-- line -->
      <div class="draggable-divider w-full bg-gray-400"></div>

      <!-- circle -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center
        justify-center bg-white rounded-full shadow hover:border hover:border-brandBlue"
        style="box-shadow: 0 2px 4px rgba(0,0,0,0.2);"
      >
        <svg
          class="h-8 text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
        >
          <path d="M12 8v8m4-4H8" />
        </svg>
      </div>
    </div>

    <!-- --------------------- format section ---------------------------- -->

    <section class="flex-shrink">
      <!-- ------------------------- STYLE ------------------------ -->

      {#if showLabels}
        <div class="title-row">
          <h2>Style</h2>
        </div>
      {/if}

      <div class="flex justify-between items-center w-full">
        <button
          on:click={() => callGAS('getElement', { elementId: 'styleguide' })}
          class="text-sm px-2 py-1 rounded-md border text-gray-400 border-gray-400 hover:border-brandBlue hover:text-brandBlue transition-all"
          title="Customize fonts in bulk"
        >
          drop styles
        </button>

        <div class="flex gap-2">
          <button
            on:click={() => callGAS('changeBg', { color: '#ffffff' })}
            class="w-5 h-5 bg-white rounded-full border-2 border-gray-200 hover:border-brandBlue transition-all"
            title="white"
          ></button>
          <button
            on:click={() => callGAS('changeBg', { color: '#f3f3f3' })}
            class="w-5 h-5 bg-[#f3f3f3] rounded-full border-2 border-gray-200 hover:border-brandBlue transition-all"
            title="lightgray background"
          ></button>
          <button
            on:click={() => callGAS('changeBg', { color: '#cccccc' })}
            class="w-5 h-5 bg-[#cccccc] rounded-full hover:border-2 hover:border-brandBlue transition-all"
            title="Dark gray background"
          ></button>
          <button
            on:click={() => callGAS('changeBg', { color: '#0a0a0a' })}
            class="w-5 h-5 bg-[#0a0a0a] rounded-full hover:border-2 hover:border-brandBlue transition-all"
            title="Very dark bg"
          ></button>
        </div>
      </div>

      <hr class="border-1 border-gray-500 opacity-20" />

      <!-- ------------------------- HTML ------------------------ -->

      {#if showLabels}
        <div class="title-row">
          <h2>Export</h2>
        </div>
      {/if}

      <div class="grid grid-cols-2 gap-2 text-brandBlue">
        {#each Object.keys(gasActionsList) as actionKey}
          <button
            on:click={() => handleGasActions(actionKey)}
            class="flex items-center justify-start text-sm px-2 py-1 rounded-md border text-gray-400 border-gray-400 hover:border-brandBlue hover:text-brandBlue transition-all"
          >
            <img src="app/code-icon-blue.svg" alt="" class="mr-2 h-4 w-4" />
            {actionKey}
          </button>
        {/each}
      </div>
    </section>

    <hr class="border-1 border-gray-500 opacity-20" />

    <!-- ------------------------- PROMPTS ------------------------ -->

    <section class="">
      {#if showLabels}
        <div class="title-row">
          <h2>AI prompts</h2>
        </div>
      {/if}

      <PromptLoader />
      <section>
        <!-- ------------------------- bottom ------------------------ -->

        <!-- <section class="bg-white shadow-upward z-50 overflow-hidden"> -->
        <BottomBar />
        <!-- </section> -->
      </section>
    </section>
  </div>
</main>

<!-- ----------------------------------------------------------------- -->
<!-- ----------------------- style ----------------------------------- -->
<!-- ----------------------------------------------------------------- -->

<style>
  :root {
    --bg-color-light: #d0cece;
    --bg-color-dark: #1a202c;
  }

  section {
    @apply px-4 py-4 space-y-2;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar {
    position: relative;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  }

  .draggable-divider {
    @apply cursor-ns-resize bg-gray-300;
    height: 3px;
  }

  /* title utility class */
  .title-row {
    @apply flex items-center justify-between;
  }
  .title-row h2 {
    @apply text-sm text-gray-400;
  }
  .title-row::after {
    content: '*';
    @apply text-gray-400 pr-2;
  }
</style>
