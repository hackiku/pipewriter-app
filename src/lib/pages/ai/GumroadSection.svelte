<!-- src/lib/pages/ai/GumroadSection.svelte -->
<script lang="ts">
  export let id: string;
</script>

<div class="container py-24" {id}>
  <div class="max-w-4xl mx-auto">
    <div class="bg-background rounded-xl border shadow-lg p-8">
      <script src="https://gumroad.com/js/gumroad-embed.js"></script>
      <div class="gumroad-product-embed">
        <a href="https://pipewriter.gumroad.com/l/wires-for-writers">Loading...</a>
      </div>
    </div>
  </div>
</div>