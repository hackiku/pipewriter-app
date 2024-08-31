<!-- $lib/components/BackgroundPattern.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let container: HTMLDivElement;
  let pattern: HTMLDivElement;

  function handleMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event;
    const { width, height } = container.getBoundingClientRect();
    const offsetX = (clientX / width - 0.5) * 20;
    const offsetY = (clientY / height - 0.5) * 20;
    pattern.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }

  function handleScroll() {
    const scrollY = window.scrollY;
    pattern.style.transform = `translateY(${scrollY * 0.2}px)`;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div 
  bind:this={container}
  class="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
  on:mousemove={handleMouseMove}
>
  <div 
    bind:this={pattern}
    class="absolute inset-[-20%] bg-repeat opacity-10 transition-transform duration-200 ease-out dark:opacity-5"
    style="background-image: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cpath d=\'M20 18v4h-4v-4h4m2-2h-8v8h8v-8z\' fill=\'%23000000\'/%3E%3C/svg%3E');"
  ></div>
</div>