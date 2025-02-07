<!-- src/lib/pages/landing/sections/hero/StickerBackground.svelte -->
<script lang="ts">
  import { stickerConfigs } from '../../data/stickers';
  import KeyboardShortcut from './KeyboardShortcut.svelte';
  import Sticker from './Sticker.svelte';
  import ChatBox from './ChatBox.svelte';

  export let opacity = '1';
</script>

<div class="absolute inset-0 overflow-hidden pointer-events-none select-none"
     style="opacity: {opacity}">
  {#each Object.entries(stickerConfigs) as [key, config]}
    <div
      class="float absolute"
      style="
        top: {config.position.top || 'auto'};
        bottom: {config.position.bottom || 'auto'};
        left: {config.position.left || 'auto'};
        right: {config.position.right || 'auto'};
        width: {config.size.width};
        height: {config.size.height};
        --duration: {config.animation.duration};
        --delay: {config.animation.delay};
      "
    >
      {#if key === 'keyboard'}
        <KeyboardShortcut rotation={config.rotation} />
      <!-- {:else if key === 'chat'}
        <ChatBox rotation={config.rotation} /> -->
      {:else}
        <Sticker 
          icon={config.icon} 
          rotation={config.rotation}
          hasStrike={config.hasStrike}
        />
      {/if}
    </div>
  {/each}
</div>

<style>
  .float {
    animation: float var(--duration, 6s) ease-in-out infinite;
    animation-delay: var(--delay, 0s);
    will-change: transform;
  }
  
  @keyframes float {
    0% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(0, -10px, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }
</style>