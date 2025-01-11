<!-- src/lib/(space)/repacks/firefly/components/music/MusicPlayer.svelte -->
<script lang="ts">
  let videoId = "your_video_id";
  let currentNote = "G5";
  let frequency = "783.99";
</script>

<div class="relative w-full aspect-video bg-zinc-900 rounded-none border border-[#F5FF00]/20">
  <!-- Video Container -->
  <div class="absolute inset-0">
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="Firefly Launch Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>

  <!-- Note Indicator -->
  <div class="absolute bottom-4 right-4 z-10">
    <div class="bg-black/80 border border-[#F5FF00] p-4 space-y-1">
      <div class="text-[#F5FF00] text-sm tracking-wider">RESONANT FREQUENCY</div>
      <div class="text-white text-2xl font-light">{currentNote}</div>
      <div class="text-zinc-400 text-sm">{frequency} Hz</div>
    </div>
  </div>
</div>