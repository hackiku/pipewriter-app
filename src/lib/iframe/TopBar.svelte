<!-- $lib/app/TopBar.svelte -->

<script>
  import { zenMode , darkMode, showLabels } from '$lib/stores';
  import { onMount } from 'svelte';
  import { userStore } from '$lib/stores/auth.js';
  import DarkModeToggle from '$lib/ui/DarkModeToggle.svelte';

  function toggleZenMode() {
    zenMode.update(n => !n);
  }

  function toggleShowLabels() {
    showLabels.update(n => !n);
  }


  let projectName = '';

  const svgMap = {
    'zenMode': {
      // action: toggleZenMode,
      icon: 'jet-fighter.svg',
      title: 'Zen mode (wires only)',
      // jet
      // viewBox: '0 0 640 512', 
      // d: 'M160 24c0-13.3 10.7-24 24-24H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H280L384 192H500.4c7.7 0 15.3 1.4 22.5 4.1L625 234.4c9 3.4 15 12 15 21.6s-6 18.2-15 21.6L522.9 315.9c-7.2 2.7-14.8 4.1-22.5 4.1H384L280 464h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24h8V320H160l-54.6 54.6c-6 6-14.1 9.4-22.6 9.4H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32H82.7c8.5 0 16.6 3.4 22.6 9.4L160 192h32V48h-8c-13.3 0-24-10.7-24-24zM80 240c-8.8 0-16 7.2-16 16s7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16H80z'
      viewBox: '0 0 640 512',
      d: 'M48.2 66.8c-.1-.8-.2-1.7-.2-2.5c0-.1 0-.1 0-.2c0-8.8 7.2-16 16-16c.9 0 1.9 .1 2.8 .2C74.3 49.5 80 56.1 80 64c0 8.8-7.2 16-16 16c-7.9 0-14.5-5.7-15.8-13.2zM0 64c0 26.9 16.5 49.9 40 59.3V228.7C16.5 238.1 0 261.1 0 288c0 35.3 28.7 64 64 64c26.9 0 49.9-16.5 59.3-40H324.7c9.5 23.5 32.5 40 59.3 40c35.3 0 64-28.7 64-64c0-26.9-16.5-49.9-40-59.3V123.3c23.5-9.5 40-32.5 40-59.3c0-35.3-28.7-64-64-64c-26.9 0-49.9 16.5-59.3 40H123.3C113.9 16.5 90.9 0 64 0C28.7 0 0 28.7 0 64zm368 0a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zM324.7 88c6.5 16 19.3 28.9 35.3 35.3V228.7c-16 6.5-28.9 19.3-35.3 35.3H123.3c-6.5-16-19.3-28.9-35.3-35.3V123.3c16-6.5 28.9-19.3 35.3-35.3H324.7zM384 272a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM80 288c0 7.9-5.7 14.5-13.2 15.8c-.8 .1-1.7 .2-2.5 .2l-.2 0c-8.8 0-16-7.2-16-16c0-.9 .1-1.9 .2-2.8C49.5 277.7 56.1 272 64 272c8.8 0 16 7.2 16 16zm391.3-40h45.4c6.5 16 19.3 28.9 35.3 35.3V388.7c-16 6.5-28.9 19.3-35.3 35.3H315.3c-6.5-16-19.3-28.9-35.3-35.3V352H232v36.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64c26.9 0 49.9-16.5 59.3-40H516.7c9.5 23.5 32.5 40 59.3 40c35.3 0 64-28.7 64-64c0-26.9-16.5-49.9-40-59.3V283.3c23.5-9.5 40-32.5 40-59.3c0-35.3-28.7-64-64-64c-26.9 0-49.9 16.5-59.3 40H448v16.4c9.8 8.8 17.8 19.5 23.3 31.6zm88.9-26.7a16 16 0 1 1 31.5 5.5 16 16 0 1 1 -31.5-5.5zM271.8 450.7a16 16 0 1 1 -31.5-5.5 16 16 0 1 1 31.5 5.5zm301.5 13c-7.5-1.3-13.2-7.9-13.2-15.8c0-8.8 7.2-16 16-16c7.9 0 14.5 5.7 15.8 13.2l0 .1c.1 .9 .2 1.8 .2 2.7c0 8.8-7.2 16-16 16c-.9 0-1.9-.1-2.8-.2z'
    },
    'showLabels': {
      // action: toggleShowLabels,
      visual: 'eye',
      icon: 'label-solid.svg',
      title: 'Show labels',
      viewBox: '0 0 576 512',
      d: 'M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z'
    },
    'saveProject': {
      // action: 'exportToDoc',
      icon: 'diskette-solid.svg',
      title: 'Save project to your account',
      viewBox: '0 0 448 512',
      d: 'M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z'
    }
  };



  let pressedColor = '#3801cd';

</script>


<!-- ------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------ -->

<!-- <img src="app/icons/jet-fighter.svg" alt=""> -->
<!-- project title -->
<div class="flex-1 flex justify-start gap-2.5 h-full">
  {#if !$zenMode}

    <div class="flex items-center rounded-full gap-2 justify-start transition-opacity duration-300 ease-in-out
      {projectName ? 'opacity-100' : 'opacity-30 hover:opacity-100'} bg-gray-200"
    >
      <input
      type="text"
      bind:value={projectName}
      placeholder="Project..."
      class="w-full text-sm bg-transparent border-none focus:ring-0"
      />
      <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="{svgMap.saveProject.viewBox}">
        <path fill={`${$showLabels ? pressedColor : 'lightgray'}`}
          d="{svgMap.saveProject.d}"/>
      </svg>
    </div>

  {:else}
    {#if $showLabels}
      <p class="text-xs opacity-30">zen</p>
    {/if}
  {/if}
</div>


<!-- buttons right -->

<div class="flex-1 flex items-center justify-end gap-1">
  
  <div class="flex rounded-full gap-2">

    <button on:click={toggleZenMode} title="{svgMap.zenMode.title}"
      class={`hover:bg-zinc-100 transition-all rounded-full p-1
      ${$showLabels ? '' : ''}`}
    >
      <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="{svgMap.zenMode.viewBox}">
        <path fill={`${$zenMode ? pressedColor : 'gray'}`} d="{svgMap.zenMode.d}"/>
      </svg>
    </button>

    <button on:click={toggleShowLabels} title="{svgMap.showLabels.title}"
      class={`hover:bg-zinc-100 transition-all rounded-full p-1
      ${$showLabels ? '' : ''}`}
    >
      <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="{svgMap.showLabels.viewBox}">
        <path fill={`${$showLabels ? pressedColor : 'gray'}`} d="{svgMap.showLabels.d}"/>
      </svg>
    </button>
       
    <DarkModeToggle />

  </div>
</div>
