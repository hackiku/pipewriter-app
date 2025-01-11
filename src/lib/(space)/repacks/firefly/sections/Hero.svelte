<!-- src/lib/(space)/repacks/firefly/sections/Hero.svelte -->
<script lang="ts">
 import PrimaryButton from "../components/cta/PrimaryButton.svelte";
 import MissionTimeline from "../components/MissionTimeline.svelte";
 import HexagonPlayer from "../components/mission/HexagonPlayer.svelte";
</script>

<section class="relative min-h-[90vh] flex items-center">
 <div class="container relative z-10">
   <!-- Main Content Grid -->
   <div class="grid md:grid-cols-6 gap-16 items-start">
     <!-- Left Content (4 cols) -->
     <div class="md:col-span-4 space-y-16">
       <!-- Header -->
       <div class="space-y-4 max-w-2xl">
         <!-- <h2 class="text-lg text-[#F5FF00] font-medium tracking-wider">
           RESPONSIVE SPACE
         </h2> -->
         <h1 class="text-6xl font-light leading-tight text-white">
          	Where Responsive Space Begins
         </h1>
       </div>

       <!-- Video Player -->
       <HexagonPlayer />
     </div>

     <!-- Right Timeline (2 cols) -->
     <div class="md:col-span-2 md:sticky md:top-24">
       <div class="space-y-4">
         <div class="space-y-1">
           <h2 class="text-sm text-[#F5FF00] font-medium tracking-wider">
             MISSION TIMELINE
           </h2>
           <h3 class="text-xl font-light text-white">
             Blue Ghost M1
           </h3>
         </div>
         <MissionTimeline />
       </div>
     </div>
   </div>
 </div>
</section>