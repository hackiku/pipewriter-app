<!-- src/lib/(space)/repacks/firefly/components/mission/HexagonPlayer.svelte -->
<script lang="ts">
  import MissionBrief from './MissionBrief.svelte';
  import PrimaryButton from '../cta/PrimaryButton.svelte';
  
  export let videoId = "1045400122";
  export let missionData = {
    name: "Ghost Riders in the Sky",
    type: "Lunar Mission",
    customer: "NASA",
    spacecraft: "Blue Ghost lunar lander",
    launchVehicle: "SpaceX Falcon 9",
    launchSite: "Launch Complex 39A, Kennedy Space Center, Florida",
    launchDate: "January 15, 2025",
    launchTime: "1:11 a.m. EST",
    landingSite: "Mare Crisium near Mons Latreille",
    landingDate: "Early March 2025"
  };
</script>

<div class="relative group">
  <!-- Hexagonal Video Container -->
  <div class="relative aspect-video w-full">
    <!-- Main border that's continuous -->
    <div class="absolute inset-0 border border-[#F5FF00]/20 z-20"
         style="clip-path: polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)" />
    
    <!-- Video iframe -->
    <div class="absolute inset-0 bg-zinc-950" 
         style="clip-path: polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)">
      <iframe 
        title="Blue Ghost Mission 1 Animation"
        src={`https://player.vimeo.com/video/${videoId}?h=1008ab6394&dnt=1&app_id=122963&modestbranding=1&title=0&byline=0&logo=0&autoplay=1&autohide=1&showinfo=0&mute=1&muted=1&loop=1&playsinline=1&rel=0&controls=0&background=1`}
        class="w-full h-full"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        modestbranding=""
        autoplay=""
        mute=""
        muted=""
      />
    </div>
  </div>

  <!-- Mission Brief Overlay -->
  <div class="absolute bottom-0 left-0 right-0 p-4 z-30">
    <div class="flex items-end justify-between transition-all duration-300
                group-hover:bg-black/80 group-hover:border-t group-hover:border-[#F5FF00]/20
                group-hover:translate-y-[-0.5px]">
      <div class="text-sm text-zinc-300 py-2">
        Ghost Riders in the Sky • Mission 1
      </div>
      
      <PrimaryButton 
        href="/missions/blue-ghost" 
        class="!py-2 !px-4 text-sm"
      >
        Watch Launch
      </PrimaryButton>
    </div>

    <!-- Hover Mission Details -->
    <div class="max-h-0 overflow-hidden transition-all duration-300 
                group-hover:max-h-96 bg-black/80 px-4 py-0 
                group-hover:py-4">
      <MissionBrief data={missionData} />
    </div>
  </div>
</div>
