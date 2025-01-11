<!-- src/lib/(space)/repacks/firefly/components/music/FrequencyDisplay.svelte -->
<script lang="ts">
  export let currentNote: string;
  export let frequency: number;
</script>

<div class="bg-black/80 border border-[#F5FF00] p-6 space-y-4">
  <div class="space-y-1">
    <div class="text-[#F5FF00] text-sm tracking-wider">RESONANT FREQUENCY</div>
    <div class="text-white text-3xl font-light">{currentNote}</div>
    <div class="text-zinc-400 text-sm">{frequency.toFixed(2)} Hz</div>
  </div>
  
  <!-- Frequency Visualization -->
  <div class="h-32 border border-[#F5FF00]/20 rounded-sm p-4">
    <!-- Placeholder for real-time frequency visualization -->
    <div class="h-full flex items-center justify-center">
      <div class="w-full h-1/2 bg-gradient-to-r from-[#F5FF00]/20 via-[#F5FF00] to-[#F5FF00]/20 animate-pulse" />
    </div>
  </div>
</div>