<!-- src/lib/pages/landing/sections/hero/Stickers.svelte -->
<script lang="ts">
  // SVG paths for the stickers
  const googleDocsPath = `M9.35 11.5...`; // We would add the actual Google Docs icon SVG path
  const googleDrivePath = `M8.34 12.7...`; // We would add the actual Google Drive icon SVG path
</script>

<div class="absolute inset-0 -z-10 overflow-hidden">
  <!-- Google Docs Sticker -->
  <div class="absolute top-12 right-[15%] w-32 h-32 md:w-40 md:h-40">
    <div class="relative w-full h-full">
      <!-- Background shape with thick stroke -->
      <div class="absolute inset-0 rounded-xl bg-background 
                  border-[3px] border-foreground dark:border-background
                  transform rotate-6" />
      <!-- Icon -->
      <svg class="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20
                  text-foreground dark:text-background"
           viewBox="0 0 24 24" 
           fill="none" 
           stroke="currentColor" 
           stroke-width="1.5">
        <path d={googleDocsPath} />
      </svg>
    </div>
  </div>

  <!-- Google Drive Sticker -->
  <div class="absolute bottom-12 right-[5%] w-32 h-32 md:w-40 md:h-40">
    <div class="relative w-full h-full">
      <!-- Background shape with thick stroke -->
      <div class="absolute inset-0 rounded-xl bg-background 
                  border-[3px] border-foreground dark:border-background
                  transform -rotate-12" />
      <!-- Icon -->
      <svg class="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20
                  text-foreground dark:text-background"
           viewBox="0 0 24 24" 
           fill="none" 
           stroke="currentColor" 
           stroke-width="1.5">
        <path d={googleDrivePath} />
      </svg>
    </div>
  </div>

  <!-- Writer Meme Sticker (Placeholder) -->
  <div class="absolute top-1/4 left-[10%] w-32 h-32 md:w-40 md:h-40">
    <div class="relative w-full h-full">
      <!-- Background shape with thick stroke -->
      <div class="absolute inset-0 rounded-xl bg-background 
                  border-[3px] border-foreground dark:border-background
                  transform -rotate-6" />
      <!-- Placeholder for meme/joke illustration -->
      <div class="absolute inset-0 flex items-center justify-center
                  text-foreground dark:text-background">
        ✍️
      </div>
    </div>
  </div>
</div>

<style>
  /* Add subtle floating animation for stickers */
  .absolute {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
    50% { transform: translateY(-10px) rotate(var(--rotation, 0deg)); }
    100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
  }
</style>