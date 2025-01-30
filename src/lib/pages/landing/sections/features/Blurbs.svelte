<!-- src/lib/pages/landing/sections/features/Blurbs.svelte -->
<script lang="ts">
  import { fly } from 'svelte/transition';
  
  const stats = [
    {
      emoji: "📦",
      number: "84+",
      label: "UI Elements",
      description: "Pre-built sections ready to copy-paste"
    },
    {
      emoji: "📝",
      number: "12",
      label: "Doc Templates",
      description: "Landing pages, emails, product specs"
    },
    {
      emoji: "🌗",
      number: "2×",
      label: "Color Modes",
      description: "Dark/light themes switch in one click"
    }
  ];
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-16 py-24 border-t border-b">
  {#each stats as stat, i}
    <div 
      class="flex flex-col text-left space-y-3"
      in:fly={{y: 20, duration: 300, delay: i * 100 }}
    >
      <div class="mb-2 text-3xl">{stat.emoji}</div>
      <div class="space-y-1">
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-semibold text-primary">{stat.number}</span>
          <span class="text-xl text-muted-foreground">{stat.label}</span>
        </div>
        <p class="text-lg text-muted-foreground">
          {stat.description}
        </p>
      </div>
    </div>
  {/each}
</div>