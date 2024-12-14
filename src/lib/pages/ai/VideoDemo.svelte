<!-- src/lib/pages/ai/VideoDemo.svelte -->
<script lang="ts">
  // Removed Play import since we no longer need it
</script>

<!-- <section class="py-24 bg-background border-y"> -->
  <div class="container">
    <div class="max-w-4xl mx-auto">
      <div class="relative rounded-xl overflow-hidden bg-muted">
        <!-- Video Embed -->
        <div class="relative pb-[64.5933%] h-0">
          <iframe
            src="https://www.loom.com/embed/2dd12f155c834c83bdaa3f9e2cb1e011"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            class="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
        
        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
      </div>
    </div>
  </div>
<!-- </section> -->