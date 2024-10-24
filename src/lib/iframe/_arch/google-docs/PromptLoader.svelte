<!-- #lib/app/PromptLoader.svelte -->

<script>
  import { writable } from 'svelte/store';

  // Dummy data for the prompts
  const prompts = writable([
    {
      id: 1,
      title: 'tone',
      content: `Act as a killer SaaS web copywriter with a knack for UX.
You always write brief copy that has personality and perfects the brand voice.
Your writing is never bland, buzzwordy or trite. Let's write + layout rockstar websites!

// if I share HTML code, its mock-code just for you to understand the layout; respond and deliver copy in your normal text output`
    },
    {
      id: 2,
      title: 'html',
      content: `You will write UX-minded copy for website wireframes using the mock-html format I'm sharing below.

// suggest improvements THAT STAY CONSISTENT TO TONE and have personality
// for each section and snippet of copy STAY IN LINE WITH WORD COUNT STANDARDS in my draft 
// never write bland, uninspired or buzzwordy copy. In other words DONT BE CLICHE, be creative abs confident!`
    },
    {
      id: 3,
      title: 'ux',
      content: `act as a world-class UX writer who's expert in wireframing copy. write compelling NEVER BLAND OR CLICHE copy in SHORT FORM for the following webpage. BE VERY MINDFUL OF UX like layouts, headlines, zigzag, cta placements etc. suggest ways to design the layout for bits of copy you write. The page is:`
    },
  ]);

  let selectedPromptId = 1;

  // Function to copy prompt content to clipboard
  async function copyToClipboard(content) {
    try {
      await navigator.clipboard.writeText(content);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
</script>

<style>
  .icon-gray {
    color: #6b7280; /* Tailwind gray-500 */
  }

  .scrollbar {
    position: relative;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  }

</style>

<div class="relative flex flex-col">
  <div class="flex justify-between items-center">
    <div class="flex space-x-4">
      {#each $prompts as { id, title } (id)}
        <button
          class={`text-sm border-b-2 pb-0 ${selectedPromptId === id ?
            'border-black text-black font-bold' : 'border-transparent text-gray-500 font-normal'}`}
          on:click={() => (selectedPromptId = id)}>
          {title}
        </button>
      {/each}
    </div>
    <button
      class="p-2 bg-gray-300 text-white rounded-lg flex items-center justify-center"
      on:click={() => copyToClipboard($prompts.find(p => p.id === selectedPromptId)?.content)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 icon-gray">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-6h3m-3 0V3m0 6h-3m3 0a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
  </div>
  


  <!-- PROMPT SELECTOR -->
  <div class="p-3 h-24 bg-gray-100 rounded-lg shadow space-y-2 scrollbar">
    {#each $prompts as { id, content } (id)}
      {#if id === selectedPromptId}
        <div class="text-gray-800 space-y-2">
          <pre class="text-xs whitespace-pre-wrap">{content}</pre>
        </div>
      {/if}
    {/each}
  </div>
</div>
