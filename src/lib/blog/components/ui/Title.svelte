<!-- lib/blog/components/blocks/Title.svelte -->
<script lang="ts">
  export let text: string;
  export let className = '';
  export let echoes = 2;
</script>

<style>
  .title-container {
    position: relative;
    width: fit-content;
  }

  .title-echo {
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: top left;
    animation: float var(--duration) ease-in-out infinite;
    white-space: nowrap;
  }

  @keyframes float {
    0%, 100% { 
      transform: translate(0, 0) rotate(0deg);
    }
    33% { 
      transform: translate(var(--float-x), var(--float-y)) rotate(var(--rotate));
    }
    66% { 
      transform: translate(calc(var(--float-x) * 1.5), calc(var(--float-y) * 1.5)) rotate(calc(var(--rotate) * 1.5));
    }
  }
</style>

<div class="title-container {className}">
  <h1 class="text-5xl sm:text-5xl md:text-7xl font-regular leading-tight">
    {text}
  </h1>
  
  {#each Array(echoes) as _, i}
    <h1 
      class="title-echo text-5xl sm:text-5xl md:text-7xl font-regular leading-tight"
      style="
        opacity: {0.2 - (i * 0.05)};
        --duration: {8 + i * 2}s;
        --float-x: {20 + i * 10}px;
        --float-y: {20 + i * 10}px;
        --rotate: {-1 - i}deg;
        transform: translate({(i + 1) * 20}px, {(i + 1) * 20}px) rotate({-(i + 1)}deg);
      "
    >
      {text}
    </h1>
  {/each}
</div>