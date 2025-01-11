<!-- src/lib/(space)/repacks/firefly/sections/Hero.svelte -->
<script lang="ts">
  import PrimaryButton from "../components/cta/PrimaryButton.svelte";
</script>

<section class="relative min-h-[90vh] flex items-center">
  <!-- Background Image -->
  <div class="absolute inset-0">
    <img 
      src="/repacks/firefly/blue-ghost-moon.jpg" 
      alt="Blue Ghost lunar lander" 
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black/50" />
  </div>

  <!-- Content -->
  <div class="container relative z-10">
    <div class="max-w-2xl space-y-8">
      <div class="space-y-2">
        <h2 class="text-lg text-[#F5FF00] font-medium tracking-wide">
          BLUE GHOST MISSION 1
        </h2>
        <h1 class="text-5xl font-light leading-tight text-white">
          Your payload's journey to the Moon starts here
        </h1>
      </div>

      <p class="text-xl text-zinc-200 leading-relaxed">
        Firefly's first lunar mission launches January 15. 
        Join us in making history as we deliver NASA and commercial payloads 
        to the Moon's surface.
      </p>

      <div class="flex gap-4">
        <PrimaryButton href="/missions/blue-ghost">
          Learn More
        </PrimaryButton>
      </div>
    </div>
  </div>
</section>