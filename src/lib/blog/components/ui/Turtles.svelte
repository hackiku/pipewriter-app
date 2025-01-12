<!-- lib/blog/components/blocks/Turtles.svelte -->
<script lang="ts">
  // Props for positioning and styling
  export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'bottom-right';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let opacity: number = 0.1;
  export let color: string = 'currentColor';
  export let echoes: number = 3;
  export let className: string = '';

  // Calculate size in rem
  $: sizeRem = {
    sm: '12rem',
    md: '20rem',
    lg: '32rem'
  }[size];

  // Calculate position classes
  $: positionClasses = {
    'top-left': '-top-24 -left-24',
    'top-right': '-top-24 -right-24',
    'bottom-left': '-bottom-24 -left-24',
    'bottom-right': '-bottom-24 -right-24'
  }[position];

  // Generate turtle paths with slight variations
  const getTurtlePath = (index: number) => {
    const variance = index * 2;
    return `
      M${50 + variance} ${80 - variance} 
      C${70 + variance} ${80 - variance}, 
        ${85 + variance} ${65 - variance}, 
        ${85 + variance} ${45 - variance} 
      C${85 + variance} ${25 - variance}, 
        ${70 + variance} ${10 - variance}, 
        ${50 + variance} ${10 - variance} 
      C${30 + variance} ${10 - variance}, 
        ${15 + variance} ${25 - variance}, 
        ${15 + variance} ${45 - variance} 
      C${15 + variance} ${65 - variance}, 
        ${30 + variance} ${80 - variance}, 
        ${50 + variance} ${80 - variance}
    `;
  };
</script>

<style>
  .turtle-container {
    position: absolute;
    width: var(--size);
    height: var(--size);
    pointer-events: none;
  }

  .turtle {
    animation: float var(--duration) ease-in-out infinite;
  }

  .turtle-echo {
    position: absolute;
    inset: 0;
    animation: float var(--duration) ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { 
      transform: translate(0, 0) rotate(0deg);
    }
    33% { 
      transform: translate(var(--float-x), var(--float-y)) rotate(var(--rotate));
    }
    66% { 
      transform: translate(calc(var(--float-x) * -0.5), var(--float-y)) rotate(calc(var(--rotate) * -0.5));
    }
  }
</style>

<div 
  class="turtle-container {positionClasses} {className}"
  style="--size: {sizeRem}; --duration: 8s; --float-x: 5px; --float-y: 5px; --rotate: 1deg;"
>
  <!-- Original turtle -->
  <svg viewBox="0 0 100 100" class="turtle" style="color: {color}; opacity: {opacity};">
    <path 
      d={getTurtlePath(0)}
      fill="none" 
      stroke="currentColor"
      stroke-width="2"
    />
    <ellipse 
      cx="50" cy="45" rx="25" ry="20" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
    />
    <path 
      d="M25 45 L15 35 M75 45 L85 35" 
      stroke="currentColor" 
      stroke-width="2"
    />
  </svg>

  <!-- Echo turtles -->
  {#each Array(echoes - 1) as _, i}
    <svg 
      viewBox="0 0 100 100" 
      class="turtle-echo"
      style="
        color: {color}; 
        opacity: {opacity * (1 - (i + 1) / (echoes + 1))}; 
        animation-delay: {-2 * (i + 1)}s;
      "
    >
      <path 
        d={getTurtlePath(i + 1)}
        fill="none" 
        stroke="currentColor"
        stroke-width="2"
      />
      <ellipse 
        cx={50 + (i + 1) * 2} 
        cy={45 - (i + 1)} 
        rx="25" 
        ry="20" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      />
      <path 
        d="M25 45 L15 35 M75 45 L85 35" 
        stroke="currentColor" 
        stroke-width="2"
      />
    </svg>
  {/each}
</div>