<!-- src/lib/pages/landing/sections/hero/Stickers.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import KeyboardShortcut from './KeyboardShortcut.svelte';

  let stickers: HTMLElement[];
  let container: HTMLElement;
  
  onMount(() => {
    stickers = Array.from(container.querySelectorAll('.sticker'));
    stickers.forEach((sticker, index) => {
      const rotation = [6, -12, -6][index];
      sticker.style.setProperty('--rotation', `${rotation}deg`);
    });
  });
</script>

<div 
  bind:this={container}
  class="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none"
>
  <!-- Google Docs Sticker -->
  <div class="sticker absolute top-20 -left-[5%] md:left-2 w-32 h-32 md:w-40 md:h-40">
    <div class="absolute inset-0 rounded-xl bg-background 
                border-[3px] border-foreground dark:border-background
                transform rotate-6">
      <img 
        src="/icons/google-docs.svg"
        alt="Google Docs"
        class="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20"
      />
    </div>
  </div>

  <!-- Google Drive Sticker -->
  <div class="sticker absolute bottom-20 md:bottom-36 right-[5%] md:right-[10%] w-32 h-32 md:w-40 md:h-40">
    <div class="absolute inset-0 rounded-xl bg-background 
                border-[3px] border-foreground dark:border-background
                transform -rotate-12">
      <img 
        src="/icons/google-drive.svg"
        alt="Google Drive"
        class="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20"
      />
    </div>
  </div>

  <!-- Keyboard Shortcut -->
  <div class="sticker absolute bottom-1/4 -left-[5%] md:left-[10%] w-48 h-16 md:w-56 md:h-24">
    <KeyboardShortcut />
  </div>
</div>

<style>
  .sticker {
    animation: float var(--duration, 6s) ease-in-out infinite;
    animation-delay: var(--delay, 0s);
  }
  
  @keyframes float {
    0% { transform: translateY(0) rotate(var(--rotation)); }
    50% { transform: translateY(-10px) rotate(var(--rotation)); }
    100% { transform: translateY(0) rotate(var(--rotation)); }
  }

  /* Different timing for each sticker */
  .sticker:nth-child(1) { --duration: 6s; --delay: 0s; }
  .sticker:nth-child(2) { --duration: 7s; --delay: 0.5s; }
  .sticker:nth-child(3) { --duration: 5s; --delay: 1s; }
</style>