<!-- $lib/components/BackgroundPattern.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';

  let container: HTMLDivElement;
  let pattern: HTMLDivElement;

  const position = spring({ x: 0, y: 0 }, {
    stiffness: 0.8,
    damping: 0.25
  });

  function updatePosition(x: number, y: number) {
    position.set({ x, y });
  }

  function handleMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event;
    const { width, height } = container.getBoundingClientRect();
    const x = (clientX / width - 0.5) * 40;
    const y = (clientY / height - 0.5) * 40;
    updatePosition(x, y);
  }

  function handleScroll() {
    const scrollY = window.scrollY;
    updatePosition($position.x, scrollY * 0.2);
  }

  let baseMovement: number;

  onMount(() => {
    window.addEventListener('scroll', handleScroll);

    // Base movement animation
    const animateBaseMovement = () => {
      baseMovement = Math.sin(Date.now() / 2000) * 10;
      requestAnimationFrame(animateBaseMovement);
    };
    animateBaseMovement();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  $: if (pattern) {
    pattern.style.transform = `translate(${$position.x + baseMovement}px, ${$position.y + baseMovement}px)`;
  }
</script>

<div 
  bind:this={container}
  class="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
  on:mousemove={handleMouseMove}
>
  <div 
    bind:this={pattern}
    class="absolute inset-[-20%] bg-repeat opacity-20 transition-transform duration-200 ease-out dark:opacity-10"
  ></div>
</div>

<style>
  .absolute {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M20 10v20M10 20h20' stroke='%23a0aec0' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
    background-size: 40px 40px;
  }

  :global(.dark) .absolute {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M20 10v20M10 20h20' stroke='%234a5568' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  }
</style>