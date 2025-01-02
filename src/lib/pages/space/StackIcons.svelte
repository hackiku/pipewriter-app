<!-- src/lib/pages/space/StackIcons.svelte.svelte -->
<script lang="ts">
  const stacks = [
    {
      name: "React",
      icon: "/icons/react.svg",
      fallback: "⚛️"
    },
    {
      name: "Vue",
      icon: "/icons/vue.svg",
      fallback: "🟢"
    },
    {
      name: "Svelte",
      icon: "/icons/svelte.svg",
      fallback: "🎯"
    },
    {
      name: "Next.js",
      icon: "/icons/nextjs.svg",
      fallback: "▲"
    },
    {
      name: "Tailwind",
      icon: "/icons/tailwind.svg",
      fallback: "🎨"
    },
    {
      name: "TypeScript",
      icon: "/icons/typescript.svg",
      fallback: "📘"
    }
  ];
</script>

<div class="w-full overflow-x-auto pb-4 hide-scrollbar">
  <div class="flex gap-8 min-w-max px-4">
    {#each stacks as stack}
      <div class="flex items-center gap-2">
        <img 
          src={stack.icon} 
          alt={stack.name}
          class="w-6 h-6"
          onerror="this.innerText = '{stack.fallback}'"
        />
        <span class="text-sm font-medium text-muted-foreground">
          {stack.name}
        </span>
      </div>
    {/each}
  </div>
</div>

<style>
  .hide-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>