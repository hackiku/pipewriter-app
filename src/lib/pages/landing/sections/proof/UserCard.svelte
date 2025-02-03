<!-- src/lib/pages/landing/sections/proof/UserCard.svelte -->
<script lang="ts">
  export let name: string;
  export let role: string;
  export let quote: string;
  export let imageSrc: string;
  export let index: number;
</script>

<div 
  class="rounded-xl overflow-hidden border border-white/10 bg-zinc-950"
  style="animation-delay: {index * 100}ms"
>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-4">
      <img
        src={imageSrc}
        alt={name}
        class="w-12 h-12 rounded-full border border-white/10"
      />
      <div>
        <h3 class="font-medium">{name}</h3>
        <p class="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
    
    <!-- Quote -->
    <blockquote class="text-muted-foreground">
      "{quote}"
    </blockquote>
  </div>
</div>

<style>
  div {
    animation: fadeSlideUp 0.5s ease-out backwards;
  }

  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>