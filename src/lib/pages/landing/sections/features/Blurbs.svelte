<!-- src/lib/pages/landing/sections/features/Blurbs.svelte -->
<script lang="ts">
  import { fly } from 'svelte/transition';
  
  const stats = [
    {
      emoji: "📦",
      number: "84+",
      label: "UI Elements"
    },
    {
      emoji: "📝",
      number: "12",
      label: "Doc Templates"
    },
    {
      emoji: "🌗",
      number: "2×",
      label: "Color Modes"
    }
  ];
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-16 py-24 border-t border-b">
  {#each stats as stat, i}
    <div 
      class="flex flex-col text-left"
      in:fly={{y: 20, duration: 300, delay: i * 100 }}
    >
      <div class="mb-4 text-3xl">{stat.emoji}</div>
      <div class="flex items-baseline gap-2">
        <span class="text-4xl font-medium">{stat.number}</span>
        <span class="text-4xl font-medium text-muted-foreground">
          {stat.label}
        </span>
      </div>
    </div>
  {/each}
</div>