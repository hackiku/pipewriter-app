<!-- src/lib/pages/landing/sections/hero/Sticker.svelte -->
<script lang="ts">
  export let icon: 'docs' | 'drive' | 'figma';
  export let rotation = 0;
  export let className = '';
  export let hasStrike = false;
  
  const strokeWidth = 22;
  const strokeColor = "white";
  
  // Hardcoded paths - no data imports needed
  const paths = {
    docs: '/tools/gdocs.svg',
    drive: '/tools/gdrive.svg',
    figma: '/tools/figma.svg'
  };

  $: iconPath = paths[icon];
</script>

<div class="sticker-wrapper {className}" style="transform: rotate({rotation}deg)">
  <!-- Stroke effect layer -->
  <img 
    src={iconPath} 
    alt={icon}
    class="icon stroke-layer"
  />
  
  <!-- Original icon layer -->
  <img 
    src={iconPath} 
    alt={icon}
    class="icon main-layer"
  />

  {#if hasStrike}
    <div class="absolute inset-[-10%] rotate-[45deg]">
      <div class="w-[120%] h-[4px] bg-red-500/90 rounded-full 
                  transform -translate-x-[10%] translate-y-[50%]" />
    </div>
  {/if}
</div>

<style>
  .sticker-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .icon {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .stroke-layer {
    filter: blur(12px) brightness(0) saturate(0);
    opacity: 0.85;
    transform: scale(1.05);
  }

  .main-layer {
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.05));
  }

  :global(.dark) .stroke-layer {
    filter: blur(12px) brightness(0) saturate(0) invert(0.1);
    opacity: 0.8;
  }
</style>