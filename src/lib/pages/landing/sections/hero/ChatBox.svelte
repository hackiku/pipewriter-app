<!-- src/lib/pages/landing/sections/hero/ChatBox.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { tools } from '$data/tools';
  
  const models = ['claude', 'gpt4', 'gemini'];
  const placeholders = [
    "Design a landing page with a sticky header...",
    "Help me write a product description for...",
    "Create an onboarding flow for my SaaS...",
    "Build a pricing table with 3 tiers..."
  ];

  let currentModel = models[0];
  let currentPlaceholder = placeholders[0];
  
  onMount(() => {
    // Rotate models every 3 seconds
    const modelInterval = setInterval(() => {
      const currentIndex = models.indexOf(currentModel);
      currentModel = models[(currentIndex + 1) % models.length];
    }, 3000);

    // Rotate placeholders every 2.5 seconds (offset from model changes)
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

<div class="relative w-full max-w-2xl mx-auto">
  <div class="relative flex items-center gap-2 p-2 pr-4 
              rounded-full border bg-background/50 backdrop-blur-sm
              shadow-lg hover:shadow-xl transition-shadow">
    <!-- Model Icon -->
    <div class="relative w-8 h-8 rounded-full overflow-hidden 
                flex items-center justify-center bg-white/5">
      {#key currentModel}
        <div in:fade={{ duration: 150 }}>
          {#if tools[currentModel].icon}
            <img 
              src={tools[currentModel].icon} 
              alt={tools[currentModel].name}
              class="w-5 h-5"
            />
          {:else}
            <span class="text-lg">{tools[currentModel].fallback}</span>
          {/if}
        </div>
      {/key}
    </div>

    <!-- Input Field -->
    <div class="flex-1 relative h-10">
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
    <button class="flex items-center justify-center w-8 h-8 
                   rounded-full bg-primary/10 text-primary 
                   hover:bg-primary/20 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-4 h-4">
        <path fill="currentColor" d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
      </svg>
    </button>
  </div>
</div>