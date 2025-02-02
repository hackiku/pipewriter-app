<!-- src/lib/pages/landing/sections/hero/ChatBox.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  export let rotation = -6; // Get from data config
  
  const models = [
    { name: 'GPT-4', icon: '/tools/gpt4.svg' },
    { name: 'Claude', icon: '/tools/claude.svg' },
    { name: 'DeepSeek', icon: '/tools/deepseek.svg' }
  ];

  const placeholders = [
    "Write web copy...",
    "Convert wireframe to React",
    "Research competitor USPs",
  ];

  let currentModel = models[0];
  let currentPlaceholder = placeholders[0];
  
  onMount(() => {
    const modelInterval = setInterval(() => {
      const currentIndex = models.indexOf(currentModel);
      currentModel = models[(currentIndex + 1) % models.length];
    }, 3000);

    const placeholderInterval = setInterval(() => {
      const currentIndex = placeholders.indexOf(currentPlaceholder);
      currentPlaceholder = placeholders[(currentIndex + 1) % placeholders.length];
    }, 2500);

    return () => {
      clearInterval(modelInterval);
      clearInterval(placeholderInterval);
    };
  });
</script>

<div class="relative w-full min-w-[300px] max-w-2xl mx-auto"
     style="transform: rotate({rotation}deg)">
  <div class="flex items-center gap-3 px-4 py-3
              rounded-full border bg-background/50 backdrop-blur-sm
              shadow-lg hover:shadow-xl transition-shadow">
    <!-- Model Icon -->
    {#key currentModel}
      <div in:fade={{ duration: 150 }}>
        <img 
          src={currentModel.icon}
          alt={currentModel.name}
          class="w-6 h-6"
        />
      </div>
    {/key}

    <!-- Input Field -->
    <div class="flex-1 relative h-10 min-w-[200px]">
      {#key currentPlaceholder}
        <div 
          class="absolute inset-0 flex items-center text-muted-foreground/70"
          in:fade={{ duration: 150 }}
        >
          <span class="truncate">{currentPlaceholder}</span>
        </div>
      {/key}
    </div>

    <!-- Send Button -->
    <button class="flex items-center justify-center w-10 h-10
                   rounded-full bg-primary/20 text-primary
                   hover:bg-primary/30 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-5 h-5">
        <path fill="currentColor" d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
      </svg>
    </button>
  </div>
</div>