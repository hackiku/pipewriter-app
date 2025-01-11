<!-- src/lib/(space)/repacks/firefly/sections/Music.svelte -->
<script lang="ts">
  import MusicPlayer from "../components/music/MusicPlayer.svelte";
  import FrequencyDisplay from "../components/music/FrequencyDisplay.svelte";
  import Piano from "../components/music/Piano.svelte";
  
  let currentNote = "G5";
  let frequency = 783.99;
  
  // This would be hooked up to real audio analysis
  function onFrequencyChange(event: CustomEvent<{note: string, freq: number}>) {
    currentNote = event.detail.note;
    frequency = event.detail.freq;
  }
</script>

<section class="py-24 bg-black">
  <div class="container">
    <!-- Section Header -->
    <div class="space-y-8 mb-16">
      <div class="space-y-2">
        <h2 class="text-lg text-[#F5FF00] font-medium tracking-wider">
          RESONANT FREQUENCIES
        </h2>
        <h3 class="text-4xl font-light text-white">
          The Sound of Rocket Science
        </h3>
      </div>
      
      <p class="text-zinc-400 max-w-2xl">
        Every rocket engine has its own acoustic signature. We analyze the resonant frequencies 
        during test fires to monitor engine health and performance in real-time.
      </p>
    </div>
    
    <!-- Player Grid -->
    <div class="grid grid-cols-4 gap-8">
      <!-- Main Player -->
      <div class="col-span-3">
        <MusicPlayer />
      </div>
      
      <!-- Side Panel -->
      <div class="space-y-8">
        <FrequencyDisplay {currentNote} {frequency} />
        <Piano on:frequencyChange={onFrequencyChange} />
      </div>
    </div>
  </div>
</section>