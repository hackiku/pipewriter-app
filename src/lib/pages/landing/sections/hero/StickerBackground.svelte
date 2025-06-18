<!-- src/lib/pages/landing/sections/hero/StickerBackground.svelte -->
<script lang="ts">
  import KeyboardShortcut from './KeyboardShortcut.svelte';
  import Sticker from './Sticker.svelte';
  import ChatBox from './ChatBox.svelte';

  export let opacity = '1';

  // Core stickers focused on Google Docs + copy/paste workflow
  // Positioned toward bottom-left to contrast with avatars
  const stickers = [
    {
      type: 'docs',
      position: { bottom: '25%', left: '8%' },
      size: { width: '90px', height: '90px' },
      rotation: -12,
      animation: { duration: '6s', delay: '0s' }
    },
    {
      type: 'keyboard',
      position: { bottom: '10%', left: '6%' },
      size: { width: '140px', height: '80px' },
      rotation: 8,
      animation: { duration: '7s', delay: '0.5s' }
    },
    // These are commented out but preserved for future use

    // {
    //   type: 'drive',
    //   position: { bottom: '25%', left: '18%' },
    //   size: { width: '100px', height: '100px' },
    //   rotation: 12,
    //   animation: { duration: '8s', delay: '1s' }
    // },

    // {
    //   type: 'chat',
    //   position: { bottom: '25%', right: '15%' },
    //   size: { width: '240px', height: '60px' },
    //   rotation: -6,
    //   animation: { duration: '5.5s', delay: '1.5s' }
    // }

  ];
</script>

<div class="absolute inset-0 overflow-hidden pointer-events-none select-none"
     style="opacity: {opacity}">
  {#each stickers as sticker}
    <div
      class="float absolute"
      style="
        top: {sticker.position.top || 'auto'};
        bottom: {sticker.position.bottom || 'auto'};
        left: {sticker.position.left || 'auto'};
        right: {sticker.position.right || 'auto'};
        width: {sticker.size.width};
        height: {sticker.size.height};
        transform: rotate({sticker.rotation}deg);
        --duration: {sticker.animation.duration};
        --delay: {sticker.animation.delay};
        --rotation: {sticker.rotation}deg;
      "
    >
      {#if sticker.type === 'keyboard'}
        <KeyboardShortcut rotation={0} />
      {:else if sticker.type === 'docs' || sticker.type === 'drive' || sticker.type === 'figma'}
        <Sticker 
          icon={sticker.type} 
          rotation={0}
        />
      {:else if sticker.type === 'chat'}
        <ChatBox rotation={0} />
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
    0% { transform: translate3d(0, 0, 0) rotate(var(--rotation, 0deg)); }
    50% { transform: translate3d(0, -10px, 0) rotate(var(--rotation, 0deg)); }
    100% { transform: translate3d(0, 0, 0) rotate(var(--rotation, 0deg)); }
  }
</style>