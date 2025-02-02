<!-- src/lib/pages/landing/sections/hero/Stickers.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import KeyboardShortcut from './KeyboardShortcut.svelte';
  import Sticker from './Sticker.svelte';
</script>

<div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
  <!-- Google Docs Sticker -->
  <div class="float absolute top-20 -left-[5%] md:left-2 w-32 h-32 md:w-40 md:h-40"
       style="--duration: 6s; --delay: 0s;">
    <Sticker icon="docs" rotation={6} />
  </div>

  <!-- Google Drive Sticker -->
  <div class="float absolute bottom-20 md:bottom-36 right-[5%] md:right-[10%] w-32 h-32 md:w-40 md:h-40"
       style="--duration: 7s; --delay: 0.5s;">
    <Sticker icon="drive" rotation={-12} />
  </div>

  <!-- Keyboard Shortcut -->
  <div class="float absolute bottom-1/4 -left-[5%] md:left-[10%] w-48 h-16 md:w-56 md:h-24"
       style="--duration: 5s; --delay: 1s;">
    <KeyboardShortcut />
  </div>
</div>

<style>
  .float {
    animation: float var(--duration, 6s) ease-in-out infinite;
    animation-delay: var(--delay, 0s);
  }
  
  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
</style>