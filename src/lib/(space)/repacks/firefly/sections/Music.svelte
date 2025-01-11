<!-- src/lib/(space)/repacks/firefly/sections/Music.svelte -->
<script lang="ts">
  import MusicPlayer from "../components/music/MusicPlayer.svelte";
  import FrequencyDisplay from "../components/music/FrequencyDisplay.svelte";
  import Piano from "../components/music/Piano.svelte";
  
  let currentNote = "G5";
  let frequency = 783.99;
  
  function onFrequencyChange(event: CustomEvent<{note: string, freq: number}>) {
    currentNote = event.detail.note;
    frequency = event.detail.freq;
  }
</script>

<section class="bg-black">
  <div class="container max-w-7xl">
    <!-- Section Header -->
    <div class="space-y-6 md:space-y-8 mb-8 md:mb-16 px-4 md:px-0">
      <div class="space-y-2">
        <!-- <h2 class="text-lg text-[#F5FF00] font-medium tracking-wider">
          RESONANT FREQUENCIES
        </h2> -->
        <h3 class="text-5xl md:text-5xl font-light text-white">
          The Sound of Rocket Science
        </h3>
      </div>
      
      <p class="text-zinc-400 max-w-2xl">
        Every rocket engine has its own acoustic signature. We analyze the resonant frequencies 
        during test fires to monitor engine health and performance in real-time.
      </p>
    </div>
    
    <!-- Player Grid - Reflows to vertical on mobile -->
    <div class="flex flex-col lg:grid lg:grid-cols-4 gap-6 md:gap-8">
      <!-- Main Player - Full width on mobile -->
      <div class="lg:col-span-3 px-4 md:px-0">
        <MusicPlayer />
      </div>
      
      <!-- Side Panel - Horizontal scroll on mobile -->
      <div class="lg:space-y-8 px-4 md:px-0">
        <!-- On mobile, put frequency display and piano side by side -->
        <div class="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none">
          <div class="flex-shrink-0 w-4/5 md:w-2/3 lg:w-full snap-center">
            <FrequencyDisplay {currentNote} {frequency} />
          </div>
          <div class="flex-shrink-0 w-4/5 md:w-2/3 lg:w-full snap-center">
            <Piano on:frequencyChange={onFrequencyChange} />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>