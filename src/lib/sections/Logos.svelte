<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let data: {
    title: string;
    logos: { name: string; color: string }[];
  };

  const dispatch = createEventDispatcher();

  function autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  function addLogo() {
    data.logos = [...data.logos, { name: 'New Logo', color: '#' + Math.floor(Math.random()*16777215).toString(16) }];
  }

  function removeLogo(index: number) {
    data.logos = data.logos.filter((_, i) => i !== index);
  }
</script>

<div class="mb-12 text-center">
  <h2 class="text-3xl font-bold mb-8">
    <textarea 
      bind:value={data.title} 
      on:input={autoGrow}
      class="w-full bg-transparent text-center resize-none"
    ></textarea>
  </h2>
  <div class="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-3 lg:grid-cols-6">
    {#each data.logos as logo, index}
      <div class="flex flex-col items-center">
        <div class="w-24 h-24 rounded-xl mb-2" style="background-color: {logo.color}"></div>
        <input 
          bind:value={logo.name} 
          class="text-center bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
        />
        <button on:click={() => removeLogo(index)} class="mt-2 text-sm text-red-500">Remove</button>
      </div>
    {/each}
  </div>
  <button on:click={addLogo} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Add Logo</button>
  <button on:click={() => dispatch('remove')} class="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded">Remove Section</button>
</div>