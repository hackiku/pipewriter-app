<!-- src/lib/pages/landing/sections/features/preview/PreviewCard.svelte -->
<script lang="ts">
  import type { DriveNode } from "../../../data/folders";

  export let item: DriveNode;
  export let isActive: boolean = false;
  export let media: { type: "video" | "image"; src: string } | undefined = undefined;
</script>

<div
  class="w-full aspect-video rounded-xl overflow-hidden border bg-zinc-950 text-white
         transition-all duration-300 relative
         {isActive ? 'border-0 p-[1px] bg-gradient-to-r from-[#3644FE] to-[#B345ED]' : 'border-white/10'}"
>
  <!-- Inner container for content (needed when showing gradient border) -->
  <div class="relative h-full w-full rounded-xl overflow-hidden
              {isActive ? 'bg-zinc-950' : ''}">
    <!-- Media Content -->
    <div class="absolute inset-0">
      {#if media?.type === "image"}
        <img src={media.src} alt="" class="w-full h-full object-cover" />
      {:else}
        <div class="w-full h-full bg-zinc-900/50" />
      {/if}
    </div>

    <!-- Content positioned in bottom third with gradient overlay -->
    <div class="absolute inset-x-0 bottom-0 h-1/3 flex items-end pb-8
                bg-gradient-to-t from-black via-black/95 to-transparent"
    >
      <div class="flex items-center gap-6 w-full px-8">
        <!-- Emoji Column -->
        <div class="text-5xl">{item.preview?.emoji}</div>

        <!-- Text Column -->
        <div class="flex-1">
          <h3 class="text-xl font-medium mb-1">{item.preview?.title}</h3>
          <p class="text-sm text-white/70">{item.preview?.description}</p>
        </div>
      </div>
    </div>
  </div>
</div>