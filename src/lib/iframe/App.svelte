<!-- $lib/app/App.svelte -->

<script>
  import { zenMode , darkMode , showLabels } from '$lib/stores';
  import { dev } from '$app/environment';
  import { userStore } from '$lib/stores/auth.js';
  import { elements } from '$lib/app/elements.js';
  import { onMount } from 'svelte';
  import { draggableDividerSidebar } from '$lib/app/draggableDividerSidebar.js';
  // auth
  // app
  import TopBar from '$lib/app/TopBar.svelte';
  import BottomBar from '$lib/app/BottomBar.svelte';
  import ElementsDropper from '$lib/app/ElementsDropper.svelte';
  import PromptLoader from '$lib/app/PromptLoader.svelte';

  export let showPanel = () => {};
  
  let showJsonElements = false;
  function toggleJsonElements() {
  showJsonElements = !showJsonElements;
}

  let docTitle = '';

  onMount(() => {
    darkMode.set(false);
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
    'Insert to doc start': { action: 'doc2html', payload: {}, icon: 'arrow-up-from-bracket-solid.svg' },
    'Copy to clipboard': { action: 'copyToClipboard', payload: {}, icon: 'copy.svg' },
    'Delete HTML tags': { action: 'deleteHTMLtags', payload: {}, icon: 'delete.svg'  },
    'Format html to headings': { action: 'html2doc', payload: {}, icon: 'recycle-solid.svg'  },
    // 'asd': { action: 'aiReadDoc', payload: {}, icon: 'insert.svg'  }
  };

  function handleGasActions(actionKey) {
    const { action, payload } = gasActionsList[actionKey];
    callGAS(action, payload);
  }




</script>

<!-- ------------------------------------------------------------------ -->
<!-- -------------- html ---------------------------------------------- -->
<!-- ------------------------------------------------------------------ -->

<!-- json elements -->



<main
  class={`flex flex-col justify-start h-screen hide-scrollbar overflow-y-scroll overflow-x-hidden
  ${$darkMode ? 'bg-gray-800' : 'bg-white'} `}
>
  <!-- --------------------- TOP BAR --------------------------------- -->

  
  <section class={`sticky flex space-between top-0 z-50 h-20 shadow-md
    ${$darkMode ? 'bg-gray-800' : 'bg-white'}`}
  >
  <TopBar />
	omg
</section>


  <!-- --------------------- WIRE --------------------------------- -->

  <div class={`flex flex-col px-4 flex-grow overflow-y-none scrollbar pt-6
    ${$zenMode ? '' : 'hidden'}`}>

      <ElementsDropper {elements} {callGAS} {$showLabels} />
      
  </div>
    
  <div class={`flex flex-col flex-grow overflow-y-none
    ${$zenMode ? 'hidden' : ''}`}>
    
    <section class={`flex-none items-start scrollbar
      ${$zenMode ? 'h-[50%]' : 'h-72'}`}
    >
    
    {#if $showLabels}
      <h2 class="text-sm -mb-6 -mt-3 text-right">Wire</h2>
      <!-- <h2 class="text-sm -mt-2 text-gray-400">Wire</h2> -->
    {/if}
    
    {#if dev}
      <button on:click={toggleJsonElements} class="absolute right-6 top-3 z-50">
        <img src="app/code-icon.svg" alt="" class="h-3 w-3">
      </button>
    {/if}
    

    {#if showJsonElements}
      <pre class="absolute h-[80vh] text-xs hide-scrollbar overflow-auto">{@html JSON.stringify(elements, null, 2)}</pre>
    {:else}
      <ElementsDropper {elements} {callGAS} {$showLabels} />
    {/if}
    
    
    </section>

    <!-- --------------------- drag divider --------------------------------- -->
    <div class="relative z-50" use:draggableDividerSidebar>
      <!-- line -->
      <div class="draggable-divider w-full bg-gray-400"></div>
      <!-- circle -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="absolute p-1.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center
        justify-center bg-white rounded-full shadow hover:border hover:border-brandBlue"
        style="box-shadow: 0 0 2px 2px rgba(0,0,0,0.15);"
      >
        <img class="h-4 w-4 text-gray-500 pointer-events-none opacity-60" src="app/up-down-solid.svg" alt="">  
      </div>
    </div>


    <!-- ------------------------- STYLE ------------------------ -->

    <section class={`flex-shrink relative ${$zenMode ? '' : ''}`}>

      <!-- <img src="app/chevron-right-solid.svg" alt="" 
        class={`h-3 right-4 absolute ${zenMode ? 'display-block opacity-30' : ''}`}> -->
      
      {#if $showLabels}
        <div class={`title-row
          ${$zenMode ? 'hidden' : ''}`}
        >
          <h2>Style</h2>
            <img src="app/chevron-right-solid.svg" alt="" class="h-3 ml-auto">
        </div>
      {/if}

      <!-- style content -->
      <div class={`flex justify-between items-center w-full
        ${$zenMode ? 'hidden' : ''}`}
      >
      <div class="flex gap-2">
          <button
          on:click={() => callGAS('getElement', { elementId: 'styleguide' })}
            class="w-7 h-7 bg-white rounded-full border border-gray-200
            shadow-md shadow-red-{$darkMode ? '100' : '300'} hover:shadow-blue-300
            hover:border-brandBlue transition-all"
            title=""
          >
          <div class="flex flex-col items-center">
            <img src="app/cursor.svg" alt=""
              class="p-1.5 margin-auto h-7 w-7">

          </div>
          </button>
      </div>
    
        
  

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

      <!-- ------------------------- EXPORT ------------------------ -->

      {#if $showLabels}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div on:click={showPanel}
        class={`title-row ${$zenMode ? 'hidden' : ''}`}
      >
        <h2>Export</h2>
          <img src="app/chevron-right-solid.svg" alt="" class="h-3 ml-auto">
      </div>
    {/if}

      
      <!-- -------------- -->
      <div class="flex justify-between items-center w-full">
        
        <div class="flex flex-col flex-1 mb-1">
          {#if $showLabels}
            <h3 class="text-xs font-normal text-gray-400 ">Doc to HTML</h3>
          {/if}
        </div>

        <div class="flex gap-2">
          {#each Object.keys(gasActionsList) as actionKey}
            <button
              on:click={() => handleGasActions(actionKey)}
              class="w-7 h-7 bg-white rounded-full border border-gray-200
              shadow-md shadow-red-{$darkMode ? '100' : '300'} hover:shadow-blue-300
              hover:border-brandBlue transition-all"
              title="{actionKey}"
            >
            <div class="flex flex-col items-center">
              <img src="app/{gasActionsList[actionKey].icon}" alt="{actionKey}"
                class="p-1.5 margin-auto">
            </div>
            </button>
          {/each}
        </div>
      </div>

      
      
    <hr class="border-1 border-gray-500 opacity-20" />

    <!-- ------------------------- PROMPTS ------------------------ -->

    <section class="">
      {#if $showLabels}
        <div class="title-row">
          <h2>AI prompts</h2>
        </div>
      {/if}

      <!-- <PromptLoader /> -->
      
      
    </section>
  </div>
  <!-- ------------------------- bottom ------------------------ -->

  
  <section class="relative z-50 overflow-hidden">
    <BottomBar />
  </section>
  
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
    @apply text-xs;
  }
</style>
