<!-- src/lib/(space)/repacks/firefly/sections/Hero.svelte -->
<script lang="ts">
  import PrimaryButton from "../components/cta/PrimaryButton.svelte";
  import MissionTimeline from "../components/MissionTimeline.svelte";
</script>

<section class="relative min-h-[90vh] flex items-center">
  <!-- Background -->
  <div class="absolute inset-0">
    <!-- Grid overlay -->
    <div class="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.7),transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.7),transparent_2px)] bg-[length:40px_40px]" />
  </div>

  <div class="container relative z-10">
    <!-- Main Content Grid -->
    <div class="grid md:grid-cols-5 gap-16">
      <!-- Left Content (3 cols) -->
      <div class="md:col-span-3 space-y-12">
        <!-- Header -->
        <div class="space-y-2 md:max-w-xl">
          <!-- <h2 class="text-sm text-[#F5FF00] font-semibold tracking-wider">
            Firefly
          </h2> -->
          <h1 class="text-5xl sm:text-6xl font-light leading-tight text-white">
            Where Responsive Space Started
          </h1>
        </div>

        <!-- Video Container with Angled Corners -->
        <div class="relative aspect-video w-full">
          <!-- Clip path for hexagonal shape -->
          <div class="absolute inset-0" style="clip-path: polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)">
            <iframe 
              title="Blue Ghost Mission 1 Animation"
              src="https://player.vimeo.com/video/1045400122?h=1008ab6394&dnt=1&app_id=122963&modestbranding=1&title=0&byline=0&logo=0&autoplay=1&autohide=1&showinfo=0&mute=1&muted=1&loop=1&playsinline=1&rel=0&controls=0&background=1"
              class="w-full h-full"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              modestbranding=""
              autoplay=""
              mute=""
              muted=""
            />
          </div>
          
          <!-- Decorative border -->
          <div class="absolute inset-0 border border-[#F5FF00]/20" 
               style="clip-path: polygon(2rem 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem), 0 2rem)" />
        </div>

        <!-- Bottom Right Content -->
        <div class="flex flex-col items-end gap-6 text-right">
          <p class="text-xl text-zinc-300 leading-relaxed max-w-2xl">
            Delivering reliable access to space through our Alpha launch vehicle 
            and Blue Ghost lunar lander. Next mission: January 15.
          </p>

          <PrimaryButton href="/missions/launch">
            Watch Launch
          </PrimaryButton>
        </div>
      </div>

      <!-- Right Timeline (2 cols) -->
      <div class="md:col-span-2">
        <MissionTimeline />
      </div>
    </div>
  </div>
</section>